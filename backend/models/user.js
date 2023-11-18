const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String, // string
    default: 'Jacques Cousteau',
    minlength: 2, // min length is 2
    maxlength: 30, // max length is 30
  },
  about: {
    type: String, // string
    default: 'Explorer',
    minlength: 2, // min length is 2
    maxlength: 30, // max length is 30
  },
  avatar: {
    type: String, // string
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
    validate: {
      validator: (url) => validateURL(url),
      message: 'Please enter a valid URL for the avatar',
    },
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    select: false, // add the select field
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  // trying to find the user by email
  return this.findOne({ email }) // this — the User model
    .select('+password') // in the case of authentication, we need the password hash
    .then((user) => {
      // not found - rejecting the promise
      if (!user) {
        return Promise.reject(new Error('Incorrect email or password'));
      }
      // found - comparing hashes
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error('Incorrect email or password'));
        }
        return user; // now user is available
      });
    });
};

module.exports = mongoose.model('user', userSchema);
