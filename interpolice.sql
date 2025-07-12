-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 12, 2025 at 01:44 AM
-- Server version: 8.4.3
-- PHP Version: 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `interpolice`
--

-- --------------------------------------------------------

--
-- Table structure for table `ciudadanos`
--

CREATE TABLE `ciudadanos` (
  `codigo` int NOT NULL,
  `nombre` text NOT NULL,
  `apellidos` text,
  `apodo` text,
  `fecha_nacimiento` date NOT NULL,
  `planeta_origen` text NOT NULL,
  `planeta_residencia` text NOT NULL,
  `foto` text,
  `codigo_qr` text NOT NULL,
  `estado` tinyint NOT NULL COMMENT '(0 muerto, 1 vivo, 2 congelado por criogenia, 3 eliminado)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `ciudadanos`
--

INSERT INTO `ciudadanos` (`codigo`, `nombre`, `apellidos`, `apodo`, `fecha_nacimiento`, `planeta_origen`, `planeta_residencia`, `foto`, `codigo_qr`, `estado`) VALUES
(1, 'goku', 'son', 'el mortal mas fuerte', '1999-06-10', 'vegeta', 'tierra', '/fotos/foto_1750357320647.png', '/qr/ciudadano_1.png', 3),
(2, 'galactus', 'son', 'el devora mundos', '1980-06-10', 'desconocid', '15-cOe', '/fotos/foto_1750359216541.png', '/qr/ciudadano_2.png', 1),
(3, 'clark', 'kent', 'superman', '2001-07-19', 'krypton', 'tierra', '/fotos/foto_1750359252206.png', '/qr/ciudadano_3.png', 1),
(4, 'galactus', '', 'el devora mundos', '1980-06-10', 'desconocido', '15-cOe', '', '/qr/ciudadano_C-1750354013962.png', 3),
(5, 'l', 'aaa', '', '2025-06-09', 'alguno', 'desconocido', 'C:\\fakepath\\Captura de pantalla 2024-05-12 172228.png', '/qr/ciudadano_5.png', 3),
(6, 'pan', '', '', '2025-06-13', 'alguno', 'desconocido', '/fotos/foto_1750357334231.png', '/qr/ciudadano_C-1750356864132.png', 3),
(7, 'pan', 'son', 'superman', '2025-06-10', 'alguno', 'desconocido', '/fotos/foto_1750358114549.png', '/qr/ciudadano_C-1750358114587.png', 3),
(8, 'cristian', 'zapata', 'aaaa', '2025-06-10', 'alguno', 'tierra', '/fotos/foto_1750369627921.png', '/qr/ciudadano_8.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id_rol` int NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int NOT NULL,
  `user_name` varchar(45) NOT NULL,
  `password` varchar(150) NOT NULL,
  `nombre_completo` varchar(200) NOT NULL,
  `id_rol` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ciudadanos`
--
ALTER TABLE `ciudadanos`
  ADD PRIMARY KEY (`codigo`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_rol`);

--
-- Indexes for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `fk_usuario_rol` (`id_rol`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ciudadanos`
--
ALTER TABLE `ciudadanos`
  MODIFY `codigo` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id_rol` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `fk_usuario_rol` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id_rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
