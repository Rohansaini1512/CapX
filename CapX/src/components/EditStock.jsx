import React, { useState, useEffect } from "react";

const EditStock = ({ stockToEdit, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    ticker: "",
    quantity: "",
    buyPrice: "",
  });

  useEffect(() => {
    if (stockToEdit) {
      setFormData(stockToEdit);
    }
  }, [stockToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Pass the updated stock data to the parent
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-2">Edit Stock</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Stock Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="text"
          name="ticker"
          placeholder="Ticker"
          value={formData.ticker}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={formData.quantity}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
          required
        />
        <input
          type="number"
          step="0.01"
          name="buyPrice"
          placeholder="Buy Price"
          value={formData.buyPrice}
          onChange={handleChange}
          className="border p-2 mb-2 w-full"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditStock;
