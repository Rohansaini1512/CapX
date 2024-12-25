import React from "react";
const StockForm = ({ addStock }) => {
    const [form, setForm] = React.useState({ name: '', ticker: '', quantity: 0, price: 0 });
  
    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };
  
    return (
      <form className="p-4">
        <input
          className="border p-2 m-2 w-full"
          placeholder="Stock Name"
          name="name"
          onChange={handleChange}
        />
        <input
          className="border p-2 m-2 w-full"
          placeholder="Ticker"
          name="ticker"
          onChange={handleChange}
        />
        <input
          className="border p-2 m-2 w-full"
          placeholder="Quantity"
          name="quantity"
          type="number"
          onChange={handleChange}
        />
        <input
          className="border p-2 m-2 w-full"
          placeholder="Buy Price"
          name="price"
          type="number"
          onChange={handleChange}
        />
        <button
          type="button"
          className="bg-blue-500 text-white p-2 rounded"
          onClick={() => addStock(form)}
        >
          Add Stock
        </button>
      </form>
    );
  };
 export default StockForm;  