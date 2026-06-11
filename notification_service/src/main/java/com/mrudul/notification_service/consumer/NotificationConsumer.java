package com.mrudul.notification_service.consumer;

import com.mrudul.notification_service.dto.OrderEvent;
import com.mrudul.notification_service.entity.NotificationEntity;
import com.mrudul.notification_service.repository.NotificationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.annotation.RetryableTopic;
import org.springframework.kafka.annotation.DltHandler;
import org.springframework.retry.annotation.Backoff;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Service;

import com.mrudul.notification_service.dto.EventMessage;
import org.springframework.kafka.core.KafkaTemplate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class NotificationConsumer {

    private static final Logger log = LoggerFactory.getLogger(NotificationConsumer.class);

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private KafkaTemplate<String, EventMessage> kafkaTemplate;

    @RetryableTopic(
            attempts = "4",
            backoff = @Backoff(
                    delay = 1000,
                    multiplier = 2.0
            )
    )
    @KafkaListener(
            topics = "orders",
            groupId = "notification-group"
    )
    public void processNotification(
            OrderEvent orderEvent,
            @Header(KafkaHeaders.RECEIVED_PARTITION)
            int partition
    ) {

        log.info("================================");
        log.info("NOTIFICATION SERVICE");
        log.info("Received from partition: {}", partition);
        log.info("Sending notification for order: {}", orderEvent.getOrderId());

        // SIMULATE NOTIFICATION FAILURE
        if (orderEvent.getProductName() != null && orderEvent.getProductName().startsWith("FAIL-")) {
            log.warn("NOTIFICATION FAILURE for order: {}, product: {}", orderEvent.getOrderId(), orderEvent.getProductName());
            throw new RuntimeException("Notification Failed");
        }

        String message =
                "Order confirmed for "
                        + orderEvent.getProductName();

        // CREATE ENTITY
        NotificationEntity notificationEntity =
                new NotificationEntity(
                        orderEvent.getOrderId(),
                        message,
                        "SENT",
                        orderEvent.getTrackingId()
                );

        // SAVE INTO DATABASE
        notificationRepository.save(
                notificationEntity
        );

        kafkaTemplate.send(
                "dashboard-events",
                new EventMessage(
                        "NOTIFICATION_SENT",
                        "Notification sent for "
                                + orderEvent.getProductName(),
                        orderEvent.getTrackingId()
                )
        );

        log.info("Notification saved into PostgreSQL");
        log.info("================================");
    }

    @DltHandler
    public void handleDlt(OrderEvent orderEvent, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic) {
        log.error("Notification Service DLT Handler received orderId: {} from topic: {}", orderEvent.getOrderId(), topic);

        kafkaTemplate.send(
                "dashboard-events",
                new EventMessage(
                        "NOTIFICATION_FAILED",
                        "Notification failed for " + orderEvent.getProductName(),
                        orderEvent.getTrackingId()
                )
        );
    }
}