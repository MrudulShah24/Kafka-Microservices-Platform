package com.mrudul.inventory_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.retrytopic.DestinationTopic;
import org.springframework.kafka.retrytopic.RetryTopicComponentFactory;
import org.springframework.kafka.retrytopic.RetryTopicConfigurationSupport;
import org.springframework.kafka.retrytopic.RetryTopicNamesProviderFactory;
import org.springframework.kafka.retrytopic.SuffixingRetryTopicNamesProviderFactory;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;

@Configuration
public class KafkaConfig extends RetryTopicConfigurationSupport {

    @Bean
    public TaskScheduler taskScheduler() {
        return new ThreadPoolTaskScheduler();
    }

    @Override
    protected RetryTopicComponentFactory createComponentFactory() {
        return new RetryTopicComponentFactory() {
            @Override
            public RetryTopicNamesProviderFactory retryTopicNamesProviderFactory() {
                return new SuffixingRetryTopicNamesProviderFactory() {
                    @Override
                    public RetryTopicNamesProvider createRetryTopicNamesProvider(DestinationTopic.Properties properties) {
                        return new SuffixingRetryTopicNamesProvider(properties) {
                            @Override
                            public String getTopicName(String topic) {
                                if (properties.isDltTopic()) {
                                    return "inventory-dlt";
                                }
                                String defaultName = super.getTopicName(topic);
                                return defaultName.replace("-retry", "-inventory-retry");
                            }
                        };
                    }
                };
            }
        };
    }
}
