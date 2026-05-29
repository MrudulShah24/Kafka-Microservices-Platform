package com.mrudul.inventory_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "inventory")
public class InventoryEntity {

    @Id
    private Long orderId;

    private String productName;

    private double price;

    private String inventoryStatus;

    public InventoryEntity() {
    }

    public InventoryEntity(
            Long orderId,
            String productName,
            double price,
            String inventoryStatus
    ) {
        this.orderId = orderId;
        this.productName = productName;
        this.price = price;
        this.inventoryStatus = inventoryStatus;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getInventoryStatus() {
        return inventoryStatus;
    }

    public void setInventoryStatus(String inventoryStatus) {
        this.inventoryStatus = inventoryStatus;
    }
}