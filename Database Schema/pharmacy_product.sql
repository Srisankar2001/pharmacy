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
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `category` int NOT NULL,
  `quantity` varchar(45) NOT NULL,
  `description` longtext NOT NULL,
  `manufactured_date` date NOT NULL,
  `expiry_date` date NOT NULL,
  `buying_price` double NOT NULL,
  `selling_price` double NOT NULL,
  `stock` int NOT NULL,
  `sold` int NOT NULL DEFAULT '0',
  `company` varchar(45) NOT NULL,
  `url` mediumtext NOT NULL,
  `added_at` datetime NOT NULL,
  `added_by` int NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `updated_by` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_name_category` (`name`,`quantity`),
  KEY `id_idx` (`category`),
  CONSTRAINT `id` FOREIGN KEY (`category`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Product',2,'10mg','Abc','2024-05-06','2028-06-16',100,110,83,13,'Company','image_1715803357407.jpg','2024-05-15 20:02:37',1,NULL,NULL),(6,'Product A',1,'10mg X 12','description','2024-05-15','2025-06-17',100,200,86,14,'company','image_1715967249195.jpg','2024-05-17 17:34:09',1,NULL,NULL),(8,'Product B',2,'10mg X 12','description','2024-05-06','2026-06-16',100,200,395,5,'company','image_1715967332211.png','2024-05-17 17:35:32',1,NULL,NULL),(9,'ProductC',5,'10mcg','description','2024-05-07','2026-12-26',250,300,100,0,'company','image_1716291751800.png','2024-05-21 11:42:31',1,NULL,NULL),(10,'ProductD',3,'20mg','description','2024-05-06','2026-05-20',250,350,200,0,'company','image_1716291802507.jpg','2024-05-21 11:43:22',1,NULL,NULL),(11,'ProductD',2,'20mcg','description','2024-05-13','2025-05-13',400,450,100,0,'company','image_1716291843323.jpg','2024-05-21 11:44:03',1,NULL,NULL),(12,'ProductE',3,'12mg X 12','description','2024-05-06','2026-06-10',100,300,100,0,'company','image_1716291905727.jpg','2024-05-21 11:45:05',1,NULL,NULL),(13,'ProductF',5,'10mg X 15','description','2024-05-13','2025-07-15',100,200,100,0,'company','image_1716291954603.jpg','2024-05-21 11:45:54',1,NULL,NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
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
