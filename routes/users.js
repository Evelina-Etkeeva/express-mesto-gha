const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getMe,
  getUserId,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getMe);

router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUserId);

router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateUserInfo);

router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(/(https?:\/\/)?(www\.)?[A-Za-z0-9-]*\.[A-Za-z0-9-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*/),
  }),
}), updateUserAvatar);

module.exports = router; // экспортировали роутер
