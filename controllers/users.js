const User = require('../models/user');
const { errorMessage } = require('../utils/errorMassage');

module.exports.getUsers = (req, res) => {
  User.find({}).then((users) => res.send(users)).catch((err) => errorMessage(err, res));
};

module.exports.getUserById = (req, res) => {
  const { id } = req.params;
  User.findById(id).then((user) => res.send(user)).catch((err) => errorMessage(err, res));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => errorMessage(err, res));
};

module.exports.updateUserProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => errorMessage(err, res));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => errorMessage(err, res));
};
