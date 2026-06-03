package com.mrudul.order_service.consumer;

import com.mrudul.order_service.dto.EventMessage;
import com.mrudul.order_service.service.EventStreamService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class DashboardEventConsumer {

    @Autowired
    private EventStreamService eventStreamService;

    @KafkaListener(
            topics = "dashboard-events",
            groupId = "dashboard-group"
    )
    public void consume(
            EventMessage event
    ) {

        System.out.println(
                "Dashboard Event Received: "
                        + event.getMessage()
        );

        eventStreamService.sendEvent(
                event
        );

    }
}