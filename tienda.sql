-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-01-2025 a las 19:17:06
-- Versión del servidor: 10.4.6-MariaDB
-- Versión de PHP: 7.2.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tienda`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `id_categoria` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `descripcion` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`id_categoria`, `nombre`, `descripcion`) VALUES
(1, 'Muebles', '');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cliente`
--

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL,
  `dni` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `telefono` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `descuento` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `cliente`
--

INSERT INTO `cliente` (`id`, `dni`, `nombre`, `apellidos`, `telefono`, `email`, `direccion`, `descuento`) VALUES
(6, '04224038L', 'Alberto2', 'Zapardiel', '123456788', 'prueba@admin.com', 'Calle cerrada, 22', 0),
(8, '04224111L', 'Alberto', 'Zapardiel Fernandez', '618015007', 'alberto.zapardiel.fernandez@gmail.com', 'Calle de Ávila 11', 0),
(1, '12312312L', 'Alberto', 'Zapardiel Fernández', '123456789', 'admin@admin.com', 'Calle abierta, 22', 25);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle`
--

CREATE TABLE `detalle` (
  `id` int(11) NOT NULL,
  `num_factura` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `dni` varchar(10) NOT NULL,
  `cantidad_producto` int(11) NOT NULL,
  `precio_producto` double NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura`
--

