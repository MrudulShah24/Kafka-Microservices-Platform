package com.mrudul.inventory_service.controller;

import com.mrudul.inventory_service.entity.InventoryEntity;
import com.mrudul.inventory_service.service.InventoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/inventory")
@CrossOrigin(origins = "http://localhost:5173")
public class InventoryController {

    @Autowired
    private InventoryService inventoryService;

    @GetMapping
    public List<InventoryEntity> getAllInventory() {

        return inventoryService.getAllInventory();

    }
}