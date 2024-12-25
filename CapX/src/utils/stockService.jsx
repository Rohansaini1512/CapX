export const fetchStocks = () => {
    return JSON.parse(localStorage.getItem("stocks")) || [];
  };

  export const saveStocks = (stocks) => {
    localStorage.setItem("stocks", JSON.stringify(stocks));
  };
  