package com.mrudul.inventory_service.dto;

public class EventMessage {

    private String type;
    private String message;
    private String trackingId;

    public EventMessage() {
    }

    public EventMessage(
            String type,
            String message
    ) {
        this.type = type;
        this.message = message;
    }

    public EventMessage(
            String type,
            String message,
            String trackingId
    ) {
        this.type = type;
        this.message = message;
        this.trackingId = trackingId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getTrackingId() {
        return trackingId;
    }

    public void setTrackingId(String trackingId) {
        this.trackingId = trackingId;
    }
}