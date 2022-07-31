const User = require("../models/user");

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
        return;
      }
      res.status(500).send({ message: `Произошла ошибка: ${err.name}` });
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) =>
      res.status(500).send({ message: `Произошла ошибка: ${err.name}` })
    );
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .send({ message: "Запрашиваемый пользователь не найден" });
        return;        
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res
          .status(400)
          .send({ message: "Запрашиваемый пользователь не найден" });
        return;
      }
      res.status(500).send({ message: `Произошла ошибка: ${err.name}` });
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name: name, about: about },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
      upsert: true, // если пользователь не найден, он будет создан
    }
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
        return;
      }   
      else if (err.name === "CastError") {
        res
          .status(404)
          .send({ message: "Запрашиваемый пользователь не найден" });
        return;
      }   
      res.status(500).send({ message: `Произошла ошибка: ${err.name}` });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar: avatar },
    {
      new: true, // обработчик then получит на вход обновлённую запись
      runValidators: true, // данные будут валидированы перед изменением
    }
  )
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
        return;
      }   
      else if (err.name === "CastError") {
        res
          .status(404)
          .send({ message: "Запрашиваемый пользователь не найден" });
        return;
      }   
      res.status(500).send({ message: `Произошла ошибка: ${err.name}` });
    });
};
