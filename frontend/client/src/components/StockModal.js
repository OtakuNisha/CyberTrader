import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StockModal.css';

const StockModal = ({ stock, onClose, socket }) => {
  const [stockData, setStockData] = useState(null);
  const [news, setNews] = useState([]);
  const [analysis, setAnalysis] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch detailed stock data
        const [profileRes, newsRes] = await Promise.all([
          axios.get(`/api/stocks/${stock.symbol}/profile`),
          axios.get(`/api/stocks/${stock.symbol}/news`)
        ]);
        
        setStockData(profileRes.data);
        setNews(newsRes.data.slice(0, 5)); // Get top 5 news items
        
        // Generate AI analysis
        generateAnalysis(stock, profileRes.data, newsRes.data);
      } catch (error) {
        console.error('Error fetching stock details:', error);
      }
    };

    fetchData();
  }, [stock]);

  const generateAnalysis = (stock, profile, newsItems) => {
    // This would be more sophisticated in a real app
    let analysisText = `Quantum AI analysis for ${stock.symbol}:\n\n`;
    analysisText += `Company: ${profile.name}\n`;
    analysisText += `Sector: ${profile.finnhubIndustry}\n\n`;
    
    // Add news sentiment analysis
    if (newsItems.length > 0) {
      analysisText += "Recent news sentiment:\n";
      newsItems.forEach(item => {
        analysisText += `- ${item.headline} (${item.sentiment >= 0 ? '👍' : '👎'})\n`;
      });
    }
    
    setAnalysis(analysisText);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-modal" onClick={onClose}>×</button>
        
        {stockData && (
          <div className="company-header">
            <div className="modal-logo">{stock.symbol}</div>
            <div className="company-info">
              <h2>{stockData.name}</h2>
              <div className="current-price">
                ${stock.price.toFixed(2)} (
                <span className={stock.price >= stock.previousClose ? 'price-up' : 'price-down'}>
                  {((stock.price - stock.previousClose) / stock.previousClose * 100).toFixed(2)}%
                </span>)
              </div>
            </div>
          </div>
        )}
        
        <div className="ai-analysis">
          <h3>QUANTUM AI ANALYSIS</h3>
          <pre>{analysis}</pre>
        </div>
        
        <div className="news-section">
          <h3>RECENT NEWS</h3>
          {news.length > 0 ? (
            <ul>
              {news.map((item, index) => (
                <li key={index}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.headline}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent news available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockModal;
