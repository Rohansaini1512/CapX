const Dashboard = () => (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4">
      <div className="p-4 bg-blue-200 rounded shadow-md">
        <h2 className="font-bold text-lg">Total Stocks</h2>
        <p>10</p>
      </div>
      <div className="p-4 bg-green-200 rounded shadow-md">
        <h2 className="font-bold text-lg">Portfolio Value</h2>
        <p>$15,000</p>
      </div>
      <div className="p-4 bg-red-200 rounded shadow-md">
        <h2 className="font-bold text-lg">Profit/Loss</h2>
        <p>+5%</p>
      </div>
    </div>
  );
  
  export default Dashboard;