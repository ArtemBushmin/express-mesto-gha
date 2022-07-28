const express = require('express');
const {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
} = require('../controllers/users');

const userRoutes = express.Router();

userRoutes.get('/', getUsers);
userRoutes.get('/:id', getUserById);
userRoutes.post('/', createUser);
userRoutes.patch('/me', updateUserProfile);
userRoutes.patch('/me/avatar', updateUserAvatar);

module.exports = { userRoutes };
