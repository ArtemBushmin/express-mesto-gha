const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail()
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        const err = new Error('Нет возможности удалить карту другого пользователя');
        err.statusCode = 403;
        next(err);
      }
      return res.send(card);
    })
    .catch((error) => {
      if (error.name === 'DocumentNotFoundError') {
        const err = new Error('Пользователь не найден');
        err.statusCode = 404;
        next(err);
      }
      next(error);
    });
};

module.exports.likeCard = (req, res, next) => {
  console.log(req.user._id);
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'DocumentNotFoundError') {
        const err = new Error('Пользователь не найден');
        err.statusCode = 404;
        next(err);
      }
      next(error);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail()
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'DocumentNotFoundError') {
        const err = new Error('Пользователь не найден');
        err.statusCode = 404;
        next(err);
      }
      next(error);
    });
};
