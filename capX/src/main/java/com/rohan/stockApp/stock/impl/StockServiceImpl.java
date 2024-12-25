package com.rohan.stockApp.stock.impl;

import com.rohan.stockApp.stock.Stock;
import com.rohan.stockApp.stock.StockRepository;
import com.rohan.stockApp.stock.StockService;

import org.springframework.dao.OptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StockServiceImpl implements StockService {
    private final StockRepository stockRepository;

    public StockServiceImpl(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    @Override
    public List<Stock> findAll() {
        return stockRepository.findAll();
    }

    @Override
    public Stock createStock(Stock stock) {
        try {
            return stockRepository.save(stock); // save or update the stock entity
        } catch (OptimisticLockingFailureException e) {
            // Handle optimistic locking failure
            throw new RuntimeException("Concurrency issue: stock record has been modified by another transaction.");
        }
    }
    @Override
    public Stock getStockById(Long id) {
        return stockRepository.findById(id).orElse(null);
    }

    @Override
    public Stock updateStock(Long id, Stock updatedStock) {
        Optional<Stock> stockOptional = stockRepository.findById(id);
        if (stockOptional.isPresent()) {
            Stock stock = stockOptional.get();
            stock.setName(updatedStock.getName());
            stock.setQuantity(updatedStock.getQuantity());
            stock.setPrice(updatedStock.getPrice());
            return stockRepository.save(stock);
        }
        return null;
    }

    @Override
    public boolean deleteStockById(Long id) {
        try {
            stockRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public double calculatePortfolioValue() {
        List<Stock> stocks = stockRepository.findAll();
        return stocks.stream()
                .mapToDouble(stock -> stock.getQuantity() * stock.getPrice())
                .sum();
    }
}
