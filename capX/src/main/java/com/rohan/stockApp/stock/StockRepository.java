package com.rohan.stockApp.stock;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StockRepository extends JpaRepository<Stock, Long> {
    // No need to add any custom methods, Spring Data JPA handles basic CRUD operations
}
