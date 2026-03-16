package com.example.Products;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
public class ProductsController {
	
	@Autowired
	private ProductService service;
	
	public ProductsController(ProductService service) {
		this.service=service;
	}
	
	@PostMapping
	public Products create(@RequestBody Products product) {
		return service.save(product);
	}
	
	@GetMapping
	public List<Products> getAll(){
		return service.getAll();
	}
	
	@GetMapping("/{id}")
	public Products getById(@PathVariable Long id) {
		return service.getById(id);
	}
	
	@PutMapping("/{id}")
	public Products update(@PathVariable Long id,@RequestBody Products product) {
		return service.update(id, product);
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
}
