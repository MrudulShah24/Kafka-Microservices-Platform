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

React Dashboard
↑
SSE
↑
Order Service
↑
dashboard-events
↑
Payment Service

dashboard-events
↑
Inventory Service

dashboard-events
↑
Notification Service

orders
↑
Order Service Producer

---

# Next Planned Feature

UI Event Enhancements

Goals:

* Event-specific icons
* Event timestamps
* Event ordering improvements
* Color-coded event badges

---

# Future Roadmap

1. Multi-Service Event Stream
2. Event Type Icons & Colors
3. Docker Hub Publishing
4. Production Deployment Concepts
5. Environment Variables
6. Reverse Proxy Concepts
7. Kubernetes Introduction

---

# Daily Startup

docker compose up -d

cd frontend

npm run dev

Open:

http://localhost:5173

---

# Daily Shutdown

Ctrl + C

docker compose down

---

# Last Major Milestone

Real-Time SSE Event Streaming successfully implemented.

Dashboard now receives ORDER_CREATED events instantly without polling.
