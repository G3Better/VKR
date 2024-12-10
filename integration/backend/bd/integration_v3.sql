-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Дек 10 2024 г., 15:25
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
(1, 'Тестовый контур');

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
(7, 'https://test.qwerty1', '10.12.10.12', '443', 1, 1, 8, NULL),
(8, 'https://test.qwerty1', '10.13.10.13', '443', 1, 1, 8, NULL);

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
(1, 'VLAN 811');

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
  `isAcceptedByIS` tinyint(1) DEFAULT NULL,
  `isAcceptedByCorpArch` tinyint(1) DEFAULT NULL,
  `isAcceptedByArc` tinyint(1) DEFAULT NULL,
  `description` varchar(10000) NOT NULL,
  `swagger` text CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id_order`, `title`, `source_system`, `dest_system`, `request_rate`, `status`, `authorization`, `customer`, `test_endpoint`, `cert_endpoint`, `prod_endpoint`, `isAcceptedByIS`, `isAcceptedByCorpArch`, `isAcceptedByArc`, `description`, `swagger`) VALUES
(13, 'Тестовая система 1->2', 7, 8, 2, 14, 1, 2, NULL, NULL, 8, NULL, NULL, 1, 'Тестовая интеграция 1', ''),
(14, 'Тестовая система 2->1', 8, 7, 5, 6, 3, 2, NULL, NULL, 8, 1, NULL, NULL, 'Тестовая интеграция 2', '');

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
(8, 'Тестовая система 2', 1);

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
  `password` varchar(21) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id_user`, `FIO`, `email`, `post`, `contacts`, `role`, `login`, `password`) VALUES
(1, 'Testov Test Testovich', 'admin@bk.ru', 'Главный администратор', '+79302873599', 5, 'admin', 'admin'),
(2, 'Zakazov Zakaz Zakovich', 'zak@bk.ru', 'Директор проекта', '+473892156737564 Telegram: Какой-то', 1, 'zak', 'zak123');

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
-- AUTO_INCREMENT для таблицы `endpoints`
--
ALTER TABLE `endpoints`
  MODIFY `id_endpoint` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id_order` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

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
  MODIFY `id_system` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
