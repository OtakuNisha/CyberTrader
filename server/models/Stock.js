const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  symbol: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  priceHistory: [{
    price: Number,
    date: { type: Date, default: Date.now }
  }],
  lastUpdated: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Stock', stockSchema);
