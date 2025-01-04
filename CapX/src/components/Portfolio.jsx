import { useEffect, useState } from 'react';
import axios from 'axios';

const Portfolio = () => {
  const [stocks, setStocks] = useState([]);
  const [portfolioValue, setPortfolioValue] = useState(0);

  const stockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA']; 
  const API_KEY = 'ctlqe0hr01qv7qq32rc0ctlqe0hr01qv7qq32rcg'; 

  useEffect(() => {
    const fetchStockPrices = async () => {
      try {
        const responses = await Promise.all(
          stockSymbols.map(symbol =>
            axios.get(`https://finnhub.io/api/v1/quote`, {
              params: {
                symbol: symbol,
                token: API_KEY,
              },
            })
          )
        );

        const prices = responses.map(response => ({
          symbol: response.config.params.symbol,
          price: response.data.c, 
        }));

        setStocks(prices);

        const totalValue = prices.reduce((acc, stock) => acc + stock.price, 0);
        setPortfolioValue(totalValue);
      } catch (error) {
        console.error('Error fetching stock prices:', error);
      }
    };

    fetchStockPrices();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Portfolio</h1>
      <ul>
        {stocks.map(stock => (
          <li key={stock.symbol} className="mb-2">
            {stock.symbol}: ${stock.price.toFixed(2)}
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-4">
        Total Portfolio Value: ${portfolioValue.toFixed(2)}
      </h2>
    </div>
  );
};

export default Portfolio;
