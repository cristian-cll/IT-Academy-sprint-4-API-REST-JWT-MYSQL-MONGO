const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  games: [
    {
      diceOne: Number,
      diceTwo: Number,
      result: Number,
      won: Number
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
