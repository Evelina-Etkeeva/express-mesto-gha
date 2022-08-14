require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const { celebrate, Joi, errors } = require("celebrate");
const helmet = require("helmet");
const auth = require("./middlewares/auth");
const users = require("./routes/users");
const cards = require("./routes/cards");
const { login, createUser } = require("./controllers/users");
const NotFoundError = require("./errors/NotFoundErr");
const { requestLogger, errorLogger } = require("./middlewares/logger");

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();

// защищаемся от атак
app.use(limiter);
app.use(helmet());
// для обработки JSON-запросов
app.use(bodyParser.json());
// для обработки кук
app.use(cookieParser());
// подключаемся к серверу mongo
mongoose.connect("mongodb://localhost:27017/mestodb", {});
// подключаем логгер запросов
app.use(requestLogger);

// теперь обработка роутов
app.post(
  "/signin",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login
);
app.post(
  "/signup",
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().pattern(
        /(https?:\/\/)?(www\.)?[A-Za-z0-9-]*\.[A-Za-z0-9-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)*/
      ),
    }),
  }),
  createUser
);
app.use(auth);
app.use("/", users);
app.use("/", cards);
app.use((req, res, next) => {
  next(new NotFoundError("Указанный путь не найден"));
});

// логгер ошибок
app.use(errorLogger);
// обработка ошибок celebrate
app.use(errors());
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    // проверяем статус и выставляем сообщение в зависимости от него
    message: statusCode === 500 ? "На сервере произошла ошибка" : message,
  });
  next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
