package com.example.Products.Service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.Products.Entity.ProductImage;
import com.example.Products.Entity.Products;
import com.example.Products.Repository.ProductRepository;
import com.example.Products.Service.ProductService;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repository;

    public ProductServiceImpl(ProductRepository repository) {
        this.repository = repository;
    }

    @Override
    public Products save(Products products) {
        return repository.save(products);
    }

    @Override
    public List<Products> getAll() {
        return repository.findAll();
    }

    @Override
    public Products getById(Long id) {
        return repository.findById(id).orElseThrow();
    }

    @Override
    public List<Products> getByCategory(String category) {
        return repository.findByCategory(category);
    }

    @Override
    public Products update(Long id, Products products) {
        Products existing = repository.findById(id).orElseThrow();

        existing.setName(products.getName());
        existing.setDescription(products.getDescription());
        existing.setCategory(products.getCategory());
        existing.setPrice(products.getPrice());
        existing.setProduct_rating(products.getProduct_rating());

        return repository.save(existing);
    }

    @Override
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public Products createProduct(Products products, List<String> imageUrls) {

        List<ProductImage> images = new ArrayList<>();

        for (int i = 0; i < imageUrls.size(); i++) {
            ProductImage img = new ProductImage();
            img.setImage_url(imageUrls.get(i));
            img.setProduct(products);

            if (i == 0) {
                img.setIs_primary(true);
            }

            images.add(img);
        }

        products.setImages(images);

        return repository.save(products);
    }
    
    @Override
    public Products addImagesToProduct(Long productId, List<String> imageUrls) {

        Products product = repository.findById(productId).orElseThrow();

        List<ProductImage> images = product.getImages();

        if (images == null) {
            images = new ArrayList<>();
        }

        for (String url : imageUrls) {
            ProductImage img = new ProductImage();
            img.setImage_url(url);
            img.setProduct(product);

            // If no primary image exists, set first one
            if (images.isEmpty()) {
                img.setIs_primary(true);
            }

            images.add(img);
        }

        product.setImages(images);

        return repository.save(product);
    }
    
    
}