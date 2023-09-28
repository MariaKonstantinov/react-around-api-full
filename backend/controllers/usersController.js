const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

// add User model
const User = require('../models/user');

const { ERROR_CODE, ERROR_MESSAGE } = require('./utils/constants');

// user login
const userLogin = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: data._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-secret-tool',
        {
          expiresIn: '7d',
        }
      );
      const { password, ...user } = data._doc;
      res.send({ data: user, token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

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

// get current user
const getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;
  User.findById(userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// create a new user
const createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.status(ERROR_CODE.CONFLICT_ERROR);
      } else {
        return bcrypt.hash(password, 10);
      }
    })

    // Hash the password
    .then((hash) => User.create({ name, about, avatar, email, password: hash }))
    .then((user) => {
      const { password, ...user } = data._doc;
      res.send({ data: user });
    })
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
  getCurrentUser,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
  userLogin,
};
