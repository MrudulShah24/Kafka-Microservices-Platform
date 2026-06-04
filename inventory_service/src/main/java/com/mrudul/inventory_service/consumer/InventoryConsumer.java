package com.mrudul.inventory_service.consumer;

import com.mrudul.inventory_service.dto.OrderEvent;
import com.mrudul.inventory_service.entity.InventoryEntity;
import com.mrudul.inventory_service.repository.InventoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Service;
import com.mrudul.inventory_service.dto.EventMessage;
import org.springframework.kafka.core.KafkaTemplate;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class InventoryConsumer {

    private static final Logger log = LoggerFactory.getLogger(InventoryConsumer.class);

    @Autowired
    private InventoryRepository inventoryRepository;

    @Autowired
    private KafkaTemplate<String, EventMessage> kafkaTemplate;

    @KafkaListener(
            topics = "orders",
            groupId = "inventory-group"
    )
    public void processInventory(
            OrderEvent orderEvent,
            @Header(KafkaHeaders.RECEIVED_PARTITION)
            int partition
    ) {

        log.info("================================");
        log.info("INVENTORY SERVICE");
        log.info("Received from partition: {}", partition);
        log.info("Updating inventory for order: {}", orderEvent.getOrderId());

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

        kafkaTemplate.send(
                "dashboard-events",
                new EventMessage(
                        "INVENTORY_UPDATED",
                        "Inventory updated for "
                                + orderEvent.getProductName()
                )
        );

        log.info("Inventory updated in PostgreSQL");
        log.info("================================");
    }
}