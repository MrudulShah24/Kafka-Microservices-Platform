# Operations Guide

This document lists day-to-day runtime notes for the Kafka Microservices Platform.

## Service Ports

- Order Service: `http://localhost:8080`
- Payment Service: `http://localhost:8081`
- Inventory Service: `http://localhost:8082`
- Notification Service: `http://localhost:8083`
- Frontend: `http://localhost:5173`

## Kafka Topics

- `orders`
- `dashboard-events`

## Health Checks (Actuator)

- `http://localhost:8080/actuator/health`
- `http://localhost:8081/actuator/health`
- `http://localhost:8082/actuator/health`
- `http://localhost:8083/actuator/health`

## Start/Stop with Docker

Start:

```bash
docker compose up -d
```

Stop:

```bash
docker compose down
```

Rebuild images after dependency changes:

```bash
docker compose build --no-cache
```

## Common Issues

- 404 on `/actuator/health` usually means the container is running an old image.
  Rebuild and restart the affected service.
- If events do not appear in the dashboard, confirm Kafka is running and the
  `dashboard-events` topic exists.

