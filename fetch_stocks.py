import yfinance as yf, pandas as pd, json
sp500 = pd.read_html('https://en.wikipedia.org/wiki/List_of_S%26P_500_companies')[0]
tickers = sp500['Symbol'].tolist() + ['BTC-USD', 'ETH-USD']
data = yf.download(tickers, period="1d", group_by='ticker')
results = {t: {
    'price': round(data[t]['Close'].iloc[-1], 2),
    'change': round((data[t]['Close'].iloc[-1]/data[t]['Close'].iloc[-2]-1)*100, 2)
} for t in tickers if t in data}
with open('stocks.json', 'w') as f: json.dump(results, f)
