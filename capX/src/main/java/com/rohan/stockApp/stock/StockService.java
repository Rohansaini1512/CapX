package com.rohan.stockApp.stock;

import java.util.List;

public interface StockService {
    List<Stock> findAll();
    Stock createStock(Stock stock);
    Stock getStockById(Long id);
    Stock updateStock(Long id, Stock updatedStock);
    boolean deleteStockById(Long id);
    double calculatePortfolioValue();
}
