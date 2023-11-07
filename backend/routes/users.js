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

usersRouter.get('/', getUsers);
usersRouter.get('/me', getCurrentUser);
usersRouter.get('/:user_id', validateObjectId, getUserById);
usersRouter.patch('/me', validateUserProfile, updateUser);
usersRouter.patch('/me/avatar', validateUserAvatar, updateUserAvatar);

module.exports = usersRouter;
