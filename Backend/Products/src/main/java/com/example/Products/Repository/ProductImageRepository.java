package com.example.Products.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.Products.Entity.ProductImage;

public interface ProductImageRepository extends JpaRepository<ProductImage, Long> {
	List<ProductImage> findByProductProductId(Long productId); 
}
