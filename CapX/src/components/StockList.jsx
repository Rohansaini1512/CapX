/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const StockList = ({ stocks, removeStock, editStock }) => (
  <div className="p-4">
    <table className="w-full border-collapse border">
      <thead>
        <tr>
          <th className="border p-2">Name</th>
          <th className="border p-2">Ticker</th>
          <th className="border p-2">Quantity</th>
          <th className="border p-2">Buy Price</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock, index) => (
          <tr key={index}>
            <td className="border p-2">{stock.name}</td>
            <td className="border p-2">{stock.ticker}</td>
            <td className="border p-2">{stock.quantity}</td>
            <td className="border p-2">{stock.price}</td>
            <td className="border p-2">
              <button
                className="bg-red-500 p-2 text-white mr-2"
                onClick={() => removeStock(index)}
              >
                Delete
              </button>
              <button
                className="bg-blue-500 p-2 text-white"
                onClick={() => editStock(index)}
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default StockList;
