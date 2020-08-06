-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 06, 2020 at 06:51 AM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `approval`
--

CREATE TABLE `approval` (
  `id` int(11) NOT NULL,
  `transactionID` int(11) NOT NULL,
  `adminID` int(11) DEFAULT NULL,
  `time` timestamp NULL DEFAULT NULL,
  `detail` text COLLATE utf8_unicode_ci,
  `status` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `approval`
--

INSERT INTO `approval` (`id`, `transactionID`, `adminID`, `time`, `detail`, `status`) VALUES
(1, 1, NULL, NULL, NULL, 'รอการอนุมัติ');

--
-- Triggers `approval`
--
DELIMITER $$
CREATE TRIGGER `edit-app` AFTER UPDATE ON `approval` FOR EACH ROW INSERT INTO `log` (`id`, `detail`, `user`, `timestamp`) VALUES (NULL, CONCAT('แก้ไขสถานะใบเบิก id = ',NEW.id), USER(), CURRENT_TIMESTAMP)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `No` int(11) NOT NULL,
  `category` text COLLATE utf8_unicode_ci NOT NULL,
  `adminID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `No`, `category`, `adminID`) VALUES
(1, 1, 'วัสดุสำนักงาน', 1),
(2, 2, 'วัสดุสิ้นเปลือง', 1);

--
-- Triggers `category`
--
DELIMITER $$
CREATE TRIGGER `del-cat` AFTER DELETE ON `category` FOR EACH ROW INSERT INTO `log` (`id`, `detail`, `user`, `timestamp`) VALUES (NULL, CONCAT('ลบหมวดหมู่ "',OLD.category,'"'), USER(), CURRENT_TIMESTAMP)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `edit-cat` AFTER UPDATE ON `category` FOR EACH ROW INSERT INTO `log` (`id`, `detail`, `user`, `timestamp`) VALUES (NULL, CONCAT('แก้ไขหมวดหมู่ id = ',NEW.id), USER(), CURRENT_TIMESTAMP)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `ins-cat` AFTER INSERT ON `category` FOR EACH ROW INSERT INTO `log` (`id`, `detail`, `user`, `timestamp`) VALUES (NULL, CONCAT('เพิ่มหมวดหมู่ "',NEW.category,'"'), USER(), CURRENT_TIMESTAMP)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `id` int(11) NOT NULL,
  `No` int(11) DEFAULT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`id`, `No`, `name`) VALUES
(1, 1, 'Admin'),
(2, 2, 'operation');

--
-- Triggers `department`
--
DELIMITER $$
CREATE TRIGGER `del-dep` AFTER DELETE ON `department` FOR EACH ROW INSERT INTO `log` (`id`, `detail`, `user`, `timestamp`) VALUES (NULL, CONCAT('ลบหน่วยงาน "',OLD.name,'"'), USER(), CURRENT_TIMESTAMP)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `edit-dep` AFTER UPDATE ON `department` FOR EACH ROW INSERT INTO `log` (`id`, `detail`, `user`, `timestamp`) VALUES (NULL, CONCAT('แก้ไขหน่วยงาน id = ',NEW.id), USER(), CURRENT_TIMESTAMP)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `ins-dep` AFTER INSERT ON `department` FOR EACH ROW INSERT INTO `log` (`id`, `detail`, `user`, `timestamp`) VALUES (NULL, CONCAT('เพิ่มหน่วยงาน "',NEW.name,'"'), USER(), CURRENT_TIMESTAMP)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `id` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `pic` blob,
  `categoryID` int(11) NOT NULL,
  `unit` text COLLATE utf8_unicode_ci NOT NULL,
  `price` float NOT NULL,
  `min` int(11) NOT NULL,
  `max` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `locationID` int(11) NOT NULL,
  `status` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`id`, `name`, `pic`, `categoryID`, `unit`, `price`, `min`, `max`, `amount`, `locationID`, `status`) VALUES
(1, 'test', NULL, 1, 'ตัว', 50, 5, 30, 15, 1, 'เบิกได้'),
(2, 'testlow', NULL, 1, 'ชิ้น', 30.5, 10, 100, 8, 2, 'เบิกได้'),
(3, 'testhight', NULL, 1, 'ก้อน', 11.5, 20, 25, 30, 2, 'เบิกได้');

--
-- Triggers `inventory`
--
DELIMITER $$
CREATE TRIGGER `del-inv` AFTER DELETE ON `inventory` FOR EACH ROW INSERT INTO `log` (`id`, `detail`, `user`, `timestamp`) VALUES (NULL, CONCAT('ลบวัสดุ "',OLD.name,'"'), USER(), CURRENT_TIMESTAMP)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `edit-inv` AFTER UPDATE ON `inventory` FOR EACH ROW INSERT INTO `log` (`id`, `detail`, `user`, `timestamp`) VALUES (NULL, CONCAT('แก้ไขวัสดุ id =',NEW.id), USER(), CURRENT_TIMESTAMP)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `ins-inv` AFTER INSERT ON `inventory` FOR EACH ROW INSERT INTO `log` (`id`, `detail`, `user`, `timestamp`) VALUES (NULL, CONCAT('เพิ่มวัสดุ "',NEW.name,'"'), USER(), CURRENT_TIMESTAMP)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `location`
--

CREATE TABLE `location` (
  `id` int(11) NOT NULL,
  `No` int(11) NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `location`
--

INSERT INTO `location` (`id`, `No`, `name`) VALUES
(1, 1, 'ชั้น 1 ห้องช่าง'),
(2, 2, 'ชั้น 2'),
(3, 3, 'ชั้น 3'),
(4, 4, 'ชั้น 4');

--
-- Triggers `location`
--
DELIMITER $$
CREATE TRIGGER `del-loc` AFTER DELETE ON `location` FOR EACH ROW INSERT INTO `log` (`id`, `detail`, `user`, `timestamp`) VALUES (NULL, CONCAT('ลบสถานที่จัดเก็บ "',OLD.name,'"'), USER(), CURRENT_TIMESTAMP)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `edit-loc` AFTER UPDATE ON `location` FOR EACH ROW INSERT INTO `log` (`id`, `detail`, `user`, `timestamp`) VALUES (NULL, CONCAT('แก้ไขสถานที่จัดเก็บ id = ',NEW.id), USER(), CURRENT_TIMESTAMP)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `ins-loc` AFTER INSERT ON `location` FOR EACH ROW INSERT INTO `log` (`id`, `detail`, `user`, `timestamp`) VALUES (NULL, CONCAT('เพิ่มสถานที่จัดเก็บ "',NEW.name,'"'), USER(), CURRENT_TIMESTAMP)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `log`
--

CREATE TABLE `log` (
  `id` int(11) NOT NULL,
  `detail` text COLLATE utf8_unicode_ci NOT NULL,
  `user` text COLLATE utf8_unicode_ci,
  `timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `log`
--

INSERT INTO `log` (`id`, `detail`, `user`, `timestamp`) VALUES
(8, 'เพิ่มสถานที่จัดเก็บ id = 5', 'root@localhost', '2020-08-06 04:20:04'),
(9, 'ลบสถานที่จัดเก็บ', 'root@localhost', '2020-08-06 04:20:31'),
(10, 'เพิ่มสถานที่จัดเก็บ \"ชั้น 5\"', 'root@localhost', '2020-08-06 04:22:47'),
(11, 'แก้ไขสถานที่จัดเก็บ id = 5', 'root@localhost', '2020-08-06 04:25:54'),
(12, 'ลบสถานที่จัดเก็บ \"ชั้น 5\"', 'root@localhost', '2020-08-06 04:26:00'),
(13, 'เพิ่มหมวดหมู่ \"เครื่องครัว\"', 'root@localhost', '2020-08-06 04:32:33'),
(14, 'แก้ไขหมวดหมู่ id = 3', 'root@localhost', '2020-08-06 04:32:44'),
(15, 'ลบหมวดหมู่ \"เครื่องครัว\"', 'root@localhost', '2020-08-06 04:32:49');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `id` int(11) NOT NULL,
  `No` int(11) NOT NULL,
  `type` text COLLATE utf8_unicode_ci NOT NULL,
  `inventoryID` int(11) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `userID` int(11) DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `location` text COLLATE utf8_unicode_ci,
  `detail` text COLLATE utf8_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `transaction`
--

INSERT INTO `transaction` (`id`, `No`, `type`, `inventoryID`, `time`, `userID`, `amount`, `location`, `detail`) VALUES
(1, 1, 'ขอเบิก', 1, '2020-07-07 07:48:09', 1, 10, NULL, NULL),
(2, 2, 'ยอดยกมา', 1, '2020-08-04 08:57:45', NULL, 15, NULL, NULL),
(3, 3, 'ยอดยกมา', 2, '2020-08-04 09:10:37', NULL, 8, NULL, NULL);

--
-- Triggers `transaction`
--
DELIMITER $$
CREATE TRIGGER `del-tran` AFTER DELETE ON `transaction` FOR EACH ROW INSERT INTO `log` (`id`, `detail`, `user`, `timestamp`) VALUES (NULL, CONCAT('ยกเลิกคำร้อง',OLD.id), USER(), CURRENT_TIMESTAMP)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `edit-tran` AFTER UPDATE ON `transaction` FOR EACH ROW INSERT INTO `log` (`id`, `detail`, `user`, `timestamp`) VALUES (NULL, CONCAT('แก้ไขคำร้อง id = ',NEW.id), USER(), CURRENT_TIMESTAMP)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `ins-tran` AFTER INSERT ON `transaction` FOR EACH ROW INSERT INTO `log` (`id`, `detail`, `user`, `timestamp`) VALUES (NULL, CONCAT('เพิ่มคำร้อง id = ',NEW.id), USER(), CURRENT_TIMESTAMP)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` text COLLATE utf8_unicode_ci NOT NULL,
  `password` text COLLATE utf8_unicode_ci NOT NULL,
  `name` text COLLATE utf8_unicode_ci NOT NULL,
  `email` text COLLATE utf8_unicode_ci,
  `role` text COLLATE utf8_unicode_ci NOT NULL,
  `departmentID` int(11) NOT NULL,
  `status` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `name`, `email`, `role`, `departmentID`, `status`) VALUES
(1, 'admin', 'P@ssw0rd2020', 'admin', 'admin@thepractical.com', 'admin', 2, 'ใช้งาน'),
(2, 'user', 'P@ssw0rd2020', 'user', 'user@thepractical.com', 'user', 2, 'ใช้งาน'),
(3, 'trainee', 'P@ssw0rd2020', 'trainee', 'trainee@thepractical.com', 'admin', 2, 'ใช้งาน');

--
-- Triggers `user`
--
DELIMITER $$
CREATE TRIGGER `del-user` AFTER DELETE ON `user` FOR EACH ROW INSERT INTO `log` (`id`, `detail`, `user`, `timestamp`) VALUES (NULL, CONCAT('ลบผู้ใช้งาน "',OLD.username,'"'), USER(), CURRENT_TIMESTAMP)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `edit-user` AFTER UPDATE ON `user` FOR EACH ROW INSERT INTO `log` (`id`, `detail`, `user`, `timestamp`) VALUES (NULL, CONCAT('แก้ไขข้อมูลผู้ใช้งาน id = ',NEW.id), USER(), CURRENT_TIMESTAMP)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `ins-user` AFTER INSERT ON `user` FOR EACH ROW INSERT INTO `log` (`id`, `detail`, `user`, `timestamp`) VALUES (NULL, CONCAT('เพิ่มผู้ใช้งาน "',NEW.username,'"'), USER(), CURRENT_TIMESTAMP)
$$
DELIMITER ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `approval`
--
ALTER TABLE `approval`
  ADD PRIMARY KEY (`id`),
  ADD KEY `transactionID` (`transactionID`),
  ADD KEY `adminID` (`adminID`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adminID` (`adminID`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryID` (`categoryID`),
  ADD KEY `locationID` (`locationID`);

--
-- Indexes for table `location`
--
ALTER TABLE `location`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `log`
--
ALTER TABLE `log`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `inventoryID` (`inventoryID`),
  ADD KEY `userID` (`userID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `departmentID` (`departmentID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `approval`
--
ALTER TABLE `approval`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `location`
--
ALTER TABLE `location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `log`
--
ALTER TABLE `log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `approval`
--
ALTER TABLE `approval`
  ADD CONSTRAINT `approval_ibfk_1` FOREIGN KEY (`transactionID`) REFERENCES `transaction` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `approval_ibfk_2` FOREIGN KEY (`adminID`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `category`
--
ALTER TABLE `category`
  ADD CONSTRAINT `category_ibfk_1` FOREIGN KEY (`adminID`) REFERENCES `user` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`categoryID`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`locationID`) REFERENCES `location` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`inventoryID`) REFERENCES `inventory` (`id`) ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`userID`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`departmentID`) REFERENCES `department` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
