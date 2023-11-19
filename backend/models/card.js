const mongoose = require('mongoose');
const { isURL } = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A name is requierd'],
    minlength: [2, 'this input field has to contain 2 characters or more'],
    maxlength: [30, 'this input field has to contain 30 characters or less'],
  },
  link: {
    type: String,
    required: [true, 'Please enter a URL'],
    validate: {
      validator: (url) => isURL(url),
      message: 'Please enter a valid URL for the card',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
