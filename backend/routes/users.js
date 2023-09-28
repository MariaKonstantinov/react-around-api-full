const express = require('express');

const {
  getUsers,
  getUserById,
  updateUser,
  getCurrentUser,
  updateUserAvatar,
} = require('../controllers/usersController');

const {
  validateUserProfile,
  validateUserAvatar,
  validateObjectId,
} = require('../middleware/validation');

const usersRouter = express.Router();

usersRouter.get('/users', getUsers);
usersRouter.get('/users/me', getCurrentUser);
usersRouter.get('/users/:user_id', validateObjectId, getUserById);
usersRouter.patch('/users/me', validateUserProfile, updateUser);
usersRouter.patch('/users/me/avatar', validateUserAvatar, updateUserAvatar);

module.exports = usersRouter;
