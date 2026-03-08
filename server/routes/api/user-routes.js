const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveTitle,
  deleteTitle,
  login,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

// Create user OR save a title (protected)
router.route('/').post(createUser).put(authMiddleware, saveTitle);

// Login
router.route('/login').post(login);

// Get logged-in user
router.route('/me').get(authMiddleware, getSingleUser);

// Remove title by imdbID (protected)
router.route('/titles/:imdbID').delete(authMiddleware, deleteTitle);

module.exports = router;