CREATE TABLE `factura` (
  `num_factura` int(11) NOT NULL,
  `dni` varchar(9) NOT NULL,
  `fecha` date NOT NULL,
  `total` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `precio` decimal(38,2) DEFAULT NULL,
  `stock` int(11) NOT NULL,
  `id_categoria` int(11) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id_producto`, `nombre`, `descripcion`, `precio`, `stock`, `id_categoria`, `image_url`, `quantity`) VALUES
(36, 'Prueba', 'España', '1.00', 3, 2, '/images/128-spain.png', 0),
(42, 'Producto_90eb3', 'Descripción genérica', '15.70', 34, 1, '/images/default_image.jpeg', 0),
(43, 'Producto_25090', 'Descripción genérica', '53.15', 69, 1, '/images/default_image.jpeg', 0),
(44, 'Producto_2d8ee', 'Descripción genérica', '27.73', 76, 1, '/images/default_image.jpeg', 0),
(45, 'Producto_6806f', 'Descripción genérica', '83.50', 8, 1, '/images/default_image.jpeg', 0),
(46, 'Producto_6f329', 'Descripción genérica', '31.14', 81, 1, '/images/default_image.jpeg', 0),
(47, 'Producto_120ec', 'Descripción genérica', '36.52', 33, 1, '/images/default_image.jpeg', 0),
(48, 'Producto_421ef', 'Descripción genérica', '80.60', 35, 1, '/images/default_image.jpeg', 0),
(49, 'Producto_baf4f', 'Descripción genérica', '61.68', 2, 1, '/images/default_image.jpeg', 0),
(50, 'Producto_9fab8', 'Descripción genérica', '58.18', 21, 1, '/images/default_image.jpeg', 0),
(51, 'Producto_13ee2', 'Descripción genérica', '89.39', 55, 1, '/images/default_image.jpeg', 0),
(52, 'Producto_2695f', 'Descripción genérica', '80.03', 72, 1, '/images/default_image.jpeg', 0),
(53, 'Producto_32a35', 'Descripción genérica', '88.70', 80, 1, '/images/default_image.jpeg', 0),
(54, 'Producto_eea40', 'Descripción genérica', '35.01', 69, 1, '/images/default_image.jpeg', 0),
(55, 'Producto_bad85', 'Descripción genérica', '6.34', 2, 1, '/images/default_image.jpeg', 0),
(56, 'Producto_4d5c6', 'Descripción genérica', '61.87', 27, 1, '/images/default_image.jpeg', 0),
(57, 'Producto_591aa', 'Descripción genérica', '78.14', 34, 1, '/images/default_image.jpeg', 0),
(58, 'Producto_83ee8', 'Descripción genérica', '80.82', 94, 1, '/images/default_image.jpeg', 0),
(59, 'Producto_f35fd', 'Descripción genérica', '56.08', 97, 1, '/images/default_image.jpeg', 0),
(60, 'Producto_de03c', 'Descripción genérica', '4.36', 63, 1, '/images/default_image.jpeg', 0),
(61, 'Producto_a6cdb', 'Descripción genérica', '34.91', 59, 1, '/images/default_image.jpeg', 0),
(62, 'Producto_6a3b9', 'Descripción genérica', '75.23', 4, 1, '/images/default_image.jpeg', 0),
(63, 'Producto_ae691', 'Descripción genérica', '76.10', 86, 1, '/images/default_image.jpeg', 0),
(64, 'Producto_0bd0f', 'Descripción genérica', '56.60', 73, 1, '/images/default_image.jpeg', 0),
(65, 'Producto_dfb43', 'Descripción genérica', '73.52', 70, 1, '/images/default_image.jpeg', 0),
(66, 'Producto_7af85', 'Descripción genérica', '52.95', 65, 1, '/images/default_image.jpeg', 0),
(67, 'Producto_b61cb', 'Descripción genérica', '50.95', 45, 1, '/images/default_image.jpeg', 0),
(68, 'Producto_394c2', 'Descripción genérica', '46.64', 2, 1, '/images/default_image.jpeg', 0),
(69, 'Producto_17cf9', 'Descripción genérica', '55.65', 60, 1, '/images/default_image.jpeg', 0),
(70, 'Producto_b3af2', 'Descripción genérica', '92.55', 58, 1, '/images/default_image.jpeg', 0),
(71, 'Producto_30350', 'Descripción genérica', '1.19', 59, 1, '/images/default_image.jpeg', 0),
(72, 'Producto_f19d5', 'Descripción genérica', '96.64', 97, 1, '/images/default_image.jpeg', 0),
(73, 'Producto_318c0', 'Descripción genérica', '98.69', 98, 1, '/images/default_image.jpeg', 0),
(74, 'Producto_b9706', 'Descripción genérica', '85.84', 40, 1, '/images/default_image.jpeg', 0),
(75, 'Producto_c3332', 'Descripción genérica', '2.25', 77, 1, '/images/default_image.jpeg', 0),
(76, 'Producto_ad86f', 'Descripción genérica', '62.33', 75, 1, '/images/default_image.jpeg', 0),
(77, 'Producto_15779', 'Descripción genérica', '26.02', 58, 1, '/images/default_image.jpeg', 0),
(78, 'Producto_ecacc', 'Descripción genérica', '98.81', 49, 1, '/images/default_image.jpeg', 0),
(79, 'Producto_f700d', 'Descripción genérica', '2.54', 62, 1, '/images/default_image.jpeg', 0),
(80, 'Producto_9f96a', 'Descripción genérica', '35.27', 62, 1, '/images/default_image.jpeg', 0),
(81, 'Producto_50bb3', 'Descripción genérica', '52.95', 39, 1, '/images/default_image.jpeg', 0),
(82, 'Producto_f84a1', 'Descripción genérica', '83.58', 95, 1, '/images/default_image.jpeg', 0),
(83, 'Producto_20150', 'Descripción genérica', '56.81', 97, 1, '/images/default_image.jpeg', 0),
(84, 'Producto_caf47', 'Descripción genérica', '88.39', 93, 1, '/images/default_image.jpeg', 0),
(85, 'Producto_debfb', 'Descripción genérica', '37.06', 74, 1, '/images/default_image.jpeg', 0),
(86, 'Producto_06d39', 'Descripción genérica', '78.73', 12, 1, '/images/default_image.jpeg', 0),
(87, 'Producto_32134', 'Descripción genérica', '97.66', 6, 1, '/images/default_image.jpeg', 0),
(88, 'Producto_ab220', 'Descripción genérica', '87.06', 10, 1, '/images/default_image.jpeg', 0),
(89, 'Producto_cf78a', 'Descripción genérica', '27.71', 62, 1, '/images/default_image.jpeg', 0),
(90, 'Producto_15340', 'Descripción genérica', '66.32', 38, 1, '/images/default_image.jpeg', 0),
(91, 'Producto_11c4a', 'Descripción genérica', '57.68', 4, 1, '/images/default_image.jpeg', 0),
(92, 'Producto_5f6e2', 'Descripción genérica', '23.63', 76, 1, '/images/default_image.jpeg', 0),
(93, 'Producto_2c0ff', 'Descripción genérica', '33.17', 27, 1, '/images/default_image.jpeg', 0),
(94, 'Producto_47dbb', 'Descripción genérica', '15.90', 59, 1, '/images/default_image.jpeg', 0),
(95, 'Producto_acafd', 'Descripción genérica', '76.62', 29, 1, '/images/default_image.jpeg', 0),
(96, 'Producto_389b1', 'Descripción genérica', '0.08', 47, 1, '/images/default_image.jpeg', 0),
(97, 'Producto_601be', 'Descripción genérica', '38.08', 82, 1, '/images/default_image.jpeg', 0),
(98, 'Producto_f90f5', 'Descripción genérica', '44.41', 26, 1, '/images/default_image.jpeg', 0),
(99, 'Producto_0fe0a', 'Descripción genérica', '24.86', 21, 1, '/images/default_image.jpeg', 0),
(100, 'Producto_698b5', 'Descripción genérica', '89.46', 55, 1, '/images/default_image.jpeg', 0),
(101, 'Producto_13b7a', 'Descripción genérica', '86.00', 97, 1, '/images/default_image.jpeg', 0),
(102, 'Producto_f033c', 'Descripción genérica', '64.77', 28, 1, '/images/default_image.jpeg', 0),
(103, 'Producto_4cb80', 'Descripción genérica', '59.14', 48, 1, '/images/default_image.jpeg', 0),
(104, 'Producto_2f23a', 'Descripción genérica', '82.19', 14, 1, '/images/default_image.jpeg', 0),
(105, 'Producto_a7c2d', 'Descripción genérica', '78.70', 20, 1, '/images/default_image.jpeg', 0),
(106, 'Producto_37751', 'Descripción genérica', '76.94', 81, 1, '/images/default_image.jpeg', 0),
(107, 'Producto_8a4b3', 'Descripción genérica', '30.26', 27, 1, '/images/default_image.jpeg', 0),
(108, 'Producto_e263f', 'Descripción genérica', '43.43', 82, 1, '/images/default_image.jpeg', 0),
(109, 'Producto_db29c', 'Descripción genérica', '57.40', 44, 1, '/images/default_image.jpeg', 0),
(110, 'Producto_8f153', 'Descripción genérica', '19.71', 46, 1, '/images/default_image.jpeg', 0),
(111, 'Producto_8593b', 'Descripción genérica', '26.72', 13, 1, '/images/default_image.jpeg', 0),
(112, 'Producto_312eb', 'Descripción genérica', '5.60', 59, 1, '/images/default_image.jpeg', 0),
(113, 'Producto_e4258', 'Descripción genérica', '26.32', 88, 1, '/images/default_image.jpeg', 0),
(114, 'Producto_85731', 'Descripción genérica', '54.40', 79, 1, '/images/default_image.jpeg', 0),
(115, 'Producto_95439', 'Descripción genérica', '41.74', 99, 1, '/images/default_image.jpeg', 0),
(116, 'Producto_870f7', 'Descripción genérica', '70.16', 29, 1, '/images/default_image.jpeg', 0),
(117, 'Producto_81cb1', 'Descripción genérica', '85.78', 25, 1, '/images/default_image.jpeg', 0),
(118, 'Producto_c2911', 'Descripción genérica', '68.21', 34, 1, '/images/default_image.jpeg', 0),
(119, 'Producto_c2e3e', 'Descripción genérica', '40.32', 94, 1, '/images/default_image.jpeg', 0),
(120, 'Producto_b9c92', 'Descripción genérica', '84.41', 60, 1, '/images/default_image.jpeg', 0),
(121, 'Producto_69635', 'Descripción genérica', '63.79', 71, 1, '/images/default_image.jpeg', 0),
(122, 'Producto_03761', 'Descripción genérica', '24.51', 18, 1, '/images/default_image.jpeg', 0),
(123, 'Producto_69be4', 'Descripción genérica', '38.73', 37, 1, '/images/default_image.jpeg', 0),
(124, 'Producto_766a4', 'Descripción genérica', '36.73', 74, 1, '/images/default_image.jpeg', 0),
(125, 'Producto_9bf22', 'Descripción genérica', '92.87', 74, 1, '/images/default_image.jpeg', 0),
(126, 'Producto_6ff78', 'Descripción genérica', '37.96', 13, 1, '/images/default_image.jpeg', 0),
(127, 'Producto_b3014', 'Descripción genérica', '29.46', 85, 1, '/images/default_image.jpeg', 0),
(128, 'Producto_0e00f', 'Descripción genérica', '32.17', 48, 1, '/images/default_image.jpeg', 0),
(129, 'Producto_bdda3', 'Descripción genérica', '78.46', 58, 1, '/images/default_image.jpeg', 0),
(130, 'Producto_15abc', 'Descripción genérica', '7.77', 69, 1, '/images/default_image.jpeg', 0),
(131, 'Producto_b4067', 'Descripción genérica', '3.15', 49, 1, '/images/default_image.jpeg', 0),
(132, 'Producto_a99bc', 'Descripción genérica', '42.54', 97, 1, '/images/default_image.jpeg', 0),
(133, 'Producto_fe3aa', 'Descripción genérica', '17.84', 2, 1, '/images/default_image.jpeg', 0),
(134, 'Producto_996ad', 'Descripción genérica', '78.80', 22, 1, '/images/default_image.jpeg', 0),
(135, 'Producto_3a6fc', 'Descripción genérica', '22.15', 76, 1, '/images/default_image.jpeg', 0),
(136, 'Producto_2a726', 'Descripción genérica', '44.59', 79, 1, '/images/default_image.jpeg', 0),
(137, 'Producto_2a2a5', 'Descripción genérica', '69.44', 63, 1, '/images/default_image.jpeg', 0),
(138, 'Producto_42b68', 'Descripción genérica', '51.06', 30, 1, '/images/default_image.jpeg', 0),
(139, 'Producto_cc167', 'Descripción genérica', '10.02', 48, 1, '/images/default_image.jpeg', 0),
(140, 'Producto_18abb', 'Descripción genérica', '22.97', 73, 1, '/images/default_image.jpeg', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellidos` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `pass` varchar(255) NOT NULL,
  `rol` int(11) NOT NULL,
  `dni` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `cliente`
--
ALTER TABLE `cliente`
  ADD PRIMARY KEY (`dni`) USING BTREE,
  ADD KEY `id` (`id`);

--
-- Indices de la tabla `detalle`
--
ALTER TABLE `detalle`
  ADD PRIMARY KEY (`id`),
  ADD KEY `num_factura` (`num_factura`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `factura`
--
ALTER TABLE `factura`
  ADD PRIMARY KEY (`num_factura`),
  ADD KEY `dni` (`dni`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id_categoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `cliente`
--
ALTER TABLE `cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `detalle`
--
ALTER TABLE `detalle`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT de la tabla `factura`
--
ALTER TABLE `factura`
  MODIFY `num_factura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `detalle`
--
ALTER TABLE `detalle`
  ADD CONSTRAINT `detalle_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`),
  ADD CONSTRAINT `detalle_ibfk_2` FOREIGN KEY (`num_factura`) REFERENCES `factura` (`num_factura`);

--
-- Filtros para la tabla `factura`
--
ALTER TABLE `factura`
  ADD CONSTRAINT `factura_ibfk_1` FOREIGN KEY (`dni`) REFERENCES `cliente` (`dni`);

--
-- Filtros para la tabla `producto`
--
ALTER TABLE `producto`
  ADD CONSTRAINT `FK9nyueixdsgbycfhf7allg8su` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
