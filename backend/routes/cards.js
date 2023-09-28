const express = require('express');

const cardsRouter = express.Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardsController');

const {
  validateCardBody,
  validateObjectId,
} = require('../middleware/validation');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', validateCardBody, createCard);
cardsRouter.delete('/cards/:cards_id', validateObjectId, deleteCard);
cardsRouter.put('/cards/:cards_id/likes', validateObjectId, likeCard);
cardsRouter.delete('/cards/:cards_id/likes', validateObjectId, dislikeCard);

module.exports = cardsRouter;
