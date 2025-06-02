const NEWS_API_KEY = 'a9ce5f3ac3b9486c968e3144b865782a'; // Get from https://newsapi.org

async function loadStockNews(ticker) {
  try {
    // First try NewsAPI
    const response = await fetch(`https://newsapi.org/v2/everything?q=${ticker}&apiKey=${a9ce5f3ac3b9486c968e3144b865782a}&pageSize=3&sortBy=publishedAt`);
    const data = await response.json();
    
    if (data.articles && data.articles.length > 0) {
      return data.articles.map(article => ({
        title: article.title,
        url: article.url,
        source: article.source.name,
        date: new Date(article.publishedAt).toLocaleDateString()
      }));
    }
    
    // Fallback to Finnhub news if NewsAPI fails
    const finnhubResponse = await fetch(`https://finnhub.io/api/v1/company-news?symbol=${ticker}&from=${new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}&to=${new Date().toISOString().split('T')[0]}&token=${finnhubApiKey}`);
    const finnhubData = await finnhubResponse.json();
    
    return finnhubData.slice(0, 3).map(item => ({
      title: item.headline,
      url: item.url,
      source: item.source,
      date: new Date(item.datetime * 1000).toLocaleDateString()
    }));
    
  } catch (error) {
    console.error(`Error loading news for ${ticker}:`, error);
    return [];
  }
}

function displayNewsOnCard(ticker, articles) {
  const newsContainer = document.getElementById(`news-${ticker}`);
  if (!newsContainer) return;
  
  if (articles.length === 0) {
    newsContainer.innerHTML = '<span>No recent news</span>';
    return;
  }
  
  newsContainer.innerHTML = articles.map(article => 
    `<a href="${article.url}" target="_blank" title="${article.source} - ${article.date}">${article.title}</a>`
  ).join('');
}

// Add this to your updateStockCard function:
async function updateStockCard(ticker, currentPrice, previousClose) {
  // ... existing price update code ...
  
  // Load and display news
  const articles = await loadStockNews(ticker);
  displayNewsOnCard(ticker, articles);
}
