package com.example.Products.Entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;

@Entity
@Table(name = "product_images")
public class ProductImage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long image_id;

    @Column(nullable = false)
    private String image_url;

    private Boolean is_primary = false;

    private LocalDateTime created_at;

    @PrePersist
    public void prePersist() {
        created_at = LocalDateTime.now();
    }

    @ManyToOne
    @JoinColumn(name = "product_id", nullable = false)
    @JsonBackReference   // 🔥 prevents infinite loop
    private Products product;

    // ✅ GETTERS & SETTERS

    public Long getImage_id() {
        return image_id;
    }

    public void setImage_id(Long image_id) {
        this.image_id = image_id;
    }

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }

    public Boolean getIs_primary() {
        return is_primary;
    }

    public void setIs_primary(Boolean is_primary) {
        this.is_primary = is_primary;
    }

    public LocalDateTime getCreated_at() {
        return created_at;
    }

    public void setCreated_at(LocalDateTime created_at) {
        this.created_at = created_at;
    }

    public Products getProduct() {   // ✅ IMPORTANT
        return product;
    }

    public void setProduct(Products product) {   // ✅ IMPORTANT
        this.product = product;
    }
}