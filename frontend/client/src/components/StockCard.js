import React from 'react';
import './StockCard.css';

const StockCard = ({ stock, currentPrice, onClick }) => {
  const priceChange = currentPrice - stock.previousClose;
  const percentChange = (priceChange / stock.previousClose * 100).toFixed(2);

  return (
    <div className="stock-card" onClick={onClick}>
      <div className="stock-logo-3d">{stock.symbol}</div>
      <h3 className="stock-name">{stock.name}</h3>
      <div className="stock-price">
        ${currentPrice.toFixed(2)}
        <span className={priceChange >= 0 ? 'price-up' : 'price-down'}>
          ({percentChange}%)
        </span>
      </div>
    </div>
  );
};

export default StockCard;
