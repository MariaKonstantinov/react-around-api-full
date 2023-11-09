// add Card model
const Card = require('../models/card');

const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

const { ERROR_MESSAGE } = require('../utils/constants');

// get all cards - GET
const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(next);
};

// post a card - POST
const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => {
      console.log(`BE create create`);
      console.log(card._id);
      res.send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(ERROR_MESSAGE.INCORRECT_DATA));
      } else {
        next(err);
      }
    });
};

// delete a card - DELETE
const deleteCard = (req, res, next) => {
  // const { cards_id } = req.params;
  const cardId = req.params._id;
  const userId = req.user._id;

  console.log(`BE delete ${cardId}`);

  Card.findById(cardId)
    .orFail(new NotFoundError(ERROR_MESSAGE.NOT_FOUND))

    .then((card) => {
      const { owner } = card;
      if (owner != userId) {
        return next(new ForbiddenError(ERROR_MESSAGE.FORBIDDEN));
      }
      return Card.findByIdAndRemove(cardId).then(() => res.send(card));
    })
    .catch(next);
};

// like a card - PUT
const likeCard = (req, res, next) => {
  const cardId = req.params._id;
  const userId = req.user._id;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true }
  )
    .orFail(new NotFoundError(ERROR_MESSAGE.NOT_FOUND))
    .then((likes) => res.send({ data: likes }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(ERROR_MESSAGE.INCORRECT_DATA));
      } else {
        next(err);
      }
    });
};

// dislike a card - DELETE LIKE
const dislikeCard = (req, res, next) => {
  const cardId = req.params._id;
  const userId = req.user._id;

  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .orFail(new NotFoundError(ERROR_MESSAGE.NOT_FOUND))
    .then((likes) => res.send({ data: likes }))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(ERROR_MESSAGE.INCORRECT_DATA));
      } else {
        next(err);
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
