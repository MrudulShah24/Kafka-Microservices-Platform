package com.mrudul.order_service.repository;

import com.mrudul.order_service.entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<PaymentEntity, Long> {
    boolean existsByTrackingIdAndPaymentStatus(String trackingId, String paymentStatus);
}
