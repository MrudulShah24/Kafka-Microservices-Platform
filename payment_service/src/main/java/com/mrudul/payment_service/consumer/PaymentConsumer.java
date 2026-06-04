package com.mrudul.payment_service.consumer;

import com.mrudul.payment_service.dto.EventMessage;
import com.mrudul.payment_service.dto.OrderEvent;
import com.mrudul.payment_service.entity.PaymentEntity;
import com.mrudul.payment_service.repository.PaymentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
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
        if(orderEvent.getOrderId() == 999){

            log.warn("PAYMENT FAILED for order: {}", orderEvent.getOrderId());

            throw new RuntimeException(
                    "Payment Failed"
            );
        }

        // CREATE PAYMENT ENTITY
        PaymentEntity paymentEntity =
                new PaymentEntity(
                        orderEvent.getOrderId(),
                        orderEvent.getProductName(),
                        orderEvent.getPrice(),
                        "SUCCESS"
                );

        // SAVE INTO DATABASE
        paymentRepository.save(paymentEntity);

        kafkaTemplate.send(
                "dashboard-events",
                new EventMessage(
                        "PAYMENT_SUCCESS",
                        "Payment successful for "
                                + orderEvent.getProductName()
                )
        );

        log.info("Payment saved into PostgreSQL");
        log.info("================================");
    }
}