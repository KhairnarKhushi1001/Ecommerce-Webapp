package com.example.Product_Category;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class Product_CategoryService {

    private final Product_CategoryRepository repository;
    private final RestTemplate restTemplate;

    public Product_CategoryService(Product_CategoryRepository repository, RestTemplate restTemplate) {
        this.repository = repository;
        this.restTemplate = restTemplate;
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

    // ✅ NEW METHOD
    public List<Object> getProductsByCategory(Long categoryId) {

        Product_Category category = repository.findById(categoryId).orElseThrow();

        String categoryName = category.getCategory_name();

        // call Product Service
        String url = "http://localhost:8080/products/category/" + categoryName;

        Object[] products = restTemplate.getForObject(url, Object[].class);

        return Arrays.asList(products);
    }
}