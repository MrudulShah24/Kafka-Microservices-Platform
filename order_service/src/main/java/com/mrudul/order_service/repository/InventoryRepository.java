package com.mrudul.order_service.repository;

import com.mrudul.order_service.entity.InventoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository extends JpaRepository<InventoryEntity, Long> {
    boolean existsByTrackingIdAndInventoryStatus(String trackingId, String inventoryStatus);
}
