-----

# IT Support & Equipment Management System

> Un backend robuste développé avec Spring Boot pour la gestion des équipements informatiques, le suivi des pannes et la gestion des tickets de support.

Ce projet est le système backend pour une application de gestion informatique complète, conçue pour la société fictive "ITSolutions". Il fournit une API REST sécurisée pour gérer le cycle de vie des équipements, suivre leur maintenance et gérer les demandes de support des utilisateurs.

## 🎯 Fonctionnalités

  * **Gestion des Équipements :** CRUD complet (Créer, Lire, Mettre à jour, Supprimer) pour tous les équipements informatiques.
  * **Suivi des Pannes :** Enregistrer, modifier, supprimer et consulter l'historique des pannes pour chaque équipement.
  * **Gestion des Tickets de Support :**
      * Les utilisateurs peuvent créer des tickets pour signaler un problème.
      * Les administrateurs peuvent attribuer des tickets aux techniciens.
      * Les techniciens peuvent consulter les tickets qui leur sont assignés.
      * Les utilisateurs peuvent suivre le statut de leurs tickets.
  * **Authentification et Sécurité :** Système d'authentification sécurisé basé sur les rôles (Admin, Technicien, Utilisateur) utilisant JWT (JSON Web Tokens).

## 🛠️ Technologies Utilisées

  * **Backend :** [Spring Boot](https://spring.io/projects/spring-boot)
  * **Sécurité :** [Spring Security](https://spring.io/projects/spring-security) avec [JWT](https://jwt.io/)
  * **Accès aux données :** [Spring Data JPA](https://spring.io/projects/spring-data-jpa)
  * **Base de données :** [MySQL](https://www.mysql.com/)
  * **Utilitaires :** [Lombok](https://projectlombok.org/) pour réduire le code répétitif
  * **Gestion des dépendances :** [Maven](https://maven.apache.org/)

## 🚀 Démarrage Rapide

Pour faire fonctionner ce projet en local, suivez ces étapes.

### Prérequis

  * [JDK 17](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html) ou une version supérieure
  * [Maven](https://maven.apache.org/download.cgi)
  * Une instance de [suspicious link removed] en cours d'exécution

### Installation

1.  **Clonez le dépôt**

    ```sh
    git clone https://github.com/votre-nom-utilisateur/itsupportapp.git
    cd itsupportapp
    ```

2.  **Configurez la base de données**
    Ouvrez le fichier `src/main/resources/application.properties` et mettez à jour les informations de connexion à votre base de données MySQL.

    ```properties
    # Configuration de la source de données MySQL
    spring.datasource.url=jdbc:mysql://localhost:3306/itsupport_db?createDatabaseIfNotExist=true
    spring.datasource.username=votre_utilisateur_mysql
    spring.datasource.password=votre_mot_de_passe_mysql
    spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

    # Configuration de JPA/Hibernate
    spring.jpa.hibernate.ddl-auto=update
    spring.jpa.show-sql=true
    spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

    # Secret pour JWT (changez cette valeur pour la production)
    app.jwt.secret======================JWTSecretKey=====================
    app.jwt.expiration-ms=86400000
    ```

3.  **Lancez l'application**
    Vous pouvez construire et lancer le projet avec Maven :

    ```sh
    mvn clean install
    java -jar target/itsupportapp-0.0.1-SNAPSHOT.jar
    ```

    Ou vous pouvez le lancer directement depuis votre IDE (IntelliJ, Eclipse, etc.).

L'application devrait maintenant tourner sur `http://localhost:8080`.

## 🔑 Rôles des Utilisateurs

Le système définit trois rôles avec des permissions différentes :

  * `ROLE_ADMIN` : Accès complet à toutes les fonctionnalités. Peut gérer les équipements, les pannes, les utilisateurs et attribuer des tickets.
  * `ROLE_TECHNICIEN` : Peut voir et mettre à jour le statut des tickets qui lui sont assignés.
  * `ROLE_USER` : Peut créer des tickets de support et suivre l'état de ses propres tickets.

## 📄 Endpoints de l'API

Voici les principaux endpoints de l'API REST. Toutes les requêtes (sauf `/api/auth/**`) nécessitent un Bearer Token JWT dans l'en-tête `Authorization`.

#### Authentification (`/api/auth`)

  * `POST /signup` : Inscrire un nouvel utilisateur.
  * `POST /signin` : Connecter un utilisateur et recevoir un token JWT.

#### Gestion des Équipements (`/api/equipements`) - `ADMIN` seulement

  * `GET /` : Lister tous les équipements.
  * `GET /{id}` : Obtenir un équipement par son ID.
  * `POST /` : Ajouter un nouvel équipement.
  * `PUT /{id}` : Mettre à jour un équipement existant.
  * `DELETE /{id}` : Supprimer un équipement.

#### Gestion des Tickets (`/api/tickets`)

  * `POST /` : Créer un ticket de support (`USER`).
  * `GET /` : Lister tous les tickets (`ADMIN`).
  * `GET /mytickets` : Voir les tickets créés par l'utilisateur connecté (`USER`).
  * `GET /assigned` : Voir les tickets assignés au technicien connecté (`TECHNICIEN`).
  * `PUT /{id}/assign/{technicienId}` : Assigner un ticket à un technicien (`ADMIN`).
  * `PUT /{id}/status` : Mettre à jour le statut d'un ticket (`TECHNICIEN`, `ADMIN`).

#### Gestion des Pannes (`/api/pannes`) - `ADMIN` seulement

  * `POST /` : Ajouter une nouvelle panne à un équipement.
  * `GET /equipement/{equipementId}` : Consulter l'historique des pannes d'un équipement.

## 🤝 Contribution

Les contributions sont ce qui fait de la communauté open source un endroit extraordinaire pour apprendre, inspirer et créer. Toutes les contributions que vous faites sont **grandement appréciées**.

1.  Forkez le projet
2.  Créez votre branche de fonctionnalité (`git checkout -b feature/AmazingFeature`)
3.  Commitez vos changements (`git commit -m 'Add some AmazingFeature'`)
4.  Pushez vers la branche (`git push origin feature/AmazingFeature`)
5.  Ouvrez une Pull Request

## 📄 Licence

Distribué sous la licence MIT. Voir `LICENSE.txt` pour plus d'informations.
