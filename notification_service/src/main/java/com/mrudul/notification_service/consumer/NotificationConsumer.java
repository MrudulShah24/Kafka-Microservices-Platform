package com.mrudul.notification_service.consumer;

import com.mrudul.notification_service.dto.OrderEvent;
import com.mrudul.notification_service.entity.NotificationEntity;
import com.mrudul.notification_service.repository.NotificationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Service;

@Service
public class NotificationConsumer {

    @Autowired
    private NotificationRepository notificationRepository;

    @KafkaListener(
            topics = "orders",
            groupId = "notification-group"
    )
    public void processNotification(
            OrderEvent orderEvent,
            @Header(KafkaHeaders.RECEIVED_PARTITION)
            int partition
    ) {

        System.out.println("================================");

        System.out.println("NOTIFICATION SERVICE");

        System.out.println(
                "Received from partition: "
                        + partition
        );

        System.out.println(
                "Sending notification for order: "
                        + orderEvent.getOrderId()
        );

        String message =
                "Order confirmed for "
                        + orderEvent.getProductName();

        // CREATE ENTITY
        NotificationEntity notificationEntity =
                new NotificationEntity(
                        orderEvent.getOrderId(),
                        message,
                        "SENT"
                );

        // SAVE INTO DATABASE
        notificationRepository.save(
                notificationEntity
        );

        System.out.println(
                "Notification saved into PostgreSQL"
        );

        System.out.println("================================");
    }
}