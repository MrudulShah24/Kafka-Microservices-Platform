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