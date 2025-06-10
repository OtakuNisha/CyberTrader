const db = require('./db');

// Update stock data
async function updateStockData(symbol, data) {
    await db.execute(
        `INSERT INTO market_stocks 
        (symbol, company_name, current_price, previous_close, volume, market_cap, pe_ratio) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
        company_name = VALUES(company_name),
        current_price = VALUES(current_price),
        previous_close = VALUES(previous_close),
        volume = VALUES(volume),
        market_cap = VALUES(market_cap),
        pe_ratio = VALUES(pe_ratio)`,
        [
            symbol,
            data.companyName,
            data.currentPrice,
            data.previousClose,
            data.volume,
            data.marketCap,
            data.peRatio
        ]
    );
}

// Get all stocks
async function getAllStocks() {
    const [rows] = await db.execute('SELECT * FROM market_stocks ORDER BY symbol');
    return rows;
}

// Add historical data
async function addHistoricalData(symbol, date, open, high, low, close, volume) {
    await db.execute(
        `INSERT INTO historical_data 
        (symbol, date, open, high, low, close, volume) 
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
        open = VALUES(open),
        high = VALUES(high),
        low = VALUES(low),
        close = VALUES(close),
        volume = VALUES(volume)`,
        [symbol, date, open, high, low, close, volume]
    );
}

module.exports = { updateStockData, getAllStocks, addHistoricalData };
