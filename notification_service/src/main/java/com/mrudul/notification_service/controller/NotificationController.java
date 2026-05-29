package com.mrudul.notification_service.controller;

import com.mrudul.notification_service.entity.NotificationEntity;
import com.mrudul.notification_service.service.NotificationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @GetMapping
    public List<NotificationEntity> getAllNotifications() {

        return notificationService.getAllNotifications();

    }
}