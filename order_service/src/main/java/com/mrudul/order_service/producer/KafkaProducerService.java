package com.mrudul.order_service.producer;

import com.mrudul.order_service.dto.OrderEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class KafkaProducerService {

    private static final Logger log = LoggerFactory.getLogger(KafkaProducerService.class);

    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;

    public KafkaProducerService(
            KafkaTemplate<String, OrderEvent> kafkaTemplate
    ) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendOrderEvent(OrderEvent orderEvent) {

        kafkaTemplate.send(
                "orders",
                orderEvent.getOrderId().toString(),
                orderEvent
        );

        log.info("Order Event Published: {}", orderEvent.getOrderId());
    }
}