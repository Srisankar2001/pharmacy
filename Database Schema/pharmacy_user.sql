-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: pharmacy
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `dob` date NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` text NOT NULL,
  `role` enum('USER','ADMIN') NOT NULL DEFAULT 'USER',
  `is_active` tinyint NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Srisankar','Sriharan','2001-11-12','admin1@gmail.com','$2b$10$2JVfI8.gJoTNOlBfLzmVreThI39VUiz6ABFQMz0bvDxGS7XUYqrbO','ADMIN',1,'2024-05-14 17:33:43'),(2,'Abishayan','Sriharan','2003-02-02','admin2@gmail.com','$2b$10$g95bhVam220XXNSSNPNU2uD3dj4fKiUo/enD1AW.aXCMQOg71ot5e','ADMIN',1,'2024-05-14 17:54:40'),(4,'Ramesh','Ram','2004-06-09','ram@gmail.com','$2b$10$NZAEFGfoIvLJFqjTE.s/TeYO9hiG3EUSumluZO90k4gPNV3LORJ16','ADMIN',1,'2024-05-14 18:00:08'),(7,'Dhoni','Mahendrasingh','1998-05-08','user1@gmail.com','$2b$10$nReqpw5zBs3taG89GDQld.CsL4FeR8A9Mi2R39BuIEj5MKWNY9eei','USER',1,'2024-05-14 18:05:18'),(8,'Kohli','Virat','1998-03-21','user2@gmail.com','$2b$10$5fW3EK.n3hSIU.fIs1m9G.V7tlPKvoYsVnbR8dSJw3ZhOxhFSNjfq','USER',0,'2024-05-14 18:06:22'),(9,'Sachin','Tendulkar','1997-09-19','user3@gmail.com','$2b$10$zFPGXGq2/5e0Bglh918tXOc4q2/ovXLnzmoj5Oqr1WV/h37D7YHDO','USER',1,'2024-05-14 18:07:27'),(10,'Sam','Sam','2001-07-05','sam@gmail.com','$2b$10$.7FZqX9lNh04SbVf1txrDO4JmL0lY83TK5./4mSKfo.aIu8gY.7C6','ADMIN',1,'2024-05-15 15:50:32');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-21 18:06:26
