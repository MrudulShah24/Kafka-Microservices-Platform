package com.mrudul.order_service.dto;

public class OrderStatusResponse {
    private String trackingId;
    private boolean orderCreated;
    private boolean paymentCompleted;
    private boolean inventoryUpdated;
    private boolean notificationSent;

    public OrderStatusResponse() {
    }

    public OrderStatusResponse(
            String trackingId,
            boolean orderCreated,
            boolean paymentCompleted,
            boolean inventoryUpdated,
            boolean notificationSent
    ) {
        this.trackingId = trackingId;
        this.orderCreated = orderCreated;
        this.paymentCompleted = paymentCompleted;
        this.inventoryUpdated = inventoryUpdated;
        this.notificationSent = notificationSent;
    }

    public String getTrackingId() {
        return trackingId;
    }

    public void setTrackingId(String trackingId) {
        this.trackingId = trackingId;
    }

    public boolean isOrderCreated() {
        return orderCreated;
    }

    public void setOrderCreated(boolean orderCreated) {
        this.orderCreated = orderCreated;
    }

    public boolean isPaymentCompleted() {
        return paymentCompleted;
    }

    public void setPaymentCompleted(boolean paymentCompleted) {
        this.paymentCompleted = paymentCompleted;
    }

    public boolean isInventoryUpdated() {
        return inventoryUpdated;
    }

    public void setInventoryUpdated(boolean inventoryUpdated) {
        this.inventoryUpdated = inventoryUpdated;
    }

    public boolean isNotificationSent() {
        return notificationSent;
    }

    public void setNotificationSent(boolean notificationSent) {
        this.notificationSent = notificationSent;
    }
}
