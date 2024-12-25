package com.rohan.stockApp.stock;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
public class StockController {
    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    // Fetch all stocks
    @GetMapping
    public ResponseEntity<List<Stock>> findAll() {
        return ResponseEntity.ok(stockService.findAll());
    }

    // Add a new stock
    @PostMapping
    public ResponseEntity<Stock> createStock(@RequestBody Stock stock) {
        return new ResponseEntity<>(stockService.createStock(stock), HttpStatus.CREATED);
    }

    // Get stock by ID
    @GetMapping("/{id}")
    public ResponseEntity<Stock> getStockById(@PathVariable Long id) {
        Stock stock = stockService.getStockById(id);
        if (stock != null) {
            return ResponseEntity.ok(stock);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Update existing stock
    @PutMapping("/{id}")
    public ResponseEntity<Stock> updateStock(@PathVariable Long id, @RequestBody Stock updatedStock) {
        Stock stock = stockService.updateStock(id, updatedStock);
        if (stock != null) {
            return ResponseEntity.ok(stock);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete a stock
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStockById(@PathVariable Long id) {
        boolean deleted = stockService.deleteStockById(id);
        if (deleted) {
            return ResponseEntity.ok("Stock deleted successfully");
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Calculate portfolio value
    @GetMapping("/portfolio-value")
    public ResponseEntity<Double> calculatePortfolioValue() {
        return ResponseEntity.ok(stockService.calculatePortfolioValue());
    }
}
