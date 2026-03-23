package com.example.Products.Service;

import java.util.List;
import com.example.Products.Entity.Products;

public interface ProductService {

    Products save(Products products);

    List<Products> getAll();

    Products getById(Long id);

    List<Products> getByCategory(String category);

    Products update(Long id, Products products);

    void delete(Long id);

    Products createProduct(Products products, List<String> imageUrls);
    
    Products addImagesToProduct(Long productId, List<String> imageUrls);
    
    List<Products> searchProducts(String keyword);
}