const express = require('express');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const cardRoutes = express.Router();

cardRoutes.get('/', getCards);
cardRoutes.delete('/:id', deleteCard);
cardRoutes.post('/', createCard);
cardRoutes.put('/:id/likes', likeCard);
cardRoutes.delete('/:id/likes', dislikeCard);

module.exports = { cardRoutes };
