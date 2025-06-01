import yfinance as yf, pandas as pd, json
def get_sp500_tickers():
    return pd.read_html('https://en.wikipedia.org/wiki/List_of_S%26P_500_companies')[0]['Symbol'].tolist() + ['BTC-USD','ETH-USD']
data = yf.download(get_sp500_tickers(), period="1d", group_by='ticker')
results = {ticker: {
    'price': round(data[ticker]['Close'].iloc[-1], 2),
    'change': round((data[ticker]['Close'].iloc[-1]/data[ticker]['Close'].iloc[-2]-1)*100, 2)
} for ticker in get_sp500_tickers() if ticker in data}
with open('stocks.json','w') as f: json.dump(results, f)
