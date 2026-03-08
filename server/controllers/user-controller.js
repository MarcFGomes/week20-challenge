// import user model
const { User } = require('../models');
// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
  // Get a single user by either their id or username
  async getSingleUser({ user = null, params }, res) {
    const foundUser = await User.findOne({
      $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
    });

    if (!foundUser) {
      return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }

    res.json(foundUser);
  },

  // Create a user, sign a token, and send it back
  async createUser({ body }, res) {
    const user = await User.create(body);

    if (!user) {
      return res.status(400).json({ message: 'Something went wrong creating the user.' });
    }

    const token = signToken(user);
    res.json({ token, user });
  },

  // Login a user, sign a token, and send it back
  async login({ body }, res) {
    const user = await User.findOne({
      $or: [{ username: body.username }, { email: body.email }],
    });

    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(body.password);

    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }

    const token = signToken(user);
    res.json({ token, user });
  },

  // Save a title to a user's Watch Later list (prevent duplicates)
  async saveTitle({ user, body }, res) {
    try {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $addToSet: { savedTitles: body } },
        { new: true, runValidators: true }
      );

      return res.json(updatedUser);
    } catch (err) {
      console.error(err);
      return res.status(400).json(err);
    }
  },

  // Remove a title from a user's Watch Later list by imdbID
  async deleteTitle({ user, params }, res) {
    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $pull: { savedTitles: { imdbID: params.imdbID } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find user with this id!" });
    }

    return res.json(updatedUser);
  },
};
