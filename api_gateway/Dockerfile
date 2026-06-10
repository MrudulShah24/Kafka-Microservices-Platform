FROM eclipse-temurin:23-jdk

WORKDIR /app

COPY target/api_gateway-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8060

ENTRYPOINT ["java", "-jar", "app.jar"]
