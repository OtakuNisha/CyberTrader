import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import StockMarket from './components/StockMarket';
import StockModal from './components/StockModal';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function App() {
  const [stocks, setStocks] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Fetch initial stock data
    const fetchStocks = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/stocks`);
        setStocks(response.data);
      } catch (error) {
        console.error('Error fetching stocks:', error);
      }
    };

    fetchStocks();

    // Initialize Socket.io connection
    const newSocket = io(API_URL);
    setSocket(newSocket);

    return () => newSocket.close();
  }, []);

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
    if (socket) {
      socket.emit('subscribe', stock.symbol);
    }
  };

  return (
    <div className="quantum-trader-app">
      <header className="app-header">
        <h1>QUANTUMTRADER</h1>
      </header>
      
      <main>
        <StockMarket 
          stocks={stocks} 
          onSelect={handleStockSelect} 
          socket={socket}
        />
        
        {selectedStock && (
          <StockModal 
            stock={selectedStock} 
            onClose={() => setSelectedStock(null)}
            socket={socket}
          />
        )}
      </main>
    </div>
  );
}

export default App;
