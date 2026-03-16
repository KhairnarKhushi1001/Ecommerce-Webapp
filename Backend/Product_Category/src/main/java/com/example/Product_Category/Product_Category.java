package com.example.Product_Category;

import java.time.LocalDateTime;

import jakarta.persistence.*;

@Entity
@Table(name="categories")
public class Product_Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long category_id;

    @Column(unique = true, nullable = false)
    private String category_name;

    private LocalDateTime created_at;

    private LocalDateTime updated_at;

    public Product_Category() {}

    public Product_Category(Long category_id, String category_name, LocalDateTime created_at, LocalDateTime updated_at) {
        this.category_id = category_id;
        this.category_name = category_name;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    @PrePersist
    protected void onCreate() {
        created_at = LocalDateTime.now();
        updated_at = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updated_at = LocalDateTime.now();
    }

    public Long getCategory_id() {
        return category_id;
    }

    public void setCategory_id(Long category_id) {
        this.category_id = category_id;
    }

    public String getCategory_name() {
        return category_name;
    }

    public void setCategory_name(String category_name) {
        this.category_name = category_name;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public LocalDateTime getUpdated_at() {
        return updated_at;
    }

    public void setUpdated_at(LocalDateTime updated_at) {
        this.updated_at = updated_at;
    }
}