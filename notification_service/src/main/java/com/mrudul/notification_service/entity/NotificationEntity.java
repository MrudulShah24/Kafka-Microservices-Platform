package com.mrudul.notification_service.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "notifications")
public class NotificationEntity {

    @Id
    private Long orderId;

    private String message;

    private String notificationStatus;

    public NotificationEntity() {
    }

    public NotificationEntity(
            Long orderId,
            String message,
            String notificationStatus
    ) {
        this.orderId = orderId;
        this.message = message;
        this.notificationStatus = notificationStatus;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getNotificationStatus() {
        return notificationStatus;
    }

    public void setNotificationStatus(String notificationStatus) {
        this.notificationStatus = notificationStatus;
    }
}