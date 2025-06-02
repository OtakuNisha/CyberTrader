const mongoose = require('mongoose');

const portfolioItemSchema = new mongoose.Schema({
  symbol: { type: String, required: true },
  shares: { type: Number, required: true },
  avgPrice: { type: Number, required: true }
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, default: 10000 }, // Starting balance
  portfolio: [portfolioItemSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
