package com.mrudul.order_service.controller;

import com.mrudul.order_service.service.EventStreamService;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/events")
public class EventStreamController {

    private final EventStreamService eventStreamService;

    public EventStreamController(
            EventStreamService eventStreamService
    ) {
        this.eventStreamService = eventStreamService;
    }

    @GetMapping("/stream")
    public SseEmitter stream() {

        return eventStreamService.subscribe();

    }
}