package com.mrudul.payment_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Index;

@Entity
@Table(name = "payments", indexes = {
    @Index(name = "idx_payments_tracking_id", columnList = "tracking_id")
})
public class PaymentEntity {

    @Id
    private Long orderId;

    private String productName;

    private double price;

    private String paymentStatus;

    private String trackingId;

    public PaymentEntity() {
    }

    public PaymentEntity(
            Long orderId,
            String productName,
            double price,
            String paymentStatus
    ) {
        this.orderId = orderId;
        this.productName = productName;
        this.price = price;
        this.paymentStatus = paymentStatus;
    }

    public PaymentEntity(
            Long orderId,
            String productName,
            double price,
            String paymentStatus,
            String trackingId
    ) {
        this.orderId = orderId;
        this.productName = productName;
        this.price = price;
        this.paymentStatus = paymentStatus;
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

    public String getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(String paymentStatus) {
        this.paymentStatus = paymentStatus;
    }

    public String getTrackingId() {
        return trackingId;
    }

    public void setTrackingId(String trackingId) {
        this.trackingId = trackingId;
    }
}