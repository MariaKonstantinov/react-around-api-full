const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

// add User model
const User = require('../models/user');

const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const BadRequestError = require('../errors/BadRequestError');

const { ERROR_MESSAGE } = require('./utils/constants');

// user login
const userLogin = (req, res, next) => {
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
    .catch(() => {
      next(new UnauthorizedError('Incorrect email or password'));
    });
};

// get all users - GET
const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

// get user by id - GET
const getUserById = (req, res, next) => {
  User.findOne({ _id: req.params.user_id })
    .orFail(new NotFoundError(ERROR_MESSAGE.NOT_FOUND))
    .then((user) => res.send({ data: user }))

    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(ERROR_MESSAGE.INCORRECT_DATA));
      } else {
        next(err);
      }
    });
};

// get current user - GET
const getCurrentUser = (req, res, next) => {
  const { _id: userId } = req.user;
  User.findById(userId)
    .orFail(new NotFoundError(ERROR_MESSAGE.NOT_FOUND))
    .then((user) => res.send({ data: user }))
    .catch(next);
};

// create a new user - POST
const createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        throw new ConflictError(ERROR_MESSAGE.CONFLICT);
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
        next(new BadRequestError('Invalid email or password'));
      } else {
        next(err);
      }
    });
};

// update user profile - PATCH
const updateUser = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    }
  )
    .orFail(new NotFoundError(ERROR_MESSAGE.NOT_FOUND))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || 'ValidationError') {
        next(new BadRequestError(ERROR_MESSAGE.INCORRECT_DATA));
      } else {
        next(err);
      }
    });
};

// update user avatar - PATCH
const updateUserAvatar = (req, res, next) => {
  const currentUser = req.user._id;
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    //req.user._id,
    { _id: currentUser },
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    }
  )
    .orFail(new NotFoundError(ERROR_MESSAGE.NOT_FOUND))
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'CastError' || 'ValidationError') {
        next(new BadRequestError(ERROR_MESSAGE.INCORRECT_DATA));
      } else {
        next(err);
      }
    });
};

module.exports = {
  userLogin,
  getUsers,
  getCurrentUser,
  getUserById,
  createUser,
  updateUser,
  updateUserAvatar,
};
