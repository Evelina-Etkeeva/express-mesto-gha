const router = require('express').Router();

const {
  getUsers,
  getMe,
  getUserId,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/me', getMe);
router.get('/users/:userId', getUserId);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router; // экспортировали роутер
