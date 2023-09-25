const express = require('express');

const cardsRouter = express.Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cardsController');

cardsRouter.get('/cards', getCards);
cardsRouter.post('/cards', createCard);
cardsRouter.delete('/cards/:cards_id', deleteCard);
cardsRouter.put('/cards/:cards_id/likes', likeCard);
cardsRouter.delete('/cards/:cards_id/likes', dislikeCard);

module.exports = cardsRouter;
