const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const cards = require('./routes/cards');

const { NOT_FOUND } = require('./errors/errors');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
// для обработки JSON-запросов
app.use(bodyParser.json());
// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.use((req, res, next) => {
  req.user = {
    _id: '62e6621357b4316f8637dd64', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use('/', users);
app.use('/', cards);
app.use((req, res) => {
  res.status(NOT_FOUND).send({ message: 'Указанный путь не найден' });
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
