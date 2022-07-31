const router = require('express').Router();

const { createCard, getCards, deleteCardId, likeCard, dislikeCard } = require('../controllers/cards');

router.post('/cards', createCard); 
router.get('/cards', getCards); 
router.delete('/cards/:cardId', deleteCardId); 
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);
module.exports = router; // экспортировали роутер 