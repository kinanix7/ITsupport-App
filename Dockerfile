FROM openjdk:23
ADD target/ITsupport-App-0.0.1-SNAPSHOT.jar ITsupport-App.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "ITsupport-App.jar"]
