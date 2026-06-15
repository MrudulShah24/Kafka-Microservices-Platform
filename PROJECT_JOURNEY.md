Day 1

Created Order Service.

Implemented Kafka Producer.

Created orders topic manually from Kafka CLI.

------------------------------------------------

Day 2

Added Payment Service consumer.

Added Inventory Service consumer.

Added Notification Service consumer.

Used separate consumer groups:
- payment-group
- inventory-group
- notification-group

Reason:
All services must receive same OrderEvent.

------------------------------------------------

Day 3

Dockerized all microservices.

Created Docker Compose.

Stopped using mvn spring-boot:run.

Project now runs entirely through Docker.

Build command:

.\mvnw clean package -DskipTests

Reason:
Spring tests fail because DB/Kafka are containerized.

------------------------------------------------

Day 4

Created React Dashboard.

Added:
- Metrics
- Pipeline
- Infrastructure Monitor

------------------------------------------------

Day 5

Added:
- Recent Orders
- Recent Payments
- Recent Inventory
- Recent Notifications

------------------------------------------------

Day 6

Implemented SSE.

Files:
- EventMessage.java
- EventStreamService.java
- EventStreamController.java

Result:
ORDER_CREATED events now appear instantly in dashboard.

------------------------------------------------

Day 7

Implemented Multi-Service Real-Time Event Streaming.

Created Kafka topic:

- dashboard-events

Added EventMessage DTO to:

- payment_service
- inventory_service
- notification_service

Added producers:

- PAYMENT_SUCCESS
- INVENTORY_UPDATED
- NOTIFICATION_SENT

Created:

- DashboardEventConsumer

Flow:

Order Service
→ Kafka
→ Payment Service
→ Inventory Service
→ Notification Service
→ dashboard-events
→ SSE
→ React Dashboard

Result:

Live dashboard now shows:

🛒 Order Created

💳 Payment Successful

📦 Inventory Updated

🔔 Notification Sent

without page refresh.

Day 8

Implemented dashboard-events topic.

Payment Service publishes PAYMENT_SUCCESS.

Inventory Service publishes INVENTORY_UPDATED.

Notification Service publishes NOTIFICATION_SENT.

Order Service consumes dashboard-events.

Implemented real-time multi-service event streaming using SSE.

Frontend now displays:
- Order Created
- Payment Success
- Inventory Updated
- Notification Sent

with icons, badges, and timestamps.

------------------------------------------------

Day 9

Implemented Spring Cloud API Gateway Integration and resolved CORS wildcard/duplicate header issues.

Details:
* Created `api_gateway` microservice on port `8060`.
* Refactored React frontend to consolidate all calls to port `8060` via `API_BASE_URL` in central config.
* Resolved CORS header conflicts on `/api/events/stream` SSE stream where the gateway returned `Access-Control-Allow-Origin: http://localhost:5173` and the downstream service returned `Access-Control-Allow-Origin: *` by correcting `application.yml` nesting and applying `RETAIN_FIRST` deduplication strategy.
* Aligned fallback `@CrossOrigin` origin in order service `EventStreamController` to point to `http://localhost:5173`.
* Verified that real-time order creations and service health monitor work seamlessly through port `8060`.

------------------------------------------------

Day 10

Implemented production-style Correlation ID / Tracking ID propagation across the entire event-driven microservices platform and UI.

Details:
* Added `trackingId` to `OrderEvent` DTO, `EventMessage` DTO, and all JPA Entity schemas (`OrderEntity`, `PaymentEntity`, `InventoryEntity`, `NotificationEntity`) across all 4 microservices.
* Generated UUID tracking ID in `Order Service` when an order is created, and propagated it through Kafka event streams (including DLQ retry channels).
* Configured database indexes on the `tracking_id` columns in PostgreSQL to optimize lookups.
* Created a status endpoint `GET /orders/{trackingId}/status` in `Order Service` utilizing Spring Data JPA repository methods (e.g., `existsByTrackingId()`) over minimal entity mappings to retrieve order lifecycle states.
* Upgraded the React Dashboard: displayed the tracking ID under live stream event cards, added a shortened tracking ID column to recent lists, and dynamically grouped lifecycle events together by `trackingId` in the `OrderTimeline` component.

------------------------------------------------

Day 11

Added performance & load testing scripts and documentation.

Details:
* Created a dedicated Performance Testing & Scalability Analysis section in `README.md` documenting request-response latency, end-to-end Kafka workflow speed, and scalability results.
* Added professional caveats detailing that measurements were performed in a local Docker-based development environment and results vary depending on system hardware configuration.
* Added `performance/load-test.js` to run k6 load testing on `GET /api/orders` via API Gateway, configured without artificial pauses to accurately replicate throughput benchmarks.
* Cleaned up redundant load test scripts at repository root.