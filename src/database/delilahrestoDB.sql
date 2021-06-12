-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 12-06-2021 a las 04:28:05
-- Versión del servidor: 10.4.16-MariaDB
-- Versión de PHP: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `delilahresto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id_order` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `id_situation` int(11) NOT NULL,
  `date` varchar(50) COLLATE utf8_unicode_520_ci NOT NULL,
  `id_payment` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id_order`, `id_user`, `id_situation`, `date`, `id_payment`) VALUES
(1, 17, 5, '8:33 PM', 2),
(2, 7, 5, '1:47 PM', 1),
(3, 6, 1, '1:13 PM', 2),
(4, 3, 1, '2:08 PM', 2),
(5, 20, 1, '7:40 PM', 2),
(6, 5, 5, '6:05 PM', 2),
(7, 18, 6, '6:49 PM', 1),
(8, 16, 5, '3:15 PM', 2),
(9, 10, 2, '10:31 PM', 2),
(10, 15, 3, '10:16 PM', 2),
(11, 21, 1, '9:41 PM', 1),
(12, 19, 5, '4:13 PM', 2),
(13, 9, 5, '6:58 PM', 2),
(14, 12, 2, '10:49 PM', 1),
(15, 13, 6, '2:56 PM', 1),
(17, 3, 2, '10:31 PM', 1),
(18, 13, 4, '9:18 PM', 1),
(19, 15, 4, '2:31 PM', 1),
(20, 13, 2, '12:52 PM', 2),
(28, 3, 1, '11:29 PM', 1),
(29, 4, 1, '11:40 PM', 2),
(30, 25, 1, '12:41 AM', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payment`
--

CREATE TABLE `payment` (
  `id_payment` tinyint(10) NOT NULL,
  `method` varchar(100) COLLATE utf8_unicode_520_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Volcado de datos para la tabla `payment`
--

INSERT INTO `payment` (`id_payment`, `method`) VALUES
(1, 'Efectivo'),
(2, 'Tarjeta');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products`
--

CREATE TABLE `products` (
  `id_product` int(100) NOT NULL,
  `name` varchar(200) COLLATE utf8_unicode_520_ci NOT NULL,
  `ref` varchar(150) COLLATE utf8_unicode_520_ci NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Volcado de datos para la tabla `products`
--

INSERT INTO `products` (`id_product`, `name`, `ref`, `price`) VALUES
(1, 'Bagel de Salmon', 'BagSal', 425),
(2, 'Hamburguesa Clásica', 'HamClas', 350),
(3, 'Hamburguesa Especial', 'HamSpe', 251),
(4, 'Sandwich Veggie', 'SanVeg', 310),
(5, 'Ensalada Veggie', 'Veggie', 340),
(6, 'Focaccia', 'Focaccia', 300),
(7, 'Sandwich Focaccia', 'SanFoc', 440),
(8, 'Veggie Avocado', 'VegAvo', 310),
(9, 'Bagel de Pollo', 'BagPol', 415);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `products_per_order`
--

CREATE TABLE `products_per_order` (
  `id_order` int(100) NOT NULL,
  `id_product` int(100) NOT NULL,
  `product_quantity` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Volcado de datos para la tabla `products_per_order`
--

INSERT INTO `products_per_order` (`id_order`, `id_product`, `product_quantity`) VALUES
(1, 1, 2),
(1, 2, 3),
(2, 4, 1),
(2, 5, 1),
(3, 4, 1),
(13, 5, 1),
(15, 5, 1),
(2, 2, 2),
(4, 7, 1),
(1, 4, 3),
(3, 4, 2),
(2, 4, 1),
(10, 1, 3),
(7, 5, 3),
(20, 3, 2),
(15, 7, 3),
(7, 1, 2),
(9, 2, 1),
(15, 1, 1),
(10, 5, 3),
(18, 5, 3),
(10, 2, 3),
(15, 7, 2),
(19, 4, 3),
(4, 8, 2),
(17, 5, 1),
(20, 6, 1),
(3, 8, 1),
(19, 2, 2),
(20, 5, 2),
(4, 8, 1),
(20, 8, 3),
(6, 3, 1),
(11, 6, 1),
(11, 1, 2),
(17, 5, 2),
(14, 1, 1),
(5, 3, 1),
(5, 6, 1),
(5, 7, 1),
(28, 1, 1),
(28, 2, 1),
(29, 1, 1),
(29, 2, 1),
(30, 1, 1),
(30, 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `situation`
--

CREATE TABLE `situation` (
  `id_situation` int(10) NOT NULL,
  `situation` varchar(100) COLLATE utf8_unicode_520_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Volcado de datos para la tabla `situation`
--

INSERT INTO `situation` (`id_situation`, `situation`) VALUES
(1, 'NUEVO'),
(2, 'CONFIRMADO'),
(3, 'PREPARANDO'),
(4, 'ENVIANDO'),
(5, 'ENTREGADO'),
(6, 'CANCELADO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `username` varchar(100) COLLATE utf8_unicode_520_ci NOT NULL,
  `fullname` varchar(100) COLLATE utf8_unicode_520_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_520_ci NOT NULL,
  `phone` varchar(100) COLLATE utf8_unicode_520_ci NOT NULL,
  `address` varchar(100) COLLATE utf8_unicode_520_ci NOT NULL,
  `password` varchar(120) COLLATE utf8_unicode_520_ci NOT NULL,
  `admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `username`, `fullname`, `email`, `phone`, `address`, `password`, `admin`) VALUES
