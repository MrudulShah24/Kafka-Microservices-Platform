package com.mrudul.order_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "notifications")
public class NotificationEntity {

    @Id
    private Long orderId;

    private String notificationStatus;

    private String trackingId;

    public NotificationEntity() {
    }

    public NotificationEntity(Long orderId, String notificationStatus, String trackingId) {
        this.orderId = orderId;
        this.notificationStatus = notificationStatus;
        this.trackingId = trackingId;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getNotificationStatus() {
        return notificationStatus;
    }

    public void setNotificationStatus(String notificationStatus) {
        this.notificationStatus = notificationStatus;
    }

    public String getTrackingId() {
        return trackingId;
    }

    public void setTrackingId(String trackingId) {
        this.trackingId = trackingId;
    }
}
