package com.mrudul.notification_service.repository;

import com.mrudul.notification_service.entity.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository
        extends JpaRepository<NotificationEntity, Long> {
}