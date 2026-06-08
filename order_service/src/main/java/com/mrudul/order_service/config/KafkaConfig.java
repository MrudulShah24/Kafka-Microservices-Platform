package com.mrudul.order_service.config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaConfig {

    @Bean
    public NewTopic paymentDlt() {
        return TopicBuilder.name("payment-dlt")
                .partitions(1)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic inventoryDlt() {
        return TopicBuilder.name("inventory-dlt")
                .partitions(1)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic notificationDlt() {
        return TopicBuilder.name("notification-dlt")
                .partitions(1)
                .replicas(1)
                .build();
    }
}
