package com.mrudul.order_service.service;

import com.mrudul.order_service.dto.OrderEvent;
import com.mrudul.order_service.entity.OrderEntity;
import com.mrudul.order_service.repository.OrderRepository;
import com.mrudul.order_service.dto.EventMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class OrderService {

    private static final Logger log = LoggerFactory.getLogger(OrderService.class);

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private KafkaTemplate<String, OrderEvent> kafkaTemplate;

    @Autowired
    private EventStreamService eventStreamService;

    @Transactional
    public void placeOrder(OrderEvent orderEvent) {

        String trackingId = java.util.UUID.randomUUID().toString();
        orderEvent.setTrackingId(trackingId);

        OrderEntity orderEntity =
                new OrderEntity(
                        orderEvent.getOrderId(),
                        orderEvent.getProductName(),
                        orderEvent.getPrice(),
                        trackingId
                );

        orderRepository.save(orderEntity);

        log.info("Order saved in PostgreSQL with trackingId: {}", trackingId);

        kafkaTemplate.send(
                "orders",
                orderEvent
        );

        log.info("Order event sent to Kafka");

        eventStreamService.sendEvent(
                new EventMessage(
                        "ORDER_CREATED",
                        "Order created for "
                                + orderEvent.getProductName(),
                        trackingId
                )
        );
    }

    public List<OrderEntity> getAllOrders() {

        return orderRepository.findAll();

    }
}