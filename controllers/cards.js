const Card = require("../models/card");

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((data) => res.send(data))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(400).send({ message: "Переданы некорректные данные" });
        return;
      }
      res.status(500).send({ message: `Произошла ошибка: ${err.name}` });
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) =>
      res.status(500).send({ message: `Произошла ошибка: ${err.name}` })
    );
};

module.exports.deleteCardId = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Карточка не найдена" });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Карточка не найдена" });
        return;
      }
      res.status(500).send({ message: `Произошла ошибка: ${err.name}` });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Карточка не найдена" });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Карточка не найдена" });
        return;
      }
      res.status(500).send({ message: `Произошла ошибка: ${err.name}` });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: "Карточка не найдена" });
        return;
      }
      res.status(200).send(card);
    })
    .catch((err) => {
      if (err.name === "CastError") {
        res.status(400).send({ message: "Карточка не найдена" });
        return;
      }
      res.status(500).send({ message: `Произошла ошибка: ${err.name}` });
    });
};