(1, 'hernandba', 'Hernan Belalcazar', 'hernandba@gmail.com', '573172543430', 'Calle 16N #7-37', 'frida123', 1),
(2, 'cathe10', 'Catherine Belalcazar', 'cathe10@hotmail.com', '573187457516', 'Calle 16N #7-37', 'nico456', 1),
(3, 'freddiemer', 'Freddie Mercury', 'freddie@gmail.com', '573245678567', '1 Logan Kensignton, London W8 6DE, Uk', 'king4ever', 0),
(4, 'johnniesmith', 'John Smith', 'jsmith56@gmail.com', '389 269 1010', 'Tardis st, 4242, Space 453, Gallifrey', 'h27sko9', 0),
(5, 'jpay034', 'Jules Panys', 'jpas0@4shared.com', '352 222 8754', '2698 Fuller Cross', 'g&98Jm', 0),
(6, 'mgall1', 'Merri Gall', 'mgallr1@scribd.com', '682 554 7756', '7 Courtney Road', 'Njy7342', 0),
(7, 'gdor77uj', 'Gaga Dorstept', 'gagagaga@aboutads.info', '123 453 2346', '32 Silver Leaf Road', 'REty892', 0),
(8, 'jpaynes0', 'Julie Paynes', 'jpaynes0@4shared.com', '352 162 4936', '9448 Fuller Alley', '7Wtms3s', 0),
(9, 'mgallaher1', 'Merrill Gallaher', 'mgallaher1@scribd.com', '682 554 7078', '7 Rigney Court', 'Na7iBHl', 0),
(10, 'gdorsett2', 'Gamaliel Dorsett', 'gdorsett2@aboutads.info', '729 393 4020', '65 Golden Leaf Avenue', 'QHwLDXpI', 0),
(11, 'tborgnet3', 'Torry Borgnet', 'tborgnet3@mapquest.com', '830 930 3978', '0 Hintze Crossing', 'fMRjTWMmtwsY', 0),
(12, 'ksymcoxe4', 'Ketti Symcoxe', 'ksymcoxe4@technorati.com', '212 240 2675', '25559 Sycamore Alley', '0rzsJLdi', 0),
(13, 'pbreinl5', 'Pryce Breinl', 'pbreinl5@exblog.jp', '490 415 6378', '69 Dapin Pass', 'PTPTUVdb', 0),
(14, 'atine6', 'Audie Tine', 'atine6@storify.com', '983 542 1208', '0 Aberg Parkway', 'PkEvqFyZRQco', 0),
(15, 'dchezelle7', 'Derrik Chezelle', 'dchezelle7@php.net', '456 709 8093', '673 Mitchell Avenue', '6X5ZOjlY6', 0),
(16, 'ncolleton8', 'Nicholas Colleton', 'ncolleton8@patch.com', '205 800 8948', '0385 Bluejay Court', 'fgxi9y2rJETy', 0),
(17, 'aoglesbee9', 'Aubrey Oglesbee', 'aoglesbee9@eventbrite.com', '811 689 6039', '0 Porter Court', 'QiuTPJWxS', 0),
(18, 'bcoggingsa', 'Bertrando Coggings', 'bcoggingsa@simplemachines.org', '850 163 5607', '98517 Farmco Junction', 'ph25gY', 0),
(19, 'kgyurkob', 'Keene Gyurko', 'kgyurkob@t.co', '619 803 8683', '290 Manley Pass', 'xRjw7GsIRU7', 0),
(20, 'zivyc', 'Zita Ivy', 'zivyc@trellian.com', '451 435 7469', '4 Buhler Center', 'Pi05Sz6', 0),
(21, 'ccudd', 'Chloette Cud', 'ccudd@tinypic.com', '775 461 0332', '96 Little Fleur Hill', 'iydvDRNO0P9', 0),
(22, 'wgaveye', 'Wilow Gavey', 'wgaveye@canalblog.com', '338 727 2282', '675 Memorial Drive', '9XZf6jdWX', 0),
(23, 'acogglesf', 'Alexander Coggles', 'acogglesf@cam.ac.uk', '908 140 4755', '8 Fordem Place', 'e1p2FSB', 0),
(25, 'yudiAle', 'Yudi Alegria', 'yudialegria@hotmail.com', '573108746537', 'Cll 16N #7-37', 'martina123', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users_favs`
--

CREATE TABLE `users_favs` (
  `id_user` int(100) NOT NULL,
  `id_product` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_520_ci;

--
-- Volcado de datos para la tabla `users_favs`
--

INSERT INTO `users_favs` (`id_user`, `id_product`) VALUES
(3, 3),
(3, 4),
(4, 3),
(22, 9),
(17, 1),
(22, 7),
(8, 6),
(10, 7),
(4, 4),
(21, 7),
(8, 8),
(5, 1),
(16, 4),
(14, 8),
(16, 3),
(9, 5),
(20, 7),
(3, 2),
(20, 9),
(14, 7),
(5, 5),
(13, 7),
(13, 6),
(14, 5),
(10, 4),
(13, 3),
(18, 2),
(10, 5),
(14, 2),
(13, 5),
(21, 9),
(13, 2),
(15, 8),
(21, 8),
(23, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_situation` (`id_situation`),
  ADD KEY `id_payment` (`id_payment`);

--
-- Indices de la tabla `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id_payment`);

--
-- Indices de la tabla `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id_product`);

--
-- Indices de la tabla `situation`
--
ALTER TABLE `situation`
  ADD PRIMARY KEY (`id_situation`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- Indices de la tabla `users_favs`
--
ALTER TABLE `users_favs`
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_product` (`id_product`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `payment`
--
ALTER TABLE `payment`
  MODIFY `id_payment` tinyint(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `products`
--
ALTER TABLE `products`
  MODIFY `id_product` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `situation`
--
ALTER TABLE `situation`
  MODIFY `id_situation` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
