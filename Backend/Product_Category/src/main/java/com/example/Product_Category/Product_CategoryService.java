package com.example.Product_Category;


import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class Product_CategoryService {

    private final Product_CategoryRepository repository;

    public Product_CategoryService(Product_CategoryRepository repository) {
        this.repository = repository;
    }

    public Product_Category save(Product_Category category) {
        return repository.save(category);
    }

    public List<Product_Category> getAll() {
        return repository.findAll();
    }

    public Product_Category getById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    public Product_Category update(Long id, Product_Category category) {

        Product_Category existing = repository.findById(id).orElseThrow();

        existing.setCategory_name(category.getCategory_name());

        return repository.save(existing);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
