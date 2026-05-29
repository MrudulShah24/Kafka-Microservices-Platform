package com.mrudul.notification_service.service;

import com.mrudul.notification_service.entity.NotificationEntity;
import com.mrudul.notification_service.repository.NotificationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public List<NotificationEntity> getAllNotifications() {

        return notificationRepository.findAll();

    }
}