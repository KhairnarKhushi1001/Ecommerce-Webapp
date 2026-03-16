package com.example.Inventory;

import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/inventory")
public class InventoryController {

    private final InventoryService service;

    public InventoryController(InventoryService service) {
        this.service = service;
    }

    @PostMapping
    public Inventory create(@RequestBody Inventory inventory) {
        return service.save(inventory);
    }

    @GetMapping
    public List<Inventory> getAll() {
        return service.getAll();
    }

    @GetMapping("/{productId}")
    public Inventory getById(@PathVariable Long productId) {
        return service.getByProductId(productId);
    }

    @PutMapping("/{productId}")
    public Inventory update(@PathVariable Long productId, @RequestBody Inventory inventory) {
        return service.update(productId, inventory);
    }

    @DeleteMapping("/{productId}")
    public void delete(@PathVariable Long productId) {
        service.delete(productId);
    }
}