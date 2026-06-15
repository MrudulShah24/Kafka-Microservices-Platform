# Kafka Microservices Platform - Project Status

## Project Overview

A distributed event-driven microservices platform built using:

* Spring Boot
* Apache Kafka
* PostgreSQL
* Docker Compose
* React
* TypeScript
* Tailwind CSS
* Framer Motion

The project demonstrates asynchronous communication between multiple services using Kafka and visualizes the workflow through a real-time dashboard.

---

# Repository

GitHub Repository:

Kafka-Microservices-Platform

---

# Microservices

## Order Service

Port: 8080

Responsibilities:

* Create orders
* Save orders into PostgreSQL
* Publish OrderEvent to Kafka topic: orders
* SSE endpoint for real-time dashboard updates

Endpoints:

* POST /orders
* GET /orders
* GET /events/stream
* GET /orders/{trackingId}/status

---

## Payment Service

Port: 8081

Responsibilities:

* Consume OrderEvent from Kafka
* Simulate payment processing
* Save payment records into PostgreSQL
* Publish PAYMENT_SUCCESS event to dashboard-events topic

Kafka Consumer Group:

payment-group

---

## Inventory Service

Port: 8082

Responsibilities:

* Consume OrderEvent from Kafka
* Update inventory
* Save inventory records into PostgreSQL
* Publish INVENTORY_UPDATED event to dashboard-events topic

Kafka Consumer Group:

inventory-group

---

## Notification Service

Port: 8083

Responsibilities:

* Consume OrderEvent from Kafka
* Create notification records
* Save notifications into PostgreSQL
* Publish NOTIFICATION_SENT event to dashboard-events topic

Kafka Consumer Group:

notification-group

---

## API Gateway

Port: 8060

Responsibilities:

* Consolidate all frontend communication through a single entry point
* Proxy requests to order, payment, inventory, and notification microservices
* Strip gateway /api prefix and route internally to microservices
* Deduplicate response headers (CORS allowed-origin and allowed-credentials) using RETAIN_FIRST strategy
* Enable global CORS configuration for the React host (http://localhost:5173)

---

# Infrastructure

## Kafka

Current Topics:

* orders
* dashboard-events

Verified using:

/opt/kafka/bin/kafka-topics.sh --bootstrap-server localhost:9092 --list

Result:

* orders
* dashboard-events
* __consumer_offsets

---

## PostgreSQL

Running through Docker Compose.

Used by all services.

---

## Docker

Services:

* kafka
* postgres
* order_service
* payment_service
* inventory_service
* notification_service

Startup:

docker compose up -d

Shutdown:

docker compose down

---

# Frontend Dashboard

Technology:

* React
* TypeScript
* Tailwind
* Framer Motion

Components:

* Navbar
* Hero
* Metric Cards
* Pipeline
* Order Form
* Service Health
* Recent Orders
* Recent Payments
* Recent Inventory
* Recent Notifications
* Order Timeline
* Live Event Stream

---

# Service Health Monitor

Status:

COMPLETED

Checks:

* Kafka Broker
* PostgreSQL
* Order Service
* Payment Service
* Inventory Service
* Notification Service

Automatically refreshes every few seconds.

Shows UP / DOWN state.

---

# Recent Data Panels

Status:

COMPLETED

Implemented:

* Recent Orders
* Recent Payments
* Recent Inventory
* Recent Notifications

Latest records displayed in dashboard.

---

# SSE Real-Time Event Streaming

Status:

COMPLETED

Architecture:

Order Service
→ orders topic
→ Payment Service
→ Inventory Service
→ Notification Service
→ dashboard-events topic
→ Order Service SSE
→ React Dashboard

Files Added:

* EventMessage.java
* EventStreamService.java
* EventStreamController.java
* DashboardEventConsumer.java

Current Event Types:

* ORDER_CREATED
* PAYMENT_SUCCESS
* INVENTORY_UPDATED
* NOTIFICATION_SENT

Verified:

Live Event Stream updates instantly without refresh.

Example:

🛒 Order created for MacBook M5 Max

💳 Payment successful for MacBook M5 Max

📦 Inventory updated for MacBook M5 Max

🔔 Notification sent for MacBook M5 Max

---

# Git Status

SSE implementation committed and pushed.

Project synchronized with GitHub.

---

# Current Architecture

```text
React Dashboard (localhost:5173)
       │ (Port 8060)
       ▼
  API Gateway (localhost:8060)
       │
       ├─► /api/orders & /api/events/stream ─► Order Service (8080)
       ├─► /api/payments ─────────────────────► Payment Service (8081)
       ├─► /api/inventory ────────────────────► Inventory Service (8082)
       └─► /api/notifications ────────────────► Notification Service (8083)

Asynchronous Event Flow (Kafka):
Order Service ─► "orders" topic ─► [Payment, Inventory, Notification Services]
[Payment, Inventory, Notification Services] ─► "dashboard-events" topic ─► Order Service ─► SSE Stream ─► React Dashboard
```

# Correlation ID & Tracking ID Propagation

Status:

COMPLETED

Features:
* Automatic UUID generation for all orders upon creation in Order Service.
* Unchanged propagation of `trackingId` downstream through Payment Service, Inventory Service, and Notification Service (including DLT channels).
* Return `trackingId` to the frontend via EventMessage SSE stream messages.
* Expose order status check endpoint `/api/orders/{trackingId}/status` using Spring Data JPA repository methods (e.g. `existsByTrackingId()`).
* Visual display in React Live Event Stream, Recent Tables (abbreviated first 8 characters), and dynamic grouping of timeline events by trackingId in OrderTimeline component.

---

# Next Planned Feature

Distributed Tracing

Goals:

* Add OpenTelemetry / Spring Cloud Sleuth integration
* Visualize trace contexts across Kafka consumers and HTTP calls
* Propagate traces to Zipkin or Jaeger dashboard

---

# Future Roadmap

1. JWT Authentication & Security on Gateway
2. Prometheus & Grafana Integration
3. Docker Hub Publishing
4. Production Deployment Concepts
5. Kubernetes Introduction

---

# Daily Startup

```bash
# Rebuild any code changes and start everything
docker-compose up --build -d

# Start the frontend
cd frontend
npm run dev
```

Open:
http://localhost:5173

---

# Daily Shutdown

```bash
# Stop the frontend (Ctrl + C)
# Stop docker containers
docker-compose down
```

---

# Last Major Milestone

Performance Testing, Load Testing, and Documentation.

The platform was validated under concurrent client traffic to measure HTTP latency, end-to-end event propagation speed, and component stability. A replication load-test script was created at `performance/load-test.js`.

Metrics measured on a local Docker-based development environment:
* Request-Response Latency: ≈ 116 ms
* End-to-End Kafka Workflow: ≈ 185 ms
* Load Testing:
  * 50 Users: ~183 req/s, 269 ms avg, 0% failure rate
  * 100 Users: ~466 req/s, 214 ms avg, 0% failure rate
  * 200 Users: ~782 req/s, 253 ms avg, 0% failure rate
