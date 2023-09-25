const mongoose = require('mongoose');
const { validateURL } = require('../helpers/validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String, // string
    required: true, // required field
    minlength: 2, // min length is 2
    maxlength: 30, // max length is 30
  },
  about: {
    type: String, // string
    required: true, // required field
    minlength: 2, // min length is 2
    maxlength: 30, // max length is 30
  },
  avatar: {
    type: String, // string
    required: [true, 'url is required'],
    validate: {
      validator: (url) => validateURL(url),
      message: 'Please enter a valid URL for the avatar',
    },
  },
});

module.exports = mongoose.model('user', userSchema);
