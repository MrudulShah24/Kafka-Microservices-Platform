package com.mrudul.inventory_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Index;

@Entity
@Table(name = "inventory", indexes = {
    @Index(name = "idx_inventory_tracking_id", columnList = "tracking_id")
})
public class InventoryEntity {

    @Id
    private Long orderId;

    private String productName;

    private double price;

    private String inventoryStatus;

    private String trackingId;

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

    public InventoryEntity(
            Long orderId,
            String productName,
            double price,
            String inventoryStatus,
            String trackingId
    ) {
        this.orderId = orderId;
        this.productName = productName;
        this.price = price;
        this.inventoryStatus = inventoryStatus;
        this.trackingId = trackingId;
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

    public String getTrackingId() {
        return trackingId;
    }

    public void setTrackingId(String trackingId) {
        this.trackingId = trackingId;
    }
}