package com.example.Inventory;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class InventoryService {

	private final InventoryRepository repository;
	private final RestTemplate restTemplate;

	public InventoryService(InventoryRepository repository, RestTemplate restTemplate) {
		this.repository = repository;
		this.restTemplate = restTemplate;
	}

	public Inventory save(Inventory inventory) {

		validateProduct(inventory.getProduct_id());

		return repository.save(inventory);
	}

	public List<Inventory> getAll(){
		return repository.findAll();
	}

	public Inventory getByProductId(Long id) {
		return repository.findById(id).orElseThrow();
	}

	public Inventory update(Long id, Inventory inventory) {

		Inventory existing = repository.findById(id).orElseThrow();

		existing.setStock_quantity(inventory.getStock_quantity());
		existing.setReorder_level(inventory.getReorder_level());

		return repository.save(existing);
	}

	public void delete(Long id) {
		repository.deleteById(id);
	}

	private void validateProduct(Long productId) {

		String url = "http://localhost:8080/products/" + productId;

		try {
			restTemplate.getForObject(url, Object.class);
		} 
		catch (Exception e) {
			throw new RuntimeException("Product does not exist");
		}
	}
}