package com.mrudul.payment_service.consumer;

import com.mrudul.payment_service.dto.EventMessage;
import com.mrudul.payment_service.dto.OrderEvent;
import com.mrudul.payment_service.entity.PaymentEntity;
import com.mrudul.payment_service.repository.PaymentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.annotation.RetryableTopic;
import org.springframework.kafka.annotation.DltHandler;
import org.springframework.retry.annotation.Backoff;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Service;
import org.springframework.kafka.core.KafkaTemplate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class PaymentConsumer {

    private static final Logger log = LoggerFactory.getLogger(PaymentConsumer.class);

    @Autowired
    private PaymentRepository paymentRepository;

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
            groupId = "payment-group"
    )
    public void processPayment(
            OrderEvent orderEvent,
            @Header(KafkaHeaders.RECEIVED_PARTITION) int partition
    ) {

        log.info("================================");
        log.info("PAYMENT SERVICE");
        log.info("Received from partition: {}", partition);
        log.info("Processing payment for order: {}", orderEvent.getOrderId());

        // SIMULATE PAYMENT FAILURE
        if (orderEvent.getOrderId() == 999 || (orderEvent.getProductName() != null && orderEvent.getProductName().startsWith("FAIL-"))) {
            log.warn("PAYMENT FAILED for order: {}, product: {}", orderEvent.getOrderId(), orderEvent.getProductName());
            throw new RuntimeException("Payment Failed");
        }

        // CREATE PAYMENT ENTITY
        PaymentEntity paymentEntity =
                new PaymentEntity(
                        orderEvent.getOrderId(),
                        orderEvent.getProductName(),
                        orderEvent.getPrice(),
                        "SUCCESS",
                        orderEvent.getTrackingId()
                );

        // SAVE INTO DATABASE
        paymentRepository.save(paymentEntity);

        kafkaTemplate.send(
                "dashboard-events",
                new EventMessage(
                        "PAYMENT_SUCCESS",
                        "Payment successful for "
                                + orderEvent.getProductName(),
                        orderEvent.getTrackingId()
                )
        );

        log.info("Payment saved into PostgreSQL");
        log.info("================================");
    }

    @DltHandler
    public void handleDlt(OrderEvent orderEvent, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic) {
        log.error("Payment Service DLT Handler received orderId: {} from topic: {}", orderEvent.getOrderId(), topic);

        kafkaTemplate.send(
                "dashboard-events",
                new EventMessage(
                        "PAYMENT_FAILED",
                        "Payment failed for " + orderEvent.getProductName(),
                        orderEvent.getTrackingId()
                )
        );
    }
}