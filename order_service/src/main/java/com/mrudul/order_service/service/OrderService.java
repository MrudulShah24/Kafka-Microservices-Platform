package com.mrudul.order_service.service;

import com.mrudul.order_service.dto.OrderEvent;
import com.mrudul.order_service.entity.OrderEntity;
import com.mrudul.order_service.repository.OrderRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private KafkaTemplate<String, OrderEvent> kafkaTemplate;

    @Transactional
    public void placeOrder(OrderEvent orderEvent) {

        OrderEntity orderEntity =
                new OrderEntity(
                        orderEvent.getOrderId(),
                        orderEvent.getProductName(),
                        orderEvent.getPrice()
                );

        orderRepository.save(orderEntity);

        System.out.println(
                "Order saved in PostgreSQL"
        );

        kafkaTemplate.send(
                "orders",
                orderEvent
        );

        System.out.println(
                "Order event sent to Kafka"
        );
    }

    public List<OrderEntity> getAllOrders() {

        return orderRepository.findAll();

    }
}