const mongoose = require('mongoose');

// создали схему пользователя
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    message: 'Переданы некорректные данные: {VALUE}',
  },
  avatar: {
    type: String,
    required: true,
    message: 'Переданы некорректные данные: {VALUE}',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    message: 'Переданы некорректные данные: {VALUE}',
  },
});

module.exports = mongoose.model('user', userSchema);
