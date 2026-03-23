package com.example.Products.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Products.Entity.Products;

public interface ProductRepository extends JpaRepository<Products, Long> {

    List<Products> findByCategory(String category);
    
    List<Products> findByNameContainingIgnoreCaseOrCategoryContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String name,
            String category,
            String description
        );
}