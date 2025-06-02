import React, { useEffect, useState } from 'react';
import StockCard from './StockCard';
import './StockMarket.css';

const StockMarket = ({ stocks, onSelect, socket }) => {
  const [realTimeData, setRealTimeData] = useState({});

  useEffect(() => {
    if (!socket) return;

    const handleStockUpdate = (data) => {
      setRealTimeData(prev => ({
        ...prev,
        [data.symbol]: data.price
      }));
    };

    socket.on('stockUpdate', handleStockUpdate);

    return () => {
      socket.off('stockUpdate', handleStockUpdate);
    };
  }, [socket]);

  return (
    <div className="stock-market">
      <h2>MARKET OVERVIEW</h2>
      
      <div className="navigation-wrapper">
        <button className="scroll-arrow">&lt;</button>
        
        <div className="scroller" id="stock-scroller">
          <div className="scroller-inner">
            {stocks.map(stock => (
              <StockCard
                key={stock.symbol}
                stock={stock}
                currentPrice={realTimeData[stock.symbol] || stock.price}
                onClick={() => onSelect(stock)}
              />
            ))}
          </div>
        </div>
        
        <button className="scroll-arrow">&gt;</button>
      </div>
    </div>
  );
};

export default StockMarket;
