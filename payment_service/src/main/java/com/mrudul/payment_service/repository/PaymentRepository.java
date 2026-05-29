package com.mrudul.payment_service.repository;

import com.mrudul.payment_service.entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository
        extends JpaRepository<PaymentEntity, Long> {
}