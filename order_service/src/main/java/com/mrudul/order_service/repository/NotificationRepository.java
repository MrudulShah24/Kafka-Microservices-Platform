package com.mrudul.order_service.repository;

import com.mrudul.order_service.entity.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<NotificationEntity, Long> {
    boolean existsByTrackingIdAndNotificationStatus(String trackingId, String notificationStatus);
}
