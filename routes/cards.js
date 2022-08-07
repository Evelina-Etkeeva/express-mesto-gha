const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  createCard, getCards, deleteCardId, likeCard, dislikeCard,
} = require('../controllers/cards');

router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/(https?:\/\/)?(www\.)?[A-Za-z0-9-]*\.[A-Za-z0-9-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*/),
  }),
}), createCard);

router.get('/cards', getCards);

router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), deleteCardId);

router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), likeCard);

router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), dislikeCard);

module.exports = router; // экспортировали роутер
