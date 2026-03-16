package com.example.Product_Category;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/categories")
public class Product_Category_Controller {

    private final Product_CategoryService service;

    public Product_Category_Controller(Product_CategoryService service) {
        this.service = service;
    }

    @PostMapping
    public Product_Category create(@RequestBody Product_Category category) {
        return service.save(category);
    }

    @GetMapping
    public List<Product_Category> getAll() {
        return service.getAll();
    }

    @GetMapping("/{id}")
    public Product_Category getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public Product_Category update(@PathVariable Long id, @RequestBody Product_Category category) {
        return service.update(id, category);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}