package com.mrudul.order_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Index;

@Entity
@Table(name = "orders", indexes = {
    @Index(name = "idx_orders_tracking_id", columnList = "tracking_id")
})
public class OrderEntity {

    @Id
    private Long orderId;

    private String productName;

    private double price;

    private String trackingId;

    public OrderEntity() {
    }

    public OrderEntity(
            Long orderId,
            String productName,
            double price
    ) {
        this.orderId = orderId;
        this.productName = productName;
        this.price = price;
    }

    public OrderEntity(
            Long orderId,
            String productName,
            double price,
            String trackingId
    ) {
        this.orderId = orderId;
        this.productName = productName;
        this.price = price;
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

    public String getTrackingId() {
        return trackingId;
    }

    public void setTrackingId(String trackingId) {
        this.trackingId = trackingId;
    }
}