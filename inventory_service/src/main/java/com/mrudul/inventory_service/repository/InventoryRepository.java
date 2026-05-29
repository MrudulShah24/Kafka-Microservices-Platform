package com.mrudul.inventory_service.repository;

import com.mrudul.inventory_service.entity.InventoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryRepository
        extends JpaRepository<InventoryEntity, Long> {
}