package com.example.Products;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {
	
	@Autowired
	private final ProductRepository repository;
	
	public ProductService(ProductRepository repository) {
		this.repository=repository;
	}
	
	public Products save(Products product) {
		return repository.save(product);
	}
	
	public List<Products> getAll(){
		return repository.findAll();
	}
	
	public Products getById(Long id) {
		return repository.findById(id).orElseThrow();
	}
	
	public Products update(Long id,Products product) {
		Products existing=repository.findById(id).orElseThrow();
		existing.setProduct_id(product.getProduct_id());
		existing.setName(product.getName());
		existing.setDescription(product.getDescription());
		existing.setCategory(product.getCategory());
		existing.setPrice(product.getPrice());
		existing.setProduct_rating(product.getProduct_rating());
		return repository.save(existing);
	}
	
	public void delete(Long id) {
		repository.deleteById(id);
	}
}
