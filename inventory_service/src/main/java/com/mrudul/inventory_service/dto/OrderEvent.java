package com.mrudul.inventory_service.dto;

public class OrderEvent {

    private Long orderId;

    private String productName;

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