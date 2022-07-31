const router = require('express').Router();

const {
  createUser,
  getUsers,
  getUserId,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.post('/users', createUser);
router.get('/users', getUsers);
router.get('/users/:userId', getUserId);
router.patch('/users/me', updateUserInfo);
router.patch('/users/me/avatar', updateUserAvatar);

module.exports = router; // экспортировали роутер
