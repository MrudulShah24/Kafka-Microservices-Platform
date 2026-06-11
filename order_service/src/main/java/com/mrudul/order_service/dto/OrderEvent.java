package com.mrudul.order_service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public class OrderEvent {

    @NotNull(message = "orderId is required")
    @Positive(message = "orderId must be positive")
    private Long orderId;

    @NotBlank(message = "productName is required")
    private String productName;

    @NotNull(message = "price is required")
    @Positive(message = "price must be positive")
    private Double price;

    private String trackingId;

    public OrderEvent() {
    }

    public OrderEvent(Long orderId, String productName, Double price) {
        this.orderId = orderId;
        this.productName = productName;
        this.price = price;
    }

    public OrderEvent(Long orderId, String productName, Double price, String trackingId) {
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

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getTrackingId() {
        return trackingId;
    }

    public void setTrackingId(String trackingId) {
        this.trackingId = trackingId;
    }
}