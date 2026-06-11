package com.mrudul.order_service.controller;

import com.mrudul.order_service.dto.OrderEvent;
import com.mrudul.order_service.entity.OrderEntity;
import com.mrudul.order_service.service.OrderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;

import java.util.List;

@RestController
@RequestMapping("/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class KafkaMessageController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private com.mrudul.order_service.repository.OrderRepository orderRepository;

    @Autowired
    private com.mrudul.order_service.repository.PaymentRepository paymentRepository;

    @Autowired
    private com.mrudul.order_service.repository.InventoryRepository inventoryRepository;

    @Autowired
    private com.mrudul.order_service.repository.NotificationRepository notificationRepository;

    @PostMapping
    public String placeOrder(
            @Valid @RequestBody OrderEvent orderEvent
    ) {

        if (orderEvent.getOrderId() == null || orderEvent.getOrderId() <= 0) {
            throw new IllegalArgumentException("orderId must be positive");
        }

        if (orderEvent.getProductName() == null
                || orderEvent.getProductName().trim().isEmpty()) {
            throw new IllegalArgumentException("productName is required");
        }

        if (orderEvent.getPrice() == null || orderEvent.getPrice() <= 0) {
            throw new IllegalArgumentException("price must be positive");
        }

        orderService.placeOrder(orderEvent);

        return "Order placed successfully! Tracking ID: " + orderEvent.getTrackingId();
    }

    @GetMapping
    public List<OrderEntity> getAllOrders() {

        return orderService.getAllOrders();

    }

    @GetMapping("/{trackingId}/status")
    public com.mrudul.order_service.dto.OrderStatusResponse getOrderStatus(
            @PathVariable String trackingId
    ) {
        boolean orderCreated = orderRepository.existsByTrackingId(trackingId);
        boolean paymentCompleted = paymentRepository.existsByTrackingIdAndPaymentStatus(trackingId, "SUCCESS");
        boolean inventoryUpdated = inventoryRepository.existsByTrackingIdAndInventoryStatus(trackingId, "UPDATED");
        boolean notificationSent = notificationRepository.existsByTrackingIdAndNotificationStatus(trackingId, "SENT");

        return new com.mrudul.order_service.dto.OrderStatusResponse(
                trackingId,
                orderCreated,
                paymentCompleted,
                inventoryUpdated,
                notificationSent
        );
    }
}