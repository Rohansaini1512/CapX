import { useEffect, useState } from 'react';
import axios from 'axios';

const Portfolio = () => {
  const [stocks, setStocks] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [loading, setLoading] = useState(true);

  // Example stock symbols
  const stockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'];

  useEffect(() => {
    const fetchStockPrices = async () => {
      setLoading(true); // Set loading to true before fetching data
      try {
        const responses = await Promise.all(
          stockSymbols.map(async (symbol) => {
            try {
              const response = await axios.get(`https://www.alphavantage.co/query`, {
                params: {
                  function: 'TIME_SERIES_INTRADAY',
                  symbol: symbol,
                  interval: '5min',
                  apikey: import.meta.env.VITE_ALPHA_VANTAGE_API_KEY, 
                },
              });

              const timeSeries = response.data['Time Series (5min)'];
              if (!timeSeries) {
                console.warn(`No data for ${symbol}`);
                return { symbol, price: 0 };
              }

              const latestTime = Object.keys(timeSeries)[0];
              return {
                symbol,
                price: parseFloat(timeSeries[latestTime]['1. open']),
              };
            } catch (err) {
              console.error(`Error fetching data for ${symbol}:`, err);
              return { symbol, price: 0 };
            }
          })
        );

        // Set stocks and portfolio value
        setStocks(responses);
        const totalValue = responses.reduce((acc, stock) => acc + stock.price, 0);
        setPortfolioValue(totalValue);
      } catch (error) {
        console.error('Error fetching stock prices:', error);
      } finally {
        setLoading(false); // Ensure loading is false after the operation
      }
    };

    fetchStockPrices();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Portfolio</h1>
      {loading ? (
        <p>Loading stock prices...</p>
      ) : (
        <>
          <ul>
            {stocks.map((stock) => (
              <li key={stock.symbol} className="mb-2">
                {stock.symbol}: ${stock.price.toFixed(2)}
              </li>
            ))}
          </ul>
          <h2 className="text-xl font-bold mt-4">
            Total Portfolio Value: ${portfolioValue.toFixed(2)}
          </h2>
        </>
      )}
    </div>
  );
};

export default Portfolio;
