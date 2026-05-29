package com.mrudul.payment_service.consumer;

import com.mrudul.payment_service.dto.OrderEvent;
import com.mrudul.payment_service.entity.PaymentEntity;
import com.mrudul.payment_service.repository.PaymentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.Acknowledgment;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;

@Service
public class PaymentConsumer {

    @Autowired
    private PaymentRepository paymentRepository;


    @KafkaListener(
            topics = "orders",
            groupId = "payment-group"
    )
    public void processPayment(
            OrderEvent orderEvent,
            @Header(KafkaHeaders.RECEIVED_PARTITION) int partition
    ) {

        System.out.println("================================");

        System.out.println("PAYMENT SERVICE");

        System.out.println(
                "Received from partition: "
                        + partition
        );

        System.out.println(
                "Processing payment for order: "
                        + orderEvent.getOrderId()
        );

        // SIMULATE PAYMENT FAILURE
        if(orderEvent.getOrderId() == 999){

            System.out.println(
                    "PAYMENT FAILED!"
            );

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

        System.out.println(
                "Payment saved into PostgreSQL"
        );

        System.out.println("================================");
    }
}