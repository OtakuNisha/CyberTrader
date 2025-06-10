const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const stockRoutes = require('./routes/stocks');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('../frontend'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/stocks', stockRoutes);

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`CyberTrader server running on port ${PORT}`);
});
