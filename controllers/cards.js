const Card = require('../models/card');
const { errorMessage } = require('../utils/errorMassage');

module.exports.getCards = (req, res) => {
  Card.find({}).then((cards) => res.send(cards)).catch((err) => errorMessage(err, res));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => errorMessage(err, res));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .orFail()
    .then((card) => res.send(card))
    .catch((err) => errorMessage(err, res));
};

module.exports.likeCard = (req, res) => {
  console.log(req.user._id);
  Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  ).orFail().then((card) => res.send(card)).catch((err) => errorMessage(err, res));
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  ).orFail().then((card) => res.send(card)).catch((err) => errorMessage(err, res));
};
