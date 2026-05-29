package com.mrudul.payment_service.service;

import com.mrudul.payment_service.entity.PaymentEntity;
import com.mrudul.payment_service.repository.PaymentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    public List<PaymentEntity> getAllPayments() {

        return paymentRepository.findAll();

    }
}