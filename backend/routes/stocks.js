const express = require('express');
const router = express.Router();
const stockData = require('../stockData');

router.get('/', async (req, res) => {
    try {
        const stocks = await stockData.getAllStocks();
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
