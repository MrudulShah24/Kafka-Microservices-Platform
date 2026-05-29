package com.mrudul.inventory_service.service;

import com.mrudul.inventory_service.entity.InventoryEntity;
import com.mrudul.inventory_service.repository.InventoryRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InventoryService {

    @Autowired
    private InventoryRepository inventoryRepository;

    public List<InventoryEntity> getAllInventory() {

        return inventoryRepository.findAll();

    }
}