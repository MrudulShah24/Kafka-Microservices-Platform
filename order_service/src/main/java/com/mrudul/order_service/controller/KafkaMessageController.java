package com.mrudul.order_service.controller;

import com.mrudul.order_service.dto.OrderEvent;
import com.mrudul.order_service.entity.OrderEntity;
import com.mrudul.order_service.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class KafkaMessageController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public String placeOrder(
            @RequestBody OrderEvent orderEvent
    ) {

        orderService.placeOrder(orderEvent);

        return "Order placed successfully!";
    }

    @GetMapping
    public List<OrderEntity> getAllOrders() {

        return orderService.getAllOrders();

    }
}