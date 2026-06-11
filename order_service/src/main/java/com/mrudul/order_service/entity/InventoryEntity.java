package com.mrudul.order_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "inventory")
public class InventoryEntity {

    @Id
    private Long orderId;

    private String inventoryStatus;

    private String trackingId;

    public InventoryEntity() {
    }

    public InventoryEntity(Long orderId, String inventoryStatus, String trackingId) {
        this.orderId = orderId;
        this.inventoryStatus = inventoryStatus;
        this.trackingId = trackingId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
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
