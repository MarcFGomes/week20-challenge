const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      return User.findOne({ _id: context.user._id });
    },
  },

  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Can't find this user");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new Error('Wrong password!');
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },

    saveTitle: async (parent, { input }, context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $addToSet: { savedTitles: input } },
        { new: true, runValidators: true }
      );
    },

    removeTitle: async (parent, { imdbID }, context) => {
      if (!context.user) {
        throw new Error('Not authenticated');
      }

      return User.findOneAndUpdate(
        { _id: context.user._id },
        { $pull: { savedTitles: { imdbID } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;