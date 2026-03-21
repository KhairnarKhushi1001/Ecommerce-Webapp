package com.example.Products.Controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.Products.Entity.Products;
import com.example.Products.Service.ProductService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/products")
public class ProductsController {
	
	@Autowired
	private ProductService service;
	private final Cloudinary cloudinary;
	

	
	public ProductsController(ProductService service, Cloudinary cloudinary) {
		this.service=service;
        this.cloudinary = cloudinary;
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
	
	@GetMapping("/category/{category}")
	public List<Products> getByCategory(@PathVariable String category) {
	    return service.getByCategory(category);
	}
	
	@PutMapping("/{id}")
	public Products update(@PathVariable Long id,@RequestBody Products product) {
		return service.update(id, product);
	}
	
	@DeleteMapping("/{id}")
	public void delete(@PathVariable Long id) {
		service.delete(id);
	}
	
	
	@PostMapping("/{id}/images")
	public Products addImages(
	        @PathVariable Long id,
	        @RequestBody List<String> imageUrls) {

	    return service.addImagesToProduct(id, imageUrls);
	}
	
	

	@GetMapping("/upload/signature")
	public Map<String, Object> getUploadSignature() {
	    try {
	        Map<String, Object> params = ObjectUtils.asMap(
	                "timestamp", System.currentTimeMillis() / 1000,
	                "folder", "products"
	        );

	        String signature = cloudinary.apiSignRequest(params, cloudinary.config.apiSecret);

	        return Map.of(
	                "signature", signature,
	                "timestamp", params.get("timestamp"),
	                "cloud_name", cloudinary.config.cloudName,
	                "api_key", cloudinary.config.apiKey
	        );
	    } catch (Exception e) {
	        throw new RuntimeException("Failed to generate Cloudinary signature", e);
	    }
	}
}
