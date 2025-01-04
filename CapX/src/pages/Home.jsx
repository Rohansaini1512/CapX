import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Dashboard from "../components/Dashboard";
import StockForm from "../components/StockForm";
import StockList from "../components/StockList";
import EditStock from "../components/EditStock";
import { fetchStocks, saveStocks } from "../utils/stockService";

const Home = () => {
  const [stocks, setStocks] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [stockToEdit, setStockToEdit] = useState(null);

  // Fetch stocks on initial load
  useEffect(() => {
    const initialStocks = fetchStocks();
    setStocks(initialStocks);
  }, []);

  useEffect(() => {
    saveStocks(stocks);
  }, [stocks]);

  // Add a new stock
  const addStock = (stock) => {
    setStocks([...stocks, stock]);
  };

  // Edit an existing stock
  const startEditing = (index) => {
    setIsEditMode(true);
    setStockToEdit({ ...stocks[index], index });
  };

  const saveEdit = (updatedStock) => {
    setStocks((prevStocks) =>
      prevStocks.map((stock, i) =>
        i === stockToEdit.index ? { ...updatedStock, index: i } : stock
      )
    );
    setIsEditMode(false);
    setStockToEdit(null);
  };
  

  const cancelEdit = () => {
    setIsEditMode(false);
    setStockToEdit(null);
  };

  // Remove a stock
  const removeStock = (index) => {
    setStocks(stocks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Portfolio Dashboard</h1>
        <Dashboard stocks={stocks} />

        {!isEditMode ? (
          <div className="bg-white p-4 rounded shadow-md my-4">
            <h2 className="text-lg font-semibold mb-2">Add Stock</h2>
            <StockForm addStock={addStock} />
          </div>
        ) : (
          <EditStock
            stockToEdit={stockToEdit}
            onSave={saveEdit}
            onCancel={cancelEdit}
          />
        )}

        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-lg font-semibold mb-2">Stock Holdings</h2>
          <StockList
            stocks={stocks}
            editStock={startEditing}
            removeStock={removeStock}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
