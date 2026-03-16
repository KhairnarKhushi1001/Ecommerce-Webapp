package com.example.Product_Category;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Product_CategoryRepository extends JpaRepository<Product_Category, Long> {

}