-- Users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL
);

-- User portfolios
CREATE TABLE user_portfolios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    stock_symbol VARCHAR(10) NOT NULL,
    shares DECIMAL(15,2) NOT NULL,
    average_price DECIMAL(15,2) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE KEY unique_user_stock (user_id, stock_symbol)
);

-- Market data (all stocks)
CREATE TABLE market_stocks (
    symbol VARCHAR(10) PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    current_price DECIMAL(15,2) NOT NULL,
    previous_close DECIMAL(15,2) NOT NULL,
    volume BIGINT NOT NULL,
    market_cap BIGINT NOT NULL,
    pe_ratio DECIMAL(15,2),
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Historical data
CREATE TABLE historical_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL,
    date DATE NOT NULL,
    open DECIMAL(15,2) NOT NULL,
    high DECIMAL(15,2) NOT NULL,
    low DECIMAL(15,2) NOT NULL,
    close DECIMAL(15,2) NOT NULL,
    volume BIGINT NOT NULL,
    FOREIGN KEY (symbol) REFERENCES market_stocks(symbol),
    UNIQUE KEY unique_stock_date (symbol, date)
);

-- User activity tracking
CREATE TABLE user_activity (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    activity_type ENUM('login', 'stock_view', 'trade', 'search') NOT NULL,
    details TEXT,
    activity_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);
