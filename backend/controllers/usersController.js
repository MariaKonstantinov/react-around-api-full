// add User model
const User = require('../models/user');

const { ERROR_CODE, ERROR_MESSAGE } = require('../utils/constants');

// get all users
const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => {
      res
        .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
    });
};

// get user by id
const getUserById = (req, res) => {
  User.findOne({ _id: req.params.user_id })
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: ERROR_MESSAGE.NOT_FOUND });
      } else if (err.name === 'CastError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send({ message: ERROR_MESSAGE.INCORRECT_DATA });
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
      }
    });
};

// create a new user
const createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send({ message: ERROR_MESSAGE.INCORRECT_DATA });
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
      }
    });
};

// update user profile
const updateUser = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: ERROR_MESSAGE.NOT_FOUND });
      } else if (err.name === 'CastError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send({ message: ERROR_MESSAGE.INCORRECT_DATA });
      } else if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send({ message: ERROR_MESSAGE.INCORRECT_DATA });
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
      }
    });
};

// update user avatar
const updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: ERROR_MESSAGE.NOT_FOUND });
      } else if (err.name === 'CastError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send({ message: ERROR_MESSAGE.INCORRECT_DATA });
      } else if (err.name === 'ValidationError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send({ message: ERROR_MESSAGE.INCORRECT_DATA });
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
      }
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
