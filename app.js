const express = require('express');
const mongoose = require('mongoose');
const { userRoutes } = require('./routes/users');
const { cardRoutes } = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: '62def0a742948ec662500c51', // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

mongoose.connect('mongodb://localhost:27017/mestodb').then(() => {
  console.log('Connected to database on mongodb://127.0.0.1:27017/mestodb');
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
