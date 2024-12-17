-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Дек 17 2024 г., 20:25
-- Версия сервера: 10.4.32-MariaDB
-- Версия PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `integration_v3`
--

-- --------------------------------------------------------

--
-- Структура таблицы `authorizations`
--

CREATE TABLE `authorizations` (
  `id_authorization` int(11) NOT NULL,
  `name` varchar(115) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `authorizations`
--

INSERT INTO `authorizations` (`id_authorization`, `name`) VALUES
(1, 'Базовая авторизация'),
(2, 'Авторизация по токену'),
(3, 'Авторизация по api key'),
(4, 'Авторизация по сертификату'),
(5, 'Без авторизации');

-- --------------------------------------------------------

--
-- Структура таблицы `contours`
--

CREATE TABLE `contours` (
  `id_contour` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `contours`
--

INSERT INTO `contours` (`id_contour`, `name`) VALUES
(1, 'Тестовый контур Int'),
(2, 'Сертификационный контур Int'),
(3, 'Продуктовый контур Int'),
(4, 'Тестовый контур DMZ'),
(5, 'Сертификационный контур DMZ'),
(6, 'Продуктивный контур DMZ');

-- --------------------------------------------------------

--
-- Структура таблицы `endpoints`
--

CREATE TABLE `endpoints` (
  `id_endpoint` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `ip` varchar(45) NOT NULL,
  `port` varchar(45) NOT NULL,
  `network` int(11) NOT NULL,
  `contour` int(11) NOT NULL,
  `system` int(11) NOT NULL,
  `description` varchar(600) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `endpoints`
--

INSERT INTO `endpoints` (`id_endpoint`, `name`, `ip`, `port`, `network`, `contour`, `system`, `description`) VALUES
(7, 'https://test.qwerty1', '10.12.10.14', '443', 1, 1, 8, 'null'),
(8, 'https://test.qwerty2', '10.13.10.13', '443', 1, 1, 8, 'null'),
(10, 'https://test.int.1', '10.48.12.01', '443', 1, 1, 7, NULL),
(11, 'https://cert.int.1', '10.50.12.01', '443', 2, 2, 7, NULL),
(12, 'https://prod.int.1', '10.51.12.01', '443', 3, 3, 7, NULL),
(13, 'https://test.dmz.1', '10.222.14.02', '443', 4, 4, 7, NULL),
(14, 'https://cert.dmz.1', '10.230.14.02', '443', 5, 5, 7, NULL),
(15, 'https://prod.dmz.1', '10.231.14.02', '443', 6, 6, 7, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `networks`
--

CREATE TABLE `networks` (
  `id_network` int(11) NOT NULL,
  `name` varchar(115) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `networks`
--

INSERT INTO `networks` (`id_network`, `name`) VALUES
(1, 'VLAN 811'),
(2, 'VLAN 911'),
(3, 'VLAN 981'),
(4, 'VLAN 1221'),
(5, 'VLAN 1321'),
(6, 'VLAN 1322');

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id_order` int(11) NOT NULL,
  `title` varchar(115) NOT NULL,
  `source_system` int(11) NOT NULL,
  `dest_system` int(11) NOT NULL,
  `request_rate` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `authorization` int(11) NOT NULL,
  `customer` int(11) NOT NULL,
  `test_endpoint` int(11) DEFAULT NULL,
  `cert_endpoint` int(11) DEFAULT NULL,
  `prod_endpoint` int(11) NOT NULL,
  `isAcceptedByIS` tinyint(1) NOT NULL DEFAULT 0,
  `isAcceptedByCorpArch` tinyint(1) NOT NULL DEFAULT 0,
  `isAcceptedByArc` tinyint(1) NOT NULL DEFAULT 0,
  `description` varchar(10000) NOT NULL,
  `swagger` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id_order`, `title`, `source_system`, `dest_system`, `request_rate`, `status`, `authorization`, `customer`, `test_endpoint`, `cert_endpoint`, `prod_endpoint`, `isAcceptedByIS`, `isAcceptedByCorpArch`, `isAcceptedByArc`, `description`, `swagger`) VALUES
(30, 'Test Systems 1 -> 2', 9, 10, 6, 3, 1, 18, 10, NULL, 12, 1, 0, 0, 'test desc', NULL),
(31, 'Test Systems 2 -> 1', 10, 9, 2, 12, 3, 18, NULL, NULL, 12, 0, 0, 0, 'Отклонена информационной безопасностью', NULL),
(32, 'Test Systems 3 -> 4', 11, 12, 1, 13, 1, 18, 10, 11, 12, 1, 1, 1, 'Передача данных на сервер посредством rest api\r\nМетод get /changeList\r\nЗапускается один раз в день', NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `request_rates`
--

CREATE TABLE `request_rates` (
  `id_request_rate` int(11) NOT NULL,
  `rate` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `request_rates`
--

INSERT INTO `request_rates` (`id_request_rate`, `rate`) VALUES
(1, '1 Запрос в день'),
(2, '10 Запросов в день'),
(3, '100 Запросов в день'),
(4, '1000 Запросов в день'),
(5, '5000 Запросов в день'),
(6, '10000 Запросов в день'),
(7, 'Более 10000 запросов в день'),
(8, 'Указано в описание API');

-- --------------------------------------------------------

--
-- Структура таблицы `roles`
--

CREATE TABLE `roles` (
  `id_role` int(11) NOT NULL,
  `name` varchar(75) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `roles`
--

INSERT INTO `roles` (`id_role`, `name`) VALUES
(1, 'Заказчик'),
(2, 'Отвественный'),
(3, 'Корпоративный Архитектор'),
(4, 'Архитектор'),
(5, 'Администратор'),
(6, 'Разработчик'),
(7, 'Специалист информационной безопасности');

-- --------------------------------------------------------

--
-- Структура таблицы `status`
--

CREATE TABLE `status` (
  `id_status` int(11) NOT NULL,
  `name` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `status`
--

INSERT INTO `status` (`id_status`, `name`) VALUES
(1, 'Ожидает информации от заказчика'),
(2, 'На согласование у специалиста информационной безопасности'),
(3, 'На согласование у корпоративного архитектора'),
(4, 'На согласование у архитектора'),
(5, 'Предподготовка задачи Архитектором'),
(6, 'Передана на разработку'),
(7, 'Разрабатывается'),
(8, 'Передана на настройку администратором'),
(9, 'Выполняется настройка администратором'),
(10, 'На тестирование у заказчика'),
(11, 'Завершено'),
(12, 'Отклонено'),
(13, 'Выполнено'),
(14, 'На тестовом контуре'),
(15, 'На сертификационном контуре'),
(16, 'На продуктивном контуре');

-- --------------------------------------------------------

--
-- Структура таблицы `systems`
--

CREATE TABLE `systems` (
  `id_system` int(11) NOT NULL,
  `name` varchar(250) NOT NULL,
  `responsible` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `systems`
--

INSERT INTO `systems` (`id_system`, `name`, `responsible`) VALUES
(7, 'Тестовая система 1', 2),
(8, 'Тестовая система 2', 1),
(9, 'Система тестов номер 1', 18),
(10, 'Система тестов номер 2', 18),
(11, 'Система тестов номер 3', 13),
(12, 'Система тестов номер 4', 15);

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `FIO` varchar(115) NOT NULL,
  `email` varchar(115) NOT NULL,
  `post` varchar(250) NOT NULL,
  `contacts` varchar(450) DEFAULT NULL,
  `role` int(11) NOT NULL,
  `login` varchar(45) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id_user`, `FIO`, `email`, `post`, `contacts`, `role`, `login`, `password`) VALUES
(1, 'Testov Test Testovich', 'admin@bk.ru', 'Главный администратор', '+79302873599', 5, 'admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918'),
(2, 'Zakazov Zakaz Zakovich', 'zak@bk.ru', 'Директор проекта', '+473892156737564 Telegram: Какой-то', 1, 'zak', '76207a2567e8da129e2eb0aefde7262e18867e5328622fecea913ffd8a385e58'),
(13, 'Test User 1', 'user1@test.ru', 'Менеджер группы', NULL, 2, 'user1', '0a041b9462caa4a31bac3567e0b6e6fd9100787db2ab433d96f6d178cabfce90'),
(14, 'Test User 2', 'user2@test.ru', 'Специалист информационной безопасности', NULL, 7, 'user2', '6025d18fe48abd45168528f18a82e265dd98d421a7084aa09f61b341703901a3'),
(15, 'Test User 3', 'user3@test.ru', 'Старший корпоративный архитектор', NULL, 3, 'user3', '5860faf02b6bc6222ba5aca523560f0e364ccd8b67bee486fe8bf7c01d492ccb'),
(16, 'Test User 4', 'user4@test.ru', 'Архитектор', NULL, 4, 'user4', '5269ef980de47819ba3d14340f4665262c41e933dc92c1a27dd5d01b047ac80e'),
(17, 'Test User 5', 'user5@test.ru', 'Разработчик', NULL, 6, 'user5', '5a39bead318f306939acb1d016647be2e38c6501c58367fdb3e9f52542aa2442'),
(18, 'Test User 6', 'user6@test.ru', 'Product Owner', NULL, 2, 'user6', 'ecb48a1cc94f951252ec462fe9ecc55c3ef123fadfe935661396c26a45a5809d');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `authorizations`
--
ALTER TABLE `authorizations`
  ADD PRIMARY KEY (`id_authorization`);

--
-- Индексы таблицы `contours`
--
ALTER TABLE `contours`
  ADD PRIMARY KEY (`id_contour`);

--
-- Индексы таблицы `endpoints`
--
ALTER TABLE `endpoints`
  ADD PRIMARY KEY (`id_endpoint`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `network` (`network`,`contour`,`system`),
  ADD KEY `contour` (`contour`),
  ADD KEY `system` (`system`);

--
-- Индексы таблицы `networks`
--
ALTER TABLE `networks`
  ADD PRIMARY KEY (`id_network`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`),
  ADD KEY `source_system` (`source_system`,`dest_system`,`request_rate`,`status`,`authorization`,`customer`,`test_endpoint`,`cert_endpoint`,`prod_endpoint`),
  ADD KEY `dest_system` (`dest_system`),
  ADD KEY `test_ep` (`test_endpoint`),
  ADD KEY `cert_ep` (`cert_endpoint`),
  ADD KEY `prod_ep` (`prod_endpoint`),
  ADD KEY `request_rate` (`request_rate`),
  ADD KEY `customer` (`customer`),
  ADD KEY `status` (`status`),
  ADD KEY `authorization` (`authorization`);

--
-- Индексы таблицы `request_rates`
--
ALTER TABLE `request_rates`
  ADD PRIMARY KEY (`id_request_rate`);

--
-- Индексы таблицы `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id_role`);

--
-- Индексы таблицы `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id_status`);

--
-- Индексы таблицы `systems`
--
ALTER TABLE `systems`
  ADD PRIMARY KEY (`id_system`),
  ADD KEY `responsible` (`responsible`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`),
  ADD KEY `role` (`role`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `contours`
--
ALTER TABLE `contours`
  MODIFY `id_contour` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `endpoints`
--
ALTER TABLE `endpoints`
  MODIFY `id_endpoint` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `networks`
--
ALTER TABLE `networks`
  MODIFY `id_network` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT для таблицы `request_rates`
--
ALTER TABLE `request_rates`
  MODIFY `id_request_rate` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `roles`
--
ALTER TABLE `roles`
  MODIFY `id_role` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `status`
--
ALTER TABLE `status`
  MODIFY `id_status` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT для таблицы `systems`
--
ALTER TABLE `systems`
  MODIFY `id_system` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `endpoints`
--
ALTER TABLE `endpoints`
  ADD CONSTRAINT `endpoints_ibfk_1` FOREIGN KEY (`network`) REFERENCES `networks` (`id_network`),
  ADD CONSTRAINT `endpoints_ibfk_2` FOREIGN KEY (`contour`) REFERENCES `contours` (`id_contour`),
  ADD CONSTRAINT `endpoints_ibfk_3` FOREIGN KEY (`system`) REFERENCES `systems` (`id_system`);

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`source_system`) REFERENCES `systems` (`id_system`),
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`dest_system`) REFERENCES `systems` (`id_system`),
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`test_endpoint`) REFERENCES `endpoints` (`id_endpoint`),
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`cert_endpoint`) REFERENCES `endpoints` (`id_endpoint`),
  ADD CONSTRAINT `orders_ibfk_5` FOREIGN KEY (`prod_endpoint`) REFERENCES `endpoints` (`id_endpoint`),
  ADD CONSTRAINT `orders_ibfk_6` FOREIGN KEY (`request_rate`) REFERENCES `request_rates` (`id_request_rate`),
  ADD CONSTRAINT `orders_ibfk_7` FOREIGN KEY (`customer`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `orders_ibfk_8` FOREIGN KEY (`status`) REFERENCES `status` (`id_status`),
  ADD CONSTRAINT `orders_ibfk_9` FOREIGN KEY (`authorization`) REFERENCES `authorizations` (`id_authorization`);

--
-- Ограничения внешнего ключа таблицы `systems`
--
ALTER TABLE `systems`
  ADD CONSTRAINT `systems_ibfk_1` FOREIGN KEY (`responsible`) REFERENCES `users` (`id_user`);

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role`) REFERENCES `roles` (`id_role`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
