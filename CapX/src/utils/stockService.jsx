import axios from 'axios';

// Base URL for your Spring Boot backend (make sure this matches your backend's URL)
const API_URL = "http://localhost:9095/api/stocks";

// Fetch stocks from the backend (Spring Boot)
export const fetchStocks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data; // Return the stocks data from the backend
  } catch (error) {
    console.error("Error fetching stocks:", error);
    return []; // Return an empty array if there's an error
  }
};

// Save a new stock to the backend
export const saveStocks = async (stocks) => {
  try {
    // Save all stocks to the backend
    // Loop through and send each stock to the backend (you can modify this if you need batch operations)
    const responses = await Promise.all(
      stocks.map(stock => axios.post(API_URL, stock))
    );
    return responses.map(response => response.data); // Return the saved stocks
  } catch (error) {
    console.error("Error saving stocks:", error);
    return [];
  }
};

// Update an existing stock on the backend
export const updateStock = async (id, stock) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, stock);
    return response.data; // Return the updated stock
  } catch (error) {
    console.error("Error updating stock:", error);
    return null; // Return null if there's an error
  }
};

// Delete a stock from the backend
export const deleteStock = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting stock:", error);
  }
};
