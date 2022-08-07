require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
const users = require('./routes/users');
const cards = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/NotFoundErr');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
// для обработки JSON-запросов
app.use(bodyParser.json());
// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb', {});

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/', users);
app.use('/', cards);
app.use((req, res, next) => {
  next(new NotFoundError('Указанный путь не найден'));
});

app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
