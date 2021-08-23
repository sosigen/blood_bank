-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 23 Sie 2021, 21:44
-- Wersja serwera: 10.4.20-MariaDB
-- Wersja PHP: 7.3.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `blood_bank`
--

-- --------------------------------------------------------

--
-- Zastąpiona struktura widoku `bank`
-- (Zobacz poniżej rzeczywisty widok)
--
CREATE TABLE `bank` (
`blood_type` enum('A','A+','A-','B','B+','B-','0','0+','0-','AB','AB+','AB-')
,`quantity` bigint(21)
);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `donations`
--

CREATE TABLE `donations` (
  `donation_id` int(11) NOT NULL,
  `donation_date` date NOT NULL DEFAULT current_timestamp(),
  `donor_id` int(11) NOT NULL,
  `available` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `donations`
--

INSERT INTO `donations` (`donation_id`, `donation_date`, `donor_id`, `available`) VALUES
(1, '2021-08-19', 1, 1),
(2, '2021-08-19', 2, 1),
(3, '2021-08-22', 3, 0),
(4, '2021-08-12', 3, 0),
(5, '2021-08-08', 1, 0),
(6, '2021-08-18', 4, 1),
(7, '2021-08-19', 4, 0),
(8, '2021-08-29', 4, 0);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `donors`
--

CREATE TABLE `donors` (
  `donor_id` int(11) NOT NULL,
  `forename` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `blood_type` enum('A','A+','A-','B','B+','B-','0','0+','0-','AB','AB+','AB-') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `donors`
--

INSERT INTO `donors` (`donor_id`, `forename`, `surname`, `email`, `phone`, `blood_type`) VALUES
(1, 'Janko', 'Walski', 'jankw@mail.com', '712846607', '0+'),
(2, 'Janina', 'Trzmiel', 'trzmiel3@mail.pl', '492746', 'A+'),
(3, 'Ewelina', 'Wyżynna', 'ewa@mail.com', '897357201', 'AB'),
(4, 'Sasuke', 'Uchiha', 'sas@uke.pl', '384678137', '0+'),
(5, 'Naruto', 'Uzumaki', 'ninetailfox@mail.com', '12490234', 'B-');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `recipients`
--

CREATE TABLE `recipients` (
  `recipient_id` int(11) NOT NULL,
  `forename` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `blood_type` enum('A','A+','A-','B','B+','B-','0','0+','0-','AB','AB+','AB-') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `recipients`
--

INSERT INTO `recipients` (`recipient_id`, `forename`, `surname`, `email`, `phone`, `blood_type`) VALUES
(1, 'Mohammed', 'Avdol', 'mohav32@mail.com', '4857439123', 'B+'),
(2, 'Franciszek', 'Mirg', 'franek@mail.com', '21239412', 'A+'),
(3, 'Halina', 'Halińska', 'haha@mail.com', '123857148', '0'),
(4, 'Grzegorz', 'Dmirski', 'dmirek@mail.org', '132412346', 'AB-');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `transactions`
--

CREATE TABLE `transactions` (
  `transaction_id` int(11) NOT NULL,
  `donation_id` int(11) NOT NULL,
  `transaction_date` date NOT NULL DEFAULT current_timestamp(),
  `recipient_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Zrzut danych tabeli `transactions`
--

INSERT INTO `transactions` (`transaction_id`, `donation_id`, `transaction_date`, `recipient_id`) VALUES
(1, 1, '2021-08-20', 1),
(16, 8, '2021-08-21', 1),
(17, 7, '2021-08-08', 3),
(18, 5, '2021-08-15', 3);

--
-- Wyzwalacze `transactions`
--
DELIMITER $$
CREATE TRIGGER `use_blood` AFTER INSERT ON `transactions` FOR EACH ROW UPDATE donations 
SET available = 0
WHERE donation_id = new.donation_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Struktura widoku `bank`
--
DROP TABLE IF EXISTS `bank`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `bank`  AS SELECT `donors`.`blood_type` AS `blood_type`, count(0) AS `quantity` FROM (`donations` join `donors` on(`donations`.`donor_id` = `donors`.`donor_id`)) GROUP BY `donors`.`blood_type` ;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `donations`
--
ALTER TABLE `donations`
  ADD PRIMARY KEY (`donation_id`),
  ADD KEY `fk_314l` (`donor_id`) USING BTREE;

--
-- Indeksy dla tabeli `donors`
--
ALTER TABLE `donors`
  ADD PRIMARY KEY (`donor_id`),
  ADD UNIQUE KEY `forename` (`forename`,`surname`) USING BTREE;

--
-- Indeksy dla tabeli `recipients`
--
ALTER TABLE `recipients`
  ADD PRIMARY KEY (`recipient_id`),
  ADD UNIQUE KEY `forename` (`forename`,`surname`) USING BTREE;

--
-- Indeksy dla tabeli `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`transaction_id`),
  ADD KEY `fkIdx_44` (`recipient_id`),
  ADD KEY `donation_id` (`donation_id`) USING BTREE;

--
-- AUTO_INCREMENT dla zrzuconych tabel
--

--
-- AUTO_INCREMENT dla tabeli `donations`
--
ALTER TABLE `donations`
  MODIFY `donation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT dla tabeli `donors`
--
ALTER TABLE `donors`
  MODIFY `donor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT dla tabeli `recipients`
--
ALTER TABLE `recipients`
  MODIFY `recipient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT dla tabeli `transactions`
--
ALTER TABLE `transactions`
  MODIFY `transaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `donations`
--
ALTER TABLE `donations`
  ADD CONSTRAINT `donations_ibfk_1` FOREIGN KEY (`donor_id`) REFERENCES `donors` (`donor_id`);

--
-- Ograniczenia dla tabeli `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `FK_43` FOREIGN KEY (`recipient_id`) REFERENCES `recipients` (`recipient_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
