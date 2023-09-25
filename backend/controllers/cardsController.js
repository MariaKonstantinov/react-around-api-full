// add Card model
const Card = require('../models/card');

const { ERROR_CODE, ERROR_MESSAGE } = require('../utils/constants');

// get all cards
const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(() => {
      res
        .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
        .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
    });
};

// post a card
const createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
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

// delete a card
const deleteCard = (req, res) => {
  const { cards_id } = req.params;

  Card.findByIdAndRemove(cards_id)
    .orFail()
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send({ message: ERROR_MESSAGE.INCORRECT_DATA });
      }
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: ERROR_MESSAGE.NOT_FOUND });
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
      }
    });
};

// like a card
const likeCard = (req, res) => {
  const { cards_id } = req.params;

  Card.findByIdAndUpdate(
    cards_id,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((likes) => res.send({ data: likes }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send({ message: ERROR_MESSAGE.INCORRECT_DATA });
      }
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: ERROR_MESSAGE.NOT_FOUND });
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
      }
    });
};

// dislike a card
const dislikeCard = (req, res) => {
  const { cards_id } = req.params;

  Card.findByIdAndUpdate(
    cards_id,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((likes) => res.send({ data: likes }))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(ERROR_CODE.INCORRECT_DATA)
          .send({ message: ERROR_MESSAGE.INCORRECT_DATA });
      }
      if (err.name === 'DocumentNotFoundError') {
        res
          .status(ERROR_CODE.NOT_FOUND)
          .send({ message: ERROR_MESSAGE.NOT_FOUND });
      } else {
        res
          .status(ERROR_CODE.INTERNAL_SERVER_ERROR)
          .send({ message: ERROR_MESSAGE.INTERNAL_SERVER_ERROR });
      }
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};
