package com.mrudul.inventory_service.consumer;

import com.mrudul.inventory_service.dto.OrderEvent;
import com.mrudul.inventory_service.entity.InventoryEntity;
import com.mrudul.inventory_service.repository.InventoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Service;

@Service
public class InventoryConsumer {

    @Autowired
    private InventoryRepository inventoryRepository;

    @KafkaListener(
            topics = "orders",
            groupId = "inventory-group"
    )
    public void processInventory(
            OrderEvent orderEvent,
            @Header(KafkaHeaders.RECEIVED_PARTITION)
            int partition
    ) {

        System.out.println("================================");

        System.out.println("INVENTORY SERVICE");

        System.out.println(
                "Received from partition: "
                        + partition
        );

        System.out.println(
                "Updating inventory for order: "
                        + orderEvent.getOrderId()
        );

        // CREATE ENTITY
        InventoryEntity inventoryEntity =
                new InventoryEntity(
                        orderEvent.getOrderId(),
                        orderEvent.getProductName(),
                        orderEvent.getPrice(),
                        "UPDATED"
                );

        // SAVE INTO DATABASE
        inventoryRepository.save(
                inventoryEntity
        );

        System.out.println(
                "Inventory updated in PostgreSQL"
        );

        System.out.println("================================");
    }
}