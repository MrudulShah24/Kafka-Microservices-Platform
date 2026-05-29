package com.mrudul.payment_service.controller;

import com.mrudul.payment_service.entity.PaymentEntity;
import com.mrudul.payment_service.service.PaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @GetMapping
    public List<PaymentEntity> getAllPayments() {

        return paymentService.getAllPayments();

    }
}