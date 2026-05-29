package com.mrudul.order_service.producer;

import com.mrudul.order_service.dto.OrderEvent;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
public class KafkaProducerService {

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

        System.out.println(
                "Order Event Published: "
                        + orderEvent.getOrderId()
        );
    }
}