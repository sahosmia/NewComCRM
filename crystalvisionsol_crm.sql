-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 29, 2026 at 10:14 AM
-- Server version: 11.4.12-MariaDB
-- PHP Version: 8.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crystalvisionsol_crm`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cache`
--

INSERT INTO `cache` (`key`, `value`, `expiration`) VALUES
('crystal-vision-solutions-cache-1985f862b0db7f3231b8ea4a137f5249', 'i:1;', 1782314686),
('crystal-vision-solutions-cache-1985f862b0db7f3231b8ea4a137f5249:timer', 'i:1782314686;', 1782314686),
('crystal-vision-solutions-cache-275856c4e11a2f33a742574a64e01f49', 'i:1;', 1782024015),
('crystal-vision-solutions-cache-275856c4e11a2f33a742574a64e01f49:timer', 'i:1782024015;', 1782024015),
('crystal-vision-solutions-cache-2931c6834e2b09ae856c51aa013be911', 'i:1;', 1782649794),
('crystal-vision-solutions-cache-2931c6834e2b09ae856c51aa013be911:timer', 'i:1782649794;', 1782649794),
('crystal-vision-solutions-cache-4c03b4b22bdf1730ed1795e95f0d8b84', 'i:1;', 1782717017),
('crystal-vision-solutions-cache-4c03b4b22bdf1730ed1795e95f0d8b84:timer', 'i:1782717017;', 1782717017),
('crystal-vision-solutions-cache-59e0368d2b893b2970b3042e5d445df7', 'i:1;', 1782025958),
('crystal-vision-solutions-cache-59e0368d2b893b2970b3042e5d445df7:timer', 'i:1782025958;', 1782025958),
('crystal-vision-solutions-cache-6daabc37d03fd29029ecb7c29dbcf449', 'i:1;', 1782708893),
('crystal-vision-solutions-cache-6daabc37d03fd29029ecb7c29dbcf449:timer', 'i:1782708893;', 1782708893),
('crystal-vision-solutions-cache-810eee10c419ac8941f2cd5e9749ea5c', 'i:1;', 1782722429),
('crystal-vision-solutions-cache-810eee10c419ac8941f2cd5e9749ea5c:timer', 'i:1782722429;', 1782722429),
('crystal-vision-solutions-cache-82eb21b5e4ef7b0ad7d1727375362d60', 'i:1;', 1782361794),
('crystal-vision-solutions-cache-82eb21b5e4ef7b0ad7d1727375362d60:timer', 'i:1782361794;', 1782361794),
('crystal-vision-solutions-cache-8effee409c625e1a2d8f5033631840e6ce1dcb64', 'i:1;', 1782363140),
('crystal-vision-solutions-cache-8effee409c625e1a2d8f5033631840e6ce1dcb64:timer', 'i:1782363140;', 1782363140),
('crystal-vision-solutions-cache-917595177850778857738593439be34e', 'i:1;', 1782361413),
('crystal-vision-solutions-cache-917595177850778857738593439be34e:timer', 'i:1782361413;', 1782361413),
('crystal-vision-solutions-cache-a38694e033037e6a900cdd72ac73ca4f', 'i:2;', 1782292907),
('crystal-vision-solutions-cache-a38694e033037e6a900cdd72ac73ca4f:timer', 'i:1782292907;', 1782292907),
('crystal-vision-solutions-cache-a4b4065d57c759a29b50f037153a3aea', 'i:1;', 1782362226),
('crystal-vision-solutions-cache-a4b4065d57c759a29b50f037153a3aea:timer', 'i:1782362226;', 1782362226),
('crystal-vision-solutions-cache-bb39920cd551728dc61a6aca7e219cbd', 'i:1;', 1782703951),
('crystal-vision-solutions-cache-bb39920cd551728dc61a6aca7e219cbd:timer', 'i:1782703951;', 1782703951),
('crystal-vision-solutions-cache-c52ea3531d7c084db25fad9e7df6296b', 'i:1;', 1782577800),
('crystal-vision-solutions-cache-c52ea3531d7c084db25fad9e7df6296b:timer', 'i:1782577800;', 1782577800),
('crystal-vision-solutions-cache-c5b76da3e608d34edb07244cd9b875ee86906328', 'i:1;', 1782362127),
('crystal-vision-solutions-cache-c5b76da3e608d34edb07244cd9b875ee86906328:timer', 'i:1782362127;', 1782362127),
('crystal-vision-solutions-cache-dc44958e29ffba8b810d21377ae366b5', 'i:1;', 1782109028),
('crystal-vision-solutions-cache-dc44958e29ffba8b810d21377ae366b5:timer', 'i:1782109028;', 1782109028),
('crystal-vision-solutions-cache-e2695f7d19975077a03da8027b3fe396', 'i:1;', 1782310656),
('crystal-vision-solutions-cache-e2695f7d19975077a03da8027b3fe396:timer', 'i:1782310656;', 1782310656),
('crystal-vision-solutions-cache-fc056318f7d8dd5382e73cb032040390', 'i:1;', 1782217679),
('crystal-vision-solutions-cache-fc056318f7d8dd5382e73cb032040390:timer', 'i:1782217679;', 1782217679),
('crystal-vision-solutions-cache-ff5001de1add63a713449136f9e1435d', 'i:1;', 1782711222),
('crystal-vision-solutions-cache-ff5001de1add63a713449136f9e1435d:timer', 'i:1782711222;', 1782711222),
('crystal-vision-solutions-cache-settings.all', 'O:29:\"Illuminate\\Support\\Collection\":2:{s:8:\"\0*\0items\";a:25:{s:8:\"app_name\";s:24:\"Crystal Vision Solutions\";s:5:\"email\";s:28:\"crystalsolutionsbd@gmail.com\";s:5:\"phone\";s:12:\"01730-495650\";s:7:\"address\";s:64:\"Tower 71, Level-8, Near ECB Circle, Dhaka Cantonment, Dhaka-1206\";s:11:\"website_url\";s:34:\"http://www.crystalcomputers.com.bd\";s:15:\"branding_slogan\";s:42:\"LEADING ICT AND SECURITY SERVICES PROVIDER\";s:21:\"branding_services_bar\";s:132:\"Server | Server Spare Parts | Networking Equipment\'s | Security Equipment\'s | Sound Equipment\'s | Smart Device | Interactive Display\";s:16:\"support_whatsapp\";N;s:13:\"office_name_1\";s:20:\"Elephant Road Branch\";s:16:\"office_address_1\";s:72:\"Tabas Building (Level-5), 53/2 New Elephant Road\r\nDhaka-1205, Bangladesh\";s:13:\"office_name_2\";s:16:\"Corporate Office\";s:16:\"office_address_2\";s:103:\"Tower 71 (Level-8, C-9), 516/3 South Manikdi, Near ECB Circle\r\nDhaka Cantonment, Dhaka-1206, Bangladesh\";s:13:\"office_name_3\";s:14:\"Service Centre\";s:16:\"office_address_3\";s:72:\"Tabas Building (Level-5), 53/2 New Elephant Road\r\nDhaka-1205, Bangladesh\";s:19:\"footer_contact_info\";s:94:\"E-mail: info@crystalcomputers.com.bd, Hunting: 09666733744, Mobile: 01730-495650, 01730-495651\";s:22:\"pdf_sender_office_info\";s:99:\"<strong>Corporate Office:</strong> Tower 71, Level-8, Near ECB Circle, Dhaka Cantonment, Dhaka-1206\";s:18:\"paginated_quantity\";s:2:\"10\";s:11:\"default_vat\";s:1:\"0\";s:11:\"default_ait\";s:1:\"0\";s:21:\"quotation_thanks_text\";N;s:9:\"site_logo\";s:53:\"settings/82tv6O3rQAx48mfJsAPkegN4mVLwMnrLtT4MVGVe.png\";s:4:\"logo\";s:53:\"settings/ioVIBDtLNbTX3LasBtj95Wowd5c3RCDR3fX3sGci.png\";s:14:\"secondary_logo\";s:53:\"settings/bBcFlCcy7QDJCmjNKymqA5VQt2TGPZboZYNThEkA.png\";s:7:\"favicon\";s:53:\"settings/z155YhDvXjv6HvxN4BxH03JsSE6hYwDdd93GFHd5.png\";s:12:\"company_seal\";s:53:\"settings/Mjpf2Pziwu2KZemg5kJuYyTqrJkgjTn59HRGT5hS.png\";}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}', 2097660563);

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `companies`
--

CREATE TABLE `companies` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `companies`
--

INSERT INTO `companies` (`id`, `name`, `email`, `phone`, `website`, `address`, `created_at`, `updated_at`) VALUES
(53, 'Mainetti Bangladesh', 'Ferdous.Alam@mainetti.com', '01847337835', 'http://mainetti.com/', 'Plot No. 129 - 131, D.E.P.Z Savar, 1349 Bangladesh.', '2026-06-23 13:41:25', '2026-06-23 13:41:25'),
(54, 'PRAN-RFL GROUP', 'tanbir@prangroup.com', '+880 176 9696 222', 'http://prangroup.com/', '105 Pragati Sarani, Middle Badda, GPO BOX - 83, Dhaka-1212, Bangladesh.', '2026-06-23 14:50:27', '2026-06-25 04:40:13'),
(55, 'Green Life Knit Composite Ltd. (Green Life Group)', 'Audit@greenlifebd.com', '01810020272', 'https://www.greenlifebd.com/', 'Tongabari, Ashulia, Savar, Dhaka.', '2026-06-24 09:37:48', '2026-06-24 09:37:48'),
(56, 'Mainetti Packaging Bangladesh Pvt Ltd', 'Mpbl.Procurement@mainetti.com', '+8801847431153', 'https://www.mainetti.com/', 'VATARKHOLA, NAOGAON BAZAR, DHAMRAI, Bangladesh', '2026-06-24 10:46:48', '2026-06-24 10:46:48'),
(57, 'Water Technology LTD', NULL, '01972979089', 'https://www.wtbl.com.bd/', 'House #1248, Level #04, Road #09, Avenue #02, Mirpur DOHS, Dhaka-1216.', '2026-06-24 11:39:26', '2026-06-24 11:39:26'),
(58, 'bNet Limited', 'labony@bnet.com.bd', '+8801778455755', 'https://www.bnet.com.bd/', 'House- 277, Road- 1, Baitul Aman Housing Society, Shyamoli, Adabor, Dhaka- 1207.', '2026-06-24 12:47:26', '2026-06-24 12:47:26'),
(59, 'Faridganj Broadband', NULL, '+880 1891-155231', NULL, 'Faridganj Chadpur', '2026-06-25 04:55:47', '2026-06-25 04:55:47'),
(60, 'Eurofins MTS Bangladesh Limited', 'Dey@xoin.eurofinsasia.com', '01755642005', 'https://www.eurofins.com/', '280, East Narsingahpur, Ashulia, Dhaka-1346. Savar Bangladesh.', '2026-06-25 06:01:13', '2026-06-25 06:01:13'),
(61, 'GLOBAL HAAT', 'info@globalhaatbd.com', '01712-751169', 'https://www.globalhaatbd.com', '145, Eastern Plus Shopping Complex, Shop-57, Level-4, Shantinagar, Dhaka-1217', '2026-06-25 06:12:11', '2026-06-25 06:12:11'),
(62, 'Revolution Technology BD', 'mahin@revolutiontech.com.bd', '+88 01404-078087', NULL, '54, Motijheel Commercial Area, Elite House 3rd Floor, Dhaka-1000, Bangladesh.', '2026-06-25 06:17:07', '2026-06-25 06:17:07'),
(63, 'AK Networks', NULL, '01731595913', NULL, 'Gopalganj', '2026-06-25 06:40:07', '2026-06-25 06:40:07'),
(64, 'JAAGO Foundation', NULL, NULL, 'https://jaago.com.bd/', NULL, '2026-06-25 06:49:23', '2026-06-25 06:49:23'),
(65, 'RANGS eMART', 'rajib@rangsemart.com.bd', '01708457504', 'https://rangsemart.com.bd/', 'Rangs Industries Limited Rangs Bhaban (Level-6) 117/A, Old Airport Road Bijoy Sharani, Dhaka-1215', '2026-06-25 07:01:52', '2026-06-25 07:01:52'),
(66, 'Smart', 'rahul.rabby@smartbd.com', '+880-1-799986866', NULL, 'Dhaka', '2026-06-25 07:15:10', '2026-06-25 07:15:10'),
(67, 'Digital Equipment Limited', NULL, NULL, 'https://digitalequipment.com.bd/', NULL, '2026-06-25 10:13:52', '2026-06-25 10:13:52'),
(68, 'Fix 24 IT Solutions', 'fix24itsolutions@gmail.com', '0 1855-904297', NULL, 'Level-2, Shop-124/1, Muktobangla Shopping Complex, Mirpur-01, Dhaka-1216.', '2026-06-25 10:29:40', '2026-06-25 10:29:40'),
(69, 'MRA Automation & Engineering Ltd', 'mraautomationdh@gmail.com', '01773723537', NULL, 'Sheltech Sierra Tower (4th Floor), 236 New Elephant Road Dhaka-1206.', '2026-06-25 10:37:05', '2026-06-25 10:37:05'),
(70, 'Knight Technologies', 'knighttechnologiesbd@gmail.com', '0 1619-353738', NULL, '24, Elephant Road (Ground Floor) Dhaka-1205.', '2026-06-25 10:48:38', '2026-06-25 10:48:38'),
(71, 'Tech Zone® (Corporate IT Service)', NULL, NULL, 'https://techzonebd.com/', NULL, '2026-06-25 11:23:14', '2026-06-25 11:23:14'),
(72, 'Grand Sylhet Hotel & Resort', 'purchase@grandsylhet.com', '01321-201581', 'https://grandsylhet.com/', 'Boroshala, Khadimnogor Union Parishad, Airport Road, Sylhet Sodor.', '2026-06-25 12:17:33', '2026-06-25 12:17:33'),
(73, 'Walton Digi-Tech Industries Ltd', 'wdc.scm-purchase4@waltonbd.com', '01608985702‬', 'https://waltondigitech.com/', 'Chandra, Kaliakoir, Gazipur.', '2026-06-25 12:25:29', '2026-06-25 12:25:29'),
(74, 'RANGS LIMITED', 'arifulislam@rancon.com.bd', '01730-706987', 'https://www.rangsgroup.com/', '387, Tejgaon Industrial Area, Dhaka 1215.', '2026-06-25 12:30:00', '2026-06-25 12:30:00'),
(75, 'Bangladesh-India Friendship Power Company (Pvt.) Ltd.', 'atmmasud@bifpcl.com', '01329667502', 'https://bifpcl.com/', 'Unique Heights (Borak), Level-17, 117, Kazi Nazrul Islam Avenue, Eskaton Garden, Dhaka-1000.', '2026-06-25 12:35:58', '2026-06-25 12:35:58'),
(76, 'AO Smith Bangladesh Private Ltd', 'rezar@aosmith.com', '01717-100100', 'https://aosmithbangladesh.com/', '4th Floor, Unit-A, 246, Rangs Babylonia, 1208 Bir Uttam Mir Shawkat Sarak, Dhaka 1208.', '2026-06-25 12:39:28', '2026-06-25 12:39:28'),
(77, 'Samuda Chemical Complex Limited', 'scml@scclbd.com', '01799-992813', 'https://www.scclbd.com/', 'T.K Bhaban (8th & 9th Floor), 13 Kawran Bazar, Dhaka-1215.', '2026-06-25 12:43:35', '2026-06-25 12:43:35'),
(78, 'Khan Technology BD', 'sb.eliaskhan@gmail.com', '01713474328', NULL, '35 South Avenue AWR Usman Tower Shop#2 Gulshan-1, Dhaka-1212', '2026-06-27 07:21:48', '2026-06-27 07:21:48'),
(79, 'PERMITDENY LTD', 'riashat@email.com', '01713078166', NULL, 'Road 21, House 133-B, Mohakhali DOHS, Dhaka-1207, Bangladesh.', '2026-06-27 09:20:02', '2026-06-27 09:20:02'),
(80, 'Baro Bhuiyan Group', 'saifur2004@gmail.com', '01711590078', NULL, '6, Motijheel C/A, 7th Floor, Dhaka-1000.', '2026-06-27 09:30:46', '2026-06-27 09:30:46'),
(81, 'S.R. Computer', 'bkash2222@gmail.com', '01712824328', NULL, 'Shop No #339, 3rd Floor Aloka Nodi Bangla Complex Mymensingh', '2026-06-27 09:50:04', '2026-06-27 09:50:04'),
(82, 'Ahmed Masud & Brothers', 'mdskuddn8@gmail.com', '01878278880', NULL, '44 No Nazir Ahmed Chy, Road, Andharkilla, Chittagong, Bangladesh', '2026-06-27 09:55:06', '2026-06-27 09:55:06'),
(83, 'BLOCK B SOLUTIONS', 'blockbsolutionsbd@gmail.com', '01401288820', 'https://blockbsolutions.com/', 'Suite 5/E, Level-05, Azmiri Probal Towe 45, Ring Road, Adabar, Dhaka-1207, Bangladesh', '2026-06-27 10:12:50', '2026-06-27 10:12:50'),
(84, 'Vista Infra Solutioins', 'info.bistainfra@gmail.com', '01970-013534', 'https://vistasinfra.com/', '1st Floor, Hoous-12, Road-9, Sector-1, Block-F, Aftabnagar, Dhaka-1212, Bangladesh', '2026-06-27 11:29:01', '2026-06-27 11:29:01'),
(85, 'Electrolink', 'msgtohassan@gmail.com', '01743932725', NULL, '117/2/2 Bhuiyan Mansion (Level-06), KM, Das Lane, Tikatuli, Dhaka-1203', '2026-06-27 11:49:27', '2026-06-27 11:49:27'),
(86, 'City Network', NULL, '01735218554', NULL, NULL, '2026-06-27 12:04:59', '2026-06-27 12:04:59'),
(87, 'Shadhinota NET', NULL, '01920792354', NULL, NULL, '2026-06-27 12:11:39', '2026-06-27 12:11:39'),
(88, 'Sikdar Cable Network', NULL, '01999635054', NULL, 'Amir Kal Super Market (3rd Floor) Siraj di khan Munshigonj', '2026-06-27 12:39:09', '2026-06-27 12:39:09'),
(89, 'Innovative Multipurpose Solution (IMS)', 'imsbd2000@gmail.com', '01947-475766', NULL, 'House # 26, Road # 09, PC Culture Housing, Shakertek, Adabor, Dhaka-1207, Bangladesh', '2026-06-28 04:23:13', '2026-06-28 04:23:13'),
(90, 'Corporate Station Bangladesh', 'arman@corporatestationbd.com', '01329692778', NULL, 'Level-4, House: 339/B, Khilgaon, Dhaka-1219 Bangladesh', '2026-06-28 04:42:36', '2026-06-28 04:42:36'),
(91, 'STS Automation', 'sts.mktg23@gmail.com', '01323140192', NULL, '218, Sahera Tropical Centre Level #14, Suite No #1403-A Elephant Road (Bata Signal), Dhaka-1205', '2026-06-28 04:51:11', '2026-06-28 04:51:11'),
(92, 'Chevron Bangladesh Jalalabad Gas Field', 'asifmaskur@chevron.com', '01918312097', 'https://bangladesh.chevron.com/our-businesses/jalalabad', 'Jalalabad gas field in Block 13. Situated in Lakkatura, Sylhet.', '2026-06-28 07:22:28', '2026-06-28 07:22:28'),
(93, 'Super Computer & IT', 'scit.info2021@gmail.com', '01773 777088', NULL, 'Shop No. 446, 3rd Floor, Shopnochura Plaza Kadirgonj, Rajshahi-6000, Bangladesh', '2026-06-28 08:40:13', '2026-06-28 08:40:13'),
(94, 'Voumik Brothers', NULL, '01817181139', NULL, 'Mirpur Shewrapara', '2026-06-28 08:44:07', '2026-06-28 08:44:07'),
(95, 'Computer Future', 'rakibfuture@yahoo.com', '01713-484330', NULL, 'Showkat Ali Talukder (Capsule), Poura Super Market (1st Floor), Victoria Road, Tangail-1900, Bangladesh', '2026-06-28 09:56:40', '2026-06-28 09:56:40'),
(96, 'Ajmir Enterprise', 'ajmirenterprise23@gmail.com', '01812837587', NULL, '2551/C, Basa Mia Road, West Nasirabad, Pahartali Chittagong', '2026-06-28 10:24:58', '2026-06-28 10:24:58'),
(97, 'Glory Office Solution', 'info@gloryofficebd.com', '01623762746', 'https://gloryofficebd.com/', '67 Motijheel B/A, Dhaka 1000', '2026-06-28 10:40:05', '2026-06-28 10:43:19'),
(98, 'STS Sutomation', NULL, NULL, NULL, NULL, '2026-06-28 11:04:29', '2026-06-28 11:04:29'),
(99, 'Comptech Solution', NULL, NULL, NULL, NULL, '2026-06-28 11:08:49', '2026-06-28 11:08:49'),
(100, 'Dignity IT', NULL, NULL, NULL, NULL, '2026-06-28 11:31:40', '2026-06-28 11:31:40'),
(101, 'Multisystem Solution', 'msolutionbd@yahoo.com', '+8801795198560', 'https://www.msolutionbd.com/', 'Chittagong Computer City, RF Johura Tower (2nd Floor), Shop No. # 303, 1401, Sk Mujib Road, Chowmuhani, Agrabad, Chattogram-4100, Bangladesh', '2026-06-28 12:27:21', '2026-06-28 12:27:21'),
(102, '1000FiX Services Ltd.', NULL, NULL, NULL, NULL, '2026-06-28 12:27:30', '2026-06-28 12:27:30'),
(103, 'JS Cotton International', 'info@jscottoninternationalbd.com', '01725358877', 'https://jscottoninternationalbd.com/', 'RS-903, Shasongoan, Enayetnagar, Fatullah, Narayanganj-1400', '2026-06-29 05:14:11', '2026-06-29 05:14:11'),
(104, 'Optimal Technology', 'scm@optimal.com.bd', '01973432334', NULL, 'Sagufta De Nawar-1, Level-3-4, 136/Ta Gulshan-Badda Link Road, Dhaka-1212', '2026-06-29 05:30:27', '2026-06-29 05:30:27'),
(105, 'R.PH. GROUP', NULL, NULL, NULL, 'Ka-86/C, Kazi Bari, Kuril Biswaroad, Vatara, Dhaka - 1229.', '2026-06-29 06:18:39', '2026-06-29 06:18:39'),
(106, 'Bangladesh Navy', 'dlokbwf25@gmail.com', '01727528625', NULL, 'New mooring Chattogram', '2026-06-29 08:57:07', '2026-06-29 08:57:07'),
(107, 'SSC SVR', NULL, '01769094466', NULL, 'Savar Cantonment', '2026-06-29 08:58:03', '2026-06-29 08:58:03');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `company_id` bigint(20) UNSIGNED DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `assigned_to` bigint(20) UNSIGNED NOT NULL,
  `type` enum('corporate','reseller','personal') NOT NULL DEFAULT 'corporate',
  `phones` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`phones`)),
  `addresses` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`addresses`)),
  `remarks` text DEFAULT NULL,
  `status` enum('active','inactive') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `designation`, `company_id`, `email`, `date_of_birth`, `assigned_to`, `type`, `phones`, `addresses`, `remarks`, `status`, `created_at`, `updated_at`) VALUES
(51, 'John Smith', 'Manager', NULL, 'john@email.com', NULL, 1, 'corporate', '[\"01700000000\"]', '[\"Dhaka, Bangladesh.\"]', NULL, 'active', '2026-06-23 08:15:04', '2026-06-23 08:15:04'),
(56, 'Ferdous Alam', 'Executive, Procurement', 53, 'Ferdous.Alam@mainetti.com', NULL, 54, 'corporate', '[\"01847337835\"]', '[\"Plot No. 129 - 131, D.E.P.Z Savar, 1349 Bangladesh.\"]', NULL, 'active', '2026-06-23 13:43:26', '2026-06-23 13:43:26'),
(58, 'Md. Tanbir Hossain', 'General Manager, MIS', 54, 'tanbir@prangroup.com', NULL, 54, 'corporate', '[\"01769696222\"]', '[\"105 Pragati Sarani, Middle Badda, GPO BOX - 83, Dhaka-1212, Bangladesh.\"]', NULL, 'active', '2026-06-23 14:52:15', '2026-06-23 14:52:15'),
(59, 'Hossain Ahmed', 'Manager, Internal', 55, 'Audit@greenlifebd.com', NULL, 54, 'corporate', '[\"01810020272\"]', '[\"Tongabari, Ashulia, Savar, Dhaka.\"]', NULL, 'active', '2026-06-24 09:47:06', '2026-06-24 09:47:06'),
(60, 'Md Monju Mia', 'Purchase Assistant, Procurement', 56, 'Mpbl.Procurement@mainetti.com', NULL, 54, 'corporate', '[\"01847431153\"]', '[\"VATARKHOLA, NAOGAON BAZAR, DHAMRAI, Bangladesh\"]', NULL, 'active', '2026-06-24 10:58:59', '2026-06-24 10:58:59'),
(61, 'Mahiuddin Samad', 'Software Engineer', 57, 'softdevwtbl@gmail.com', NULL, 54, 'corporate', '[\"01972979089\"]', '[\"House #1248, Level #04, Road #09, Avenue #02, Mirpur DOHS, Dhaka-1216.\"]', NULL, 'active', '2026-06-24 11:46:19', '2026-06-24 11:46:19'),
(62, 'Labony Akter', 'Chief Corporate Affairs', 58, 'labony@bnet.com.bd', NULL, 54, 'reseller', '[\"01778455755\"]', '[\"House- 277, Road- 1, Baitul Aman Housing Society, Shyamoli, Adabor, Dhaka- 1207.\"]', NULL, 'active', '2026-06-24 12:49:30', '2026-06-24 12:49:30'),
(63, 'Mostafa Tajwar Yasar', 'User', NULL, NULL, NULL, 53, 'personal', '[\"01410210500\"]', '[\"Chattogram\"]', 'Client ke price share kora hoyeche, client kon update janay ni', 'inactive', '2026-06-25 04:19:50', '2026-06-25 06:12:23'),
(64, 'Ibrahim', 'Proprietor', 59, NULL, NULL, 55, 'personal', '[\"01891155231\"]', '[\"Faridganj Chadpur\"]', NULL, 'inactive', '2026-06-25 05:07:20', '2026-06-25 06:50:00'),
(65, 'Akib Hossain Labib', 'User', NULL, NULL, NULL, 53, 'personal', '[\"01957780890\"]', '[\"Old Dhaka\"]', NULL, 'inactive', '2026-06-25 05:13:11', '2026-06-25 06:12:20'),
(66, 'Hridoy Cable Network', NULL, NULL, NULL, NULL, 56, 'personal', '[\"01641386137\"]', '[]', NULL, 'inactive', '2026-06-25 05:46:42', '2026-06-25 07:50:50'),
(67, 'Mohammad Mominul Alam (Razib)', 'Partnet', 61, 'info@globalhaatbd.com', NULL, 53, 'reseller', '[\"01712751169\",\"01619339659\"]', '[\"145, Eastern Plus Shopping Complex, Shop-57, Level-4, Shantinagar, Dhaka-1217\"]', NULL, 'active', '2026-06-25 06:14:06', '2026-06-25 06:14:06'),
(68, 'Sardar Imran Hossain', 'Executive', 62, 'mahin@revolutiontech.com.bd', NULL, 56, 'reseller', '[\"01404078087\"]', '[\"54, Motijheel Commercial Area, Elite House 3rd Floor, Dhaka-1000, Bangladesh.\"]', NULL, 'active', '2026-06-25 06:28:51', '2026-06-25 06:28:51'),
(69, 'Soumik Shuvra Dey', 'Executive , HR & Admin', 60, 'Dey@xoin.eurofinsasia.com', NULL, 54, 'corporate', '[\"01755642005\"]', '[\"280, East Narsingahpur, Ashulia, Dhaka-1346. Savar Bangladesh.\"]', NULL, 'active', '2026-06-25 06:31:17', '2026-06-25 07:15:31'),
(70, 'Md  Hamidur Rahman', 'Senior Manager, IT', 60, 'hamidur.rahman@xoin.eurofinsasia.com', NULL, 54, 'corporate', '[\"01755642015\"]', '[\"Lab Office: 280, East Narsingahpur, Ashulia, Dhaka-1346. Savar Bangladesh.\",\"City Office: House-2\\/A (4th  floor), Road- 2B, Sec-11, Uttara-1230, Dhaka.\"]', NULL, 'active', '2026-06-25 06:38:28', '2026-06-25 06:38:28'),
(71, 'Mukul bala', 'Senior Technician', 63, NULL, NULL, 55, 'personal', '[\"01731595913\"]', '[\"Gopalganj\"]', NULL, 'inactive', '2026-06-25 06:40:51', '2026-06-25 06:40:51'),
(72, 'Md. Mynul Kabir', 'Deputy Manager', 64, 'mynul.kabir@jaago.com.bd', NULL, 56, 'corporate', '[\"01777742127\"]', '[\"House #57, Road #7\\/B, Block #H, Banani, Dhaka - 1213, Bangladesh\"]', NULL, 'active', '2026-06-25 06:50:52', '2026-06-25 06:50:52'),
(73, 'Rajib Mallick', 'Coordinator service and supply chain', 65, 'rajib@rangsemart.com.bd', NULL, 55, 'reseller', '[\"01708457504\"]', '[\"Rangs Industries Limited Rangs Bhaban (Level-6) 117\\/A, Old Airport Road Bijoy Sharani, Dhaka-1215\"]', NULL, 'active', '2026-06-25 07:03:48', '2026-06-25 07:03:48'),
(74, 'Rahul Ahammed Rabby', 'Deputy Manager, Technical Pre-Sales Enterprise Network & Security Solutions', 66, 'rahul.rabby@smartbd.com', NULL, 53, 'reseller', '[\"01938120839\"]', '[\"Dhaka\"]', NULL, 'active', '2026-06-25 07:16:19', '2026-06-25 07:16:19'),
(75, 'Masum Billah', 'User', NULL, NULL, NULL, 53, 'personal', '[\"01829684782\"]', '[\"Gulshan 1\"]', NULL, 'inactive', '2026-06-25 09:00:53', '2026-06-25 09:00:53'),
(76, 'Julquernine Nishan', 'Sr. Executive', 67, 'nishan@digitalequipment.com.bd', NULL, 56, 'reseller', '[\"01332837425\"]', '[]', NULL, 'active', '2026-06-25 10:14:53', '2026-06-25 10:14:53'),
(77, '𝑴𝒂𝒎𝒖𝒏 𝑴𝒐𝒓𝒐𝒍', NULL, NULL, NULL, NULL, 56, 'personal', '[\"01924000043\"]', '[]', NULL, 'active', '2026-06-25 10:19:16', '2026-06-25 10:19:16'),
(78, 'Md Saddam Islam', NULL, NULL, NULL, NULL, 56, 'personal', '[\"01771040592\"]', '[]', NULL, 'active', '2026-06-25 10:23:15', '2026-06-25 10:23:15'),
(79, 'Md Saddam Islam', NULL, NULL, NULL, NULL, 56, 'personal', '[\"01990251921\"]', '[]', NULL, 'active', '2026-06-25 10:25:50', '2026-06-25 10:25:50'),
(80, 'Israt', NULL, NULL, NULL, NULL, 56, 'personal', '[\"01990251921\"]', '[]', NULL, 'active', '2026-06-25 10:30:09', '2026-06-25 10:30:09'),
(81, 'Hridoy', NULL, NULL, NULL, NULL, 56, 'personal', '[\"01641386137\"]', '[]', NULL, 'active', '2026-06-25 10:32:52', '2026-06-25 10:32:52'),
(82, 'MD. AL-Hasan', 'CEO', 68, 'fix24itsolutions@gmail.com', NULL, 53, 'reseller', '[\"01700777448\",\"01855904297\"]', '[\"Level-2, Shop-124\\/1, Muktobangla Shopping Complex, Mirpur-01, Dhaka-1216.\"]', 'client ke alternative model er price share kora hoyeche. client zei model ta ceycehe oi ta ekhon available nei.', 'active', '2026-06-25 10:33:04', '2026-06-25 10:33:04'),
(83, 'Sohan Ali', NULL, NULL, NULL, NULL, 56, 'personal', '[\"01719471516\"]', '[]', NULL, 'active', '2026-06-25 10:35:01', '2026-06-25 10:35:01'),
(84, 'Amir Faysal Naeem', NULL, NULL, NULL, NULL, 56, 'personal', '[\"01615808602\"]', '[]', NULL, 'active', '2026-06-25 10:37:06', '2026-06-25 10:37:06'),
(85, 'Engr.Md.Rajib Hossain', 'Logistic Purchase Support', 69, 'mraautamationdh@gmail.com', NULL, 55, 'reseller', '[\"01773723537\"]', '[\"Sheltech Sierra Tower (4th Floor), 236 New Elephant Road Dhaka-1206\"]', NULL, 'active', '2026-06-25 10:42:46', '2026-06-25 10:52:34'),
(86, 'AK Rakib Ahamed Bhuiyan', 'CEO', 70, 'knighttechnologiesbd@gmail.com', NULL, 55, 'reseller', '[\"01619353738\"]', '[\"24, Elephant Road (Ground Floor) Dhaka-1205.\"]', NULL, 'active', '2026-06-25 10:50:13', '2026-06-25 10:50:13'),
(87, 'Noman', 'User', NULL, NULL, NULL, 53, 'personal', '[\"01521216595\"]', '[\"Sirajgonj\"]', 'client ke price share kora hoyeche.', 'inactive', '2026-06-25 10:53:55', '2026-06-25 10:53:55'),
(88, 'Md. Jahirul Islam', 'Founder & CEO', 71, 'jahir@techzonebd.com', NULL, 56, 'reseller', '[\"01673789145\"]', '[]', NULL, 'active', '2026-06-25 11:24:44', '2026-06-25 11:24:44'),
(89, 'Md Arifuzzaman', 'Purchase Manager', 72, 'purchase@grandsylhet.com', NULL, 54, 'corporate', '[\"01321201581\"]', '[\"Boroshala, Khadimnogor Union Parishad, Airport Road, Sylhet Sodor.\"]', NULL, 'active', '2026-06-25 12:18:29', '2026-06-25 12:18:29'),
(90, 'Md Juel Rana', 'First Senior Deputy Asst. Director, Sourcing Purchase.', 73, 'wdc.scm-purchase4@waltonbd.com', NULL, 54, 'corporate', '[\"01608985702\"]', '[\"Chandra, Kaliakoir, Gazipur.\"]', NULL, 'active', '2026-06-25 12:27:52', '2026-06-25 12:27:52'),
(91, 'Md Ariful Islam', 'Assistant Manager, IT', 74, 'arifulislam@rancon.com.bd', NULL, 54, 'corporate', '[\"01730706987\"]', '[\"387, Tejgaon Industrial Area, Dhaka 1215.\",\"Tejgaon Industrial Area, Dhaka 1208.\"]', NULL, 'active', '2026-06-25 12:30:47', '2026-06-25 12:30:47'),
(92, 'A. T. M. Masud', 'Asst. Manager, C & M', 75, 'atmmasud@bifpcl.com', NULL, 54, 'corporate', '[\"01329667502\"]', '[\"Unique Heights (Borak), Level-17, 117, Kazi Nazrul Islam Avenue, Eskaton Garden, Dhaka-1000.\"]', NULL, 'active', '2026-06-25 12:36:31', '2026-06-25 12:36:31'),
(93, 'Reza Redwanul Islam Rakin', 'IT Business Partner', 76, 'rezar@aosmith.com', NULL, 54, 'corporate', '[\"01717100100\"]', '[\"4th Floor, Unit-A, 246, Rangs Babylonia, 1208 Bir Uttam Mir Shawkat Sarak, Dhaka 1208.\"]', NULL, 'active', '2026-06-25 12:40:06', '2026-06-25 12:40:06'),
(94, 'Irfan Ahmed', 'Service Delivery Coordinator, IT', 76, 'irfana@aosmith.com', NULL, 54, 'corporate', '[\"01322806888\"]', '[\"4th Floor, Unit-A, 246, Rangs Babylonia, 1208 Bir Uttam Mir Shawkat Sarak, Dhaka 1208.\"]', NULL, 'active', '2026-06-25 12:42:19', '2026-06-25 12:42:19'),
(95, 'Md Musabbir Hossain', 'Senior Officer Officer, SCM', 77, 'scml@scclbd.com', NULL, 54, 'corporate', '[\"01799992813\"]', '[\"T.K Bhaban (8th & 9th Floor), 13 Kawran Bazar, Dhaka-1215.\"]', NULL, 'active', '2026-06-25 12:44:27', '2026-06-25 12:44:27'),
(96, 'Emon Naim', NULL, NULL, NULL, NULL, 55, 'personal', '[\"01911835458\"]', '[\"Norail Sadar\"]', NULL, 'inactive', '2026-06-27 07:15:33', '2026-06-27 07:17:40'),
(97, 'Md.Elias Hossain Khan', 'Owner', 78, 'sb.eliaskhan@gmail.com', NULL, 55, 'reseller', '[\"01713474328\"]', '[\"35 South Avenue AWR Usman Tower Shop#2 Gulshan-1, Dhaka-1212\"]', NULL, 'active', '2026-06-27 07:23:08', '2026-06-27 07:23:08'),
(98, 'Ad Dawah institute', NULL, NULL, NULL, NULL, 54, 'personal', '[\"01575829295\"]', '[]', NULL, 'inactive', '2026-06-27 08:44:46', '2026-06-27 08:44:54'),
(99, 'Shakil', NULL, NULL, NULL, NULL, 55, 'personal', '[\"01791111888\"]', '[\"Uttara\"]', NULL, 'inactive', '2026-06-27 08:46:20', '2026-06-27 08:46:20'),
(100, 'Md Riashat Azim', 'Director', 79, 'riashat@email.com', NULL, 54, 'reseller', '[\"01713078166\"]', '[\"Road 21, House 133-B, Mohakhali DOHS, Dhaka-1207, Bangladesh.\"]', NULL, 'active', '2026-06-27 09:21:20', '2026-06-27 09:21:20'),
(101, 'Saifur Rahman Bhuiyan', 'Director', 80, 'saifur2004@gmail.com', NULL, 54, 'corporate', '[\"01711590078\",\"01711596492\"]', '[\"6, Motijheel C\\/A, 7th Floor, Dhaka-1000.\",\"Baro Bhuiyan, Road-49, Plot-3A, Level-12, Kamal Ataturk\\nAvenue, Gulshan-2, Dhaka-1212.\"]', NULL, 'active', '2026-06-27 09:32:04', '2026-06-27 09:32:04'),
(102, 'Md. Bikash Chowdhury', 'Chief Engineer', 81, 'bkash2222@gmail.com', NULL, 55, 'reseller', '[\"01712824328\"]', '[\"Shop No #339, 3rd Floor Aloka Nodi Bangla Complex Mymensingh\"]', NULL, 'inactive', '2026-06-27 09:50:53', '2026-06-27 09:50:53'),
(103, 'Anis', NULL, NULL, NULL, NULL, 54, 'personal', '[\"01332986232\"]', '[]', NULL, 'inactive', '2026-06-27 10:00:40', '2026-06-27 10:00:40'),
(104, 'Md Mustafa Sarwar', 'General Manager, Business Development', 83, 'blockbsolutionsbd@gmail.com', NULL, 54, 'reseller', '[\"01711574194\",\"01674907432\",\"01401288820\"]', '[\"Suite 5\\/E, Level-05, Azmiri Probal Towe 45, Ring Road, Adabar, Dhaka-1207, Bangladesh\"]', NULL, 'active', '2026-06-27 10:20:28', '2026-06-27 10:20:28'),
(105, 'Mohammad Sohel', 'Founder and CEO', 84, 'info.bistainfra@gmail.com', NULL, 54, 'reseller', '[\"01970013534\"]', '[\"1st Floor, Hoous-12, Road-9, Sector-1, Block-F, Aftabnagar, Dhaka-1212, Bangladesh\"]', NULL, 'inactive', '2026-06-27 11:30:09', '2026-06-27 11:30:09'),
(106, 'Saddam Shohag', NULL, NULL, NULL, NULL, 55, 'personal', '[\"01571005155\"]', '[]', NULL, 'inactive', '2026-06-27 11:31:10', '2026-06-27 11:31:10'),
(107, 'Md. Shariful Hassan', 'CEO', 85, 'msgtohassan@gmail.com', NULL, 55, 'reseller', '[\"01743932725\"]', '[\"117\\/2\\/2 Bhuiyan Mansion (Level-06), KM, Das Lane, Tikatuli, Dhaka-1203\"]', NULL, 'active', '2026-06-27 11:50:19', '2026-06-27 11:50:19'),
(108, 'Maskur Makib Asif', 'GP Ops', 92, 'asifmaskur@chevron.com', NULL, 54, 'corporate', '[\"01918312097\",\"01332986232\"]', '[\"Jalalabad gas field in Block 13. Situated in Lakkatura, Sylhet.\"]', NULL, 'active', '2026-06-27 11:52:23', '2026-06-28 07:24:33'),
(109, 'Sumon', 'Owner', 86, NULL, NULL, 55, 'personal', '[\"01735218554\"]', '[]', NULL, 'inactive', '2026-06-27 12:06:14', '2026-06-27 12:06:14'),
(110, 'Najmul Islam', NULL, 87, NULL, NULL, 55, 'personal', '[\"01920792354\"]', '[]', NULL, 'inactive', '2026-06-27 12:12:11', '2026-06-27 12:12:11'),
(111, 'Sumon Sikdar', NULL, 88, NULL, NULL, 55, 'personal', '[\"01999635054\"]', '[\"Amir Kal Super Market (3rd Floor) Siraj di khan Munshigonj\"]', NULL, 'inactive', '2026-06-27 12:39:50', '2026-06-27 12:39:50'),
(112, 'Md. Shohag Sikder', 'Proprietor', 89, 'imsbd2000@gmail.com', NULL, 53, 'reseller', '[\"01947475766\",\"01815247310\"]', '[\"House # 26, Road # 09, PC Culture Housing, Shakertek, Adabor, Dhaka-1207, Bangladesh\"]', NULL, 'active', '2026-06-28 04:27:33', '2026-06-28 04:27:33'),
(113, 'Md. Ariful Islam Piyash', NULL, NULL, NULL, NULL, 53, 'personal', '[\"01601701501\"]', '[\"narayanganj\"]', NULL, 'active', '2026-06-28 04:32:37', '2026-06-28 04:32:37'),
(114, 'Abdullah Al Arman', 'Executive', 90, 'arman@corporatestationbd.com', NULL, 55, 'reseller', '[\"01329692778\"]', '[\"Level-4, House: 339\\/B, Khilgaon, Dhaka-1219 Bangladesh\"]', NULL, 'active', '2026-06-28 04:43:29', '2026-06-28 04:43:29'),
(115, 'Mst. Selina Akter (Swin)', 'Director', 91, 'sts.mktg23@gmail.com', NULL, 55, 'reseller', '[\"01323140192\"]', '[\"218, Sahera Tropical Centre Level #14, Suite No #1403-A Elephant Road (Bata Signal), Dhaka-1205\"]', NULL, 'inactive', '2026-06-28 04:51:59', '2026-06-28 04:51:59'),
(116, 'Abdullah', 'User', NULL, NULL, NULL, 53, 'personal', '[\"01711637007\"]', '[\"Bogura\"]', 'Client just come for asking price.', 'inactive', '2026-06-28 04:54:38', '2026-06-28 06:19:11'),
(117, 'Nadim', 'User', NULL, NULL, NULL, 53, 'personal', '[\"01611102002\"]', '[\"Dhaka\"]', NULL, 'inactive', '2026-06-28 06:24:23', '2026-06-28 06:26:08'),
(118, 'Main Uddin Bhuiyan', 'Senior Executive (Supply Chain Department)', 90, 'mainuddin@corporatestationbd.com', NULL, 53, 'reseller', '[\"01315662765\"]', '[\"Level-4, House: 339\\/B, Khilgaon, Dhaka-1219 Bangladesh\"]', NULL, 'active', '2026-06-28 06:33:45', '2026-06-28 06:33:45'),
(119, 'Md. Minhaj Hossain (Golap)', 'Asst. Head (Management & Sales)', 93, 'scit.info2021@gmail.com', NULL, 53, 'reseller', '[\"01773777088\"]', '[\"Shop No. 446, 3rd Floor, Shopnochura Plaza Kadirgonj, Rajshahi-6000, Bangladesh\"]', 'Client ektu server er reqirment diyeche, client ke office e invite korechi.', 'active', '2026-06-28 08:42:21', '2026-06-28 08:42:21'),
(120, 'Sumon Voumik', 'Owner', 94, NULL, NULL, 55, 'personal', '[\"01817181139\"]', '[\"Mirpur Shewrapara\"]', NULL, 'inactive', '2026-06-28 08:44:46', '2026-06-28 08:44:46'),
(121, 'Mohammad Jane Alam (Lito)', 'Proprietor', 82, 'mdskuddn8@gmail.com', NULL, 55, 'reseller', '[\"01878278880\"]', '[\"44 No Nazir Ahmed Chy, Road, Andharkilla, Chittagong, Bangladesh\"]', NULL, 'inactive', '2026-06-28 09:53:47', '2026-06-28 09:53:47'),
(122, 'Rakib Haider', 'Proprietor', 95, 'rakibfuture@yahoo.com', NULL, 53, 'reseller', '[\"01713484330\"]', '[\"Showkat Ali Talukder (Capsule), Poura Super Market (1st Floor), Victoria Road, Tangail-1900, Bangladesh\"]', 'Client ke price share kora hoyeche. client ekhon kon update janayni.', 'active', '2026-06-28 09:59:05', '2026-06-28 09:59:05'),
(123, 'Md. Sakawat Hossain (Sohel)', 'Proprietor', 96, 'ajmirenterprise23@gmail.com', NULL, 55, 'reseller', '[\"01812837587\"]', '[\"2551\\/C, Basa Mia Road, West Nasirabad, Pahartali Chittagong\"]', NULL, 'inactive', '2026-06-28 10:29:07', '2026-06-28 10:29:07'),
(124, 'Biplob', NULL, NULL, NULL, NULL, 55, 'personal', '[\"01789840478\"]', '[]', NULL, 'inactive', '2026-06-28 10:32:45', '2026-06-28 10:32:45'),
(125, 'kashem', NULL, NULL, NULL, NULL, 56, 'personal', '[\"01671169216\"]', '[]', NULL, 'active', '2026-06-28 10:42:53', '2026-06-28 10:42:53'),
(126, 'Engr. Hasibul Alam', 'Manager (System DPT)', 97, 'gloryofficesolutionbd@gmail.com', NULL, 53, 'reseller', '[\"01623762746\"]', '[\"67 Motijheel B\\/A, Dhaka 1000\"]', 'Client price share kora hoyeche.', 'active', '2026-06-28 10:48:49', '2026-06-28 10:48:49'),
(127, 'Ridoy Dey', NULL, NULL, NULL, NULL, 56, 'personal', '[\"01812252884\"]', '[]', NULL, 'active', '2026-06-28 10:48:51', '2026-06-28 10:48:51'),
(128, 'Selina Akter Swin', 'Directon', 91, 'sts.mktg23@gamil.com', NULL, 56, 'reseller', '[\"01323140192\"]', '[]', NULL, 'active', '2026-06-28 11:07:12', '2026-06-28 11:07:12'),
(129, 'Amdadul Haque', 'marketing officer', 99, 'info@comptech.solution', NULL, 56, 'reseller', '[\"01608686440\"]', '[]', NULL, 'active', '2026-06-28 11:10:31', '2026-06-28 11:10:31'),
(130, 'MD Ahiduzzaman', NULL, NULL, NULL, NULL, 56, 'personal', '[\"01791925027\"]', '[]', NULL, 'active', '2026-06-28 11:24:25', '2026-06-28 11:24:25'),
(131, 'Shawon Morshedul', NULL, NULL, NULL, NULL, 56, 'personal', '[\"01627609492\"]', '[]', NULL, 'active', '2026-06-28 11:26:35', '2026-06-28 11:26:35'),
(132, 'Shaded', NULL, NULL, NULL, NULL, 56, 'personal', '[\"01726315430\"]', '[]', NULL, 'active', '2026-06-28 11:29:30', '2026-06-28 11:29:30'),
(133, 'Ruhul amin', 'Manager', 100, 'dignityitbd@gamil.com', NULL, 56, 'reseller', '[\"01817071072\"]', '[]', NULL, 'active', '2026-06-28 11:33:08', '2026-06-28 11:33:08'),
(134, 'Prince Sarker', 'Assistant Manager', 102, 'prince.sarker@1000fix.com', NULL, 56, 'corporate', '[\"01332519938\"]', '[]', NULL, 'active', '2026-06-28 12:28:34', '2026-06-28 12:28:34'),
(135, 'Md. Tofazzal Hossain', 'Manager (Marketing & Sales)', 101, 'msolutionbd@yahoo.com', NULL, 53, 'reseller', '[\"01672407105\"]', '[\"Chittagong Computer City, RF Johura Tower (2nd Floor), Shop No. # 303, 1401, Sk Mujib Road, Chowmuhani, Agrabad, Chattogram-4100, Bangladesh\"]', 'Client price share kora hoyeche, and lead time o janano hoyeche.', 'active', '2026-06-28 12:29:21', '2026-06-28 12:29:21'),
(136, 'Sunbeam Husayn Jihad', NULL, NULL, NULL, NULL, 55, 'personal', '[\"01734430594\"]', '[]', NULL, 'inactive', '2026-06-29 05:19:16', '2026-06-29 05:19:16'),
(137, 'Md. Ashrafuzzaman Razib', 'Manager (HR, Admin & Compliance)', 103, 'sma.razib@gmail.com', NULL, 53, 'corporate', '[\"01725358877\"]', '[\"RS-903, Shasongoan, Enayetnagar, Fatullah, Narayanganj-1400\"]', NULL, 'active', '2026-06-29 05:21:03', '2026-06-29 05:21:03'),
(138, 'Md.Maruful Islam', 'Manager SCM', 104, 'scm@optimal.com.bd', NULL, 55, 'reseller', '[\"01973432334\"]', '[\"Sagufta De Nawar-1, Level-3-4, 136\\/Ta Gulshan-Badda Link Road, Dhaka-1212\"]', NULL, 'active', '2026-06-29 05:31:29', '2026-06-29 05:31:29'),
(139, 'Md. Belayet Hossain Nijhum', 'General Manager', 105, 'belayet.hossain@rphgroupbd.com', NULL, 56, 'corporate', '[\"01324736172\"]', '[]', NULL, 'active', '2026-06-29 06:20:28', '2026-06-29 06:20:28'),
(140, 'Shofiqul', 'User', NULL, NULL, NULL, 53, 'personal', '[\"01719581576\"]', '[]', NULL, 'active', '2026-06-29 06:40:18', '2026-06-29 06:40:18'),
(141, 'Smmasud Khan', 'User', NULL, NULL, NULL, 53, 'personal', '[\"01706237503\"]', '[]', NULL, 'active', '2026-06-29 07:56:16', '2026-06-29 07:56:16'),
(142, 'Lt Cdr Tanvir Ahmad', 'Lieutenant Commander', 106, 'dlokbwf25@gmail.com', NULL, 55, 'personal', '[\"01727528625\"]', '[\"New mooring Chattogram\"]', NULL, 'inactive', '2026-06-29 08:58:11', '2026-06-29 08:58:11'),
(143, 'Md.Arif hossain', 'LCPL', 107, 'none@mail.com', NULL, 53, 'corporate', '[\"01769094466\"]', '[\"Savar Cantonment\"]', NULL, 'active', '2026-06-29 09:22:53', '2026-06-29 09:22:53');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `follow_ups`
--

CREATE TABLE `follow_ups` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `requirement_id` bigint(20) UNSIGNED DEFAULT NULL,
  `follow_up_date` datetime NOT NULL,
  `notes` text DEFAULT NULL,
  `status` enum('pending','done') NOT NULL DEFAULT 'pending',
  `priority` enum('high','medium','low') NOT NULL DEFAULT 'medium',
  `completed_at` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `follow_ups`
--

INSERT INTO `follow_ups` (`id`, `customer_id`, `user_id`, `requirement_id`, `follow_up_date`, `notes`, `status`, `priority`, `completed_at`, `created_at`, `updated_at`) VALUES
(3, 62, 54, 11, '2026-06-29 11:00:00', 'next week, monday approx', 'pending', 'medium', NULL, '2026-06-25 09:06:04', '2026-06-25 09:06:04'),
(4, 74, 53, NULL, '2026-07-26 11:00:00', 'Client ke price diyechi, oni july er last week e update janabe.', 'pending', 'medium', NULL, '2026-06-25 09:48:35', '2026-06-25 09:48:35'),
(5, 75, 53, NULL, '2026-06-27 12:00:00', NULL, 'pending', 'medium', NULL, '2026-06-25 10:58:08', '2026-06-25 10:58:08'),
(6, 69, 54, 19, '2026-06-29 11:15:00', NULL, 'pending', 'medium', NULL, '2026-06-25 11:53:07', '2026-06-25 11:53:07'),
(7, 61, 54, 10, '2026-07-01 11:00:00', NULL, 'pending', 'high', NULL, '2026-06-25 12:14:44', '2026-06-25 12:14:44'),
(9, 85, 55, 30, '2026-06-30 14:49:00', NULL, 'pending', 'medium', NULL, '2026-06-27 08:49:16', '2026-06-27 08:49:48'),
(10, 98, 54, 38, '2026-06-28 10:00:00', NULL, 'done', 'medium', '2026-06-28 04:31:21', '2026-06-27 08:52:23', '2026-06-28 04:31:21'),
(11, 101, 54, 40, '2026-06-28 10:10:00', NULL, 'done', 'medium', '2026-06-28 04:38:14', '2026-06-27 09:38:35', '2026-06-28 04:38:14'),
(12, 108, 54, 48, '2026-06-28 10:15:00', NULL, 'done', 'medium', '2026-06-28 04:43:51', '2026-06-27 11:59:03', '2026-06-28 04:43:51'),
(14, 76, 56, 21, '2026-07-01 12:59:00', NULL, 'pending', 'medium', NULL, '2026-06-28 06:59:52', '2026-06-28 06:59:52'),
(15, 68, 56, 16, '2026-06-28 13:03:00', NULL, 'done', 'medium', '2026-06-28 07:04:35', '2026-06-28 07:03:38', '2026-06-28 07:04:35'),
(16, 66, 56, 14, '2026-06-28 13:06:00', NULL, 'done', 'medium', '2026-06-28 07:07:17', '2026-06-28 07:06:34', '2026-06-28 07:07:17'),
(17, 108, 54, 48, '2026-06-29 10:00:00', NULL, 'done', 'medium', '2026-06-29 06:47:45', '2026-06-28 08:32:08', '2026-06-29 06:47:45'),
(18, 121, 55, 58, '2026-07-04 16:00:00', NULL, 'pending', 'medium', NULL, '2026-06-28 10:00:41', '2026-06-28 10:00:41'),
(19, 123, 55, NULL, '2026-07-04 16:35:00', NULL, 'pending', 'medium', NULL, '2026-06-28 10:35:49', '2026-06-28 10:35:49'),
(20, 129, 56, 66, '2026-06-30 17:12:00', NULL, 'pending', 'medium', NULL, '2026-06-28 11:12:19', '2026-06-28 11:12:19'),
(21, 132, 56, 69, '2026-06-30 17:30:00', NULL, 'pending', 'medium', NULL, '2026-06-28 11:30:56', '2026-06-28 11:30:56'),
(22, 139, 56, 76, '2026-07-01 12:38:00', NULL, 'pending', 'medium', NULL, '2026-06-29 06:38:49', '2026-06-29 06:38:49'),
(23, 134, 56, 71, '2026-07-01 12:53:00', NULL, 'pending', 'medium', NULL, '2026-06-29 06:53:49', '2026-06-29 06:53:49');

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `meetings`
--

CREATE TABLE `meetings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `requirement_id` bigint(20) UNSIGNED DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `scheduled_at` datetime DEFAULT NULL,
  `meeting_type` enum('physical','virtual','phone') NOT NULL DEFAULT 'physical',
  `location` varchar(255) DEFAULT NULL,
  `agenda` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `status` enum('scheduled','completed','cancelled') NOT NULL DEFAULT 'scheduled',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_08_14_170933_add_two_factor_columns_to_users_table', 1),
(5, '2026_02_25_093507_create_companies_table', 1),
(6, '2026_02_25_093509_create_customers_table', 1),
(7, '2026_02_25_093512_create_units_table', 1),
(8, '2026_02_25_093513_create_products_table', 1),
(9, '2026_02_25_093518_create_requirements_table', 1),
(10, '2026_02_25_093519_create_requirement_items_table', 1),
(11, '2026_02_25_093522_create_follow_ups_table', 1),
(12, '2026_02_25_093526_create_meetings_table', 1),
(13, '2026_04_26_110841_create_sales_table', 1),
(14, '2026_06_03_073544_create_requirement_accessories_table', 1),
(15, '2026_06_03_073545_create_requirement_installations_table', 1),
(16, '2026_06_03_073545_migrate_requirement_service_data', 1),
(17, '2026_06_03_073545_remove_service_columns_from_requirements_table', 1),
(18, '2026_06_04_050720_create_settings_table', 1),
(19, '2026_06_10_000001_add_user_id_to_requirements_table', 1),
(20, '2026_06_20_061347_add_costing_price_to_products_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `stock_quantity` int(11) NOT NULL DEFAULT 0,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `costing_price` decimal(12,2) DEFAULT 0.00,
  `supplier_name` varchar(255) DEFAULT NULL,
  `unit_id` bigint(20) UNSIGNED DEFAULT NULL,
  `source` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `category`, `stock_quantity`, `unit_price`, `costing_price`, `supplier_name`, `unit_id`, `source`, `created_at`, `updated_at`) VALUES
(1, 'Cat6 Network Cable', 'asdasd', 'Cable', 50, 15000.00, 8000.00, 'asdfa', 1, 'asdasd', '2026-06-20 04:17:29', '2026-06-21 03:00:40'),
(2, '24 Port Gigabit Switch', NULL, 'Switch', 20, 35000.00, 30000.00, NULL, 1, NULL, '2026-06-20 04:17:29', '2026-06-20 04:17:29'),
(3, 'Optical Fiber Patch Cord', NULL, 'Accessories', 100, 1200.00, 1000.00, NULL, 1, NULL, '2026-06-20 04:17:29', '2026-06-20 04:17:29'),
(4, 'pariatur et debitis', 'Perferendis laudantium doloribus repellat non rerum.', 'Switch', 96, 9434.09, 4297.42, 'Donnelly LLC', 4, 'Et cum voluptatibus culpa quis aspernatur architecto. Consequatur sint autem saepe assumenda nemo nisi. Aut esse delectus et ducimus.', '2026-06-20 04:17:29', '2026-06-21 00:38:10'),
(5, 'natus dolorem reiciendis', 'Vel distinctio et ducimus.', 'Cable', 64, 6939.21, 3251.77, 'Hodkiewicz Group', 1, 'Temporibus qui amet totam rem. Fuga distinctio eos odit magnam mollitia non dolores libero. Et porro recusandae suscipit.', '2026-06-20 04:17:29', '2026-06-21 01:26:14'),
(6, 'qui iure ad', 'Quis ut omnis quisquam quia dolorem.', 'Switch', 25, 7889.93, 3834.76, 'Mraz-Jerde', 4, 'Dolorum est et vel error repudiandae. Quia voluptatum quos voluptate. Quas autem alias qui. Nemo inventore atque repellat cum aliquam sunt amet quae.', '2026-06-20 04:17:29', '2026-06-21 00:03:57'),
(7, 'debitis mollitia consequatur', 'Eos sit aut eligendi ullam ab laudantium.', 'Electronics', 55, 795.90, 1886.21, 'Mitchell-O\'Keefe', 10, 'Voluptas sint ad provident corporis rerum cumque. Cum pariatur enim dolore et quisquam. Libero deserunt qui repudiandae. Impedit dolorum ut rerum unde tempore amet ut.', '2026-06-20 04:17:29', '2026-06-20 04:17:29'),
(8, 'debitis eius similique', 'Animi quaerat ullam ut voluptatem.', 'Switch', 43, 4461.97, 802.29, 'McKenzie, Hills and Rau', 9, 'Temporibus provident deleniti soluta ipsa fuga omnis. Aliquam rerum illo et eos. Dolores nesciunt adipisci molestiae ipsa.', '2026-06-20 04:17:29', '2026-06-20 04:17:29'),
(9, 'nisi officia aliquid', 'Fuga velit laudantium natus voluptatem mollitia tenetur.', 'Accessories', 89, 8456.17, 939.44, 'Maggio, Harvey and Hirthe', 10, 'Voluptates odio hic vel assumenda quia omnis. Perspiciatis illum vero recusandae suscipit provident ad qui.', '2026-06-20 04:17:29', '2026-06-20 04:17:29'),
(10, 'iste est a', 'Optio vitae atque non amet vero voluptatem.', 'Switch', 16, 562.57, 1131.16, 'Kohler, Bradtke and Altenwerth', 11, 'Excepturi ratione corrupti officia harum quidem et voluptas. Et quidem iure ipsum officia aperiam. Debitis dolorem quaerat sit est commodi aliquam qui.', '2026-06-20 04:17:29', '2026-06-20 04:17:29'),
(11, 'enim et nihil', 'Provident in quis error dolor.', 'Switch', 22, 6474.73, 1461.19, 'Gleason, O\'Reilly and Labadie', 5, 'Voluptatem autem quo eius a inventore. Nam tempore molestias enim nihil et aut non. Modi provident optio optio ea aut officiis.', '2026-06-20 04:17:29', '2026-06-20 04:17:29'),
(12, 'itaque et cumque', 'Ex ullam ut quasi omnis dolore amet.', 'Cable', 56, 111.88, 2487.95, 'Lakin, Wilkinson and Ryan', 1, 'Atque officia quis id non enim maxime quam. Distinctio optio itaque sit aut ratione consequatur. Nisi sed sed blanditiis consequatur. Eveniet ex natus vel dolores qui et.', '2026-06-20 04:17:29', '2026-06-20 04:17:29'),
(13, 'a tenetur quidem', 'Necessitatibus distinctio laboriosam itaque doloremque.', 'Switch', 56, 1546.71, 1375.69, 'Schamberger, Anderson and Kshlerin', 10, 'Eveniet molestias aliquid ea provident et minima. Impedit et provident minima ut non.', '2026-06-20 04:17:29', '2026-06-20 04:17:29'),
(14, 'aut non excepturi', 'Qui maxime amet similique provident nesciunt.', 'Electronics', 24, 342.37, 2754.36, 'Koch-Maggio', 6, 'Adipisci unde nobis sed soluta debitis. Corrupti voluptatem nesciunt possimus quam eius ut. Facere laboriosam praesentium ex enim omnis enim alias. Et dolorem est quos aut.', '2026-06-20 04:17:29', '2026-06-20 04:17:29'),
(15, 'eum maxime sequi', 'Consequatur quidem blanditiis tempora dolores voluptatem reprehenderit.', 'Switch', 55, 2423.31, 4989.37, 'Brown, Littel and Lindgren', 11, 'Officiis aut esse dolorem et sunt repellat. Et et quisquam et asperiores. Non ullam vero culpa ut aut perspiciatis quia. Voluptas et doloremque necessitatibus sint quas.', '2026-06-20 04:17:29', '2026-06-20 04:17:29'),
(16, 'qui sint dicta', 'Voluptates aliquam ab id maxime aut unde vitae vero.', 'Accessories', 13, 159.09, 885.61, 'Weber and Sons', 9, 'Vitae porro eaque ut eius officia et. Magni et magni optio. Esse dolor est amet ratione dolores. Dolor et eius et vel.', '2026-06-20 04:17:29', '2026-06-20 04:17:29'),
(17, 'quis nisi est', 'Maiores commodi et ipsum velit animi.', 'Cable', 52, 4592.87, 6409.17, 'Mitchell Ltd', 3, 'Ipsam sed id quam saepe impedit alias qui vero. Magnam eligendi quaerat illo deserunt blanditiis nihil. Veniam consequuntur non in.', '2026-06-20 04:17:29', '2026-06-20 04:17:29'),
(18, 'cumque optio voluptate', 'Perferendis consequatur nihil placeat omnis.', 'Switch', 37, 7563.13, 1357.12, 'Dibbert, Barrows and Olson', 10, 'Distinctio consequatur voluptate voluptate. Nostrum consequatur reiciendis et voluptas deserunt quis. Culpa animi iure qui architecto asperiores voluptas dolorem.', '2026-06-20 04:17:29', '2026-06-20 04:17:29'),
(19, 'est omnis debitis', 'Sed doloremque reprehenderit nostrum nulla doloremque sit sed et.', 'Electronics', 63, 7025.27, 3381.79, 'Bogisich-Ferry', 3, 'At voluptatem magni fugit ea sed ex. Est sint ex sequi itaque optio id corrupti aliquam. Animi minus debitis qui unde a sit delectus.', '2026-06-20 04:17:29', '2026-06-20 04:17:29'),
(20, 'fugit neque dolore', 'Omnis consequatur est ut pariatur dolores.', 'Accessories', 22, 8444.36, 6584.75, 'Grimes-O\'Conner', 5, 'Velit soluta ea maxime excepturi et. Error quo velit repudiandae ab ad. Aut est possimus vero culpa id.', '2026-06-20 04:17:29', '2026-06-20 04:17:29'),
(21, 'omnis esse aut', 'Delectus quaerat occaecati et autem.', 'Switch', 74, 7665.66, 7324.28, 'Lang, Wehner and Bins', 8, 'In dolores et est. Dolor tempora quis ut recusandae. Cupiditate magnam officia eaque aspernatur odio quas quam.', '2026-06-20 04:17:29', '2026-06-20 04:17:29'),
(22, 'et quis esse', 'Non animi aut doloremque.', 'Electronics', 24, 792.15, 5998.83, 'Kassulke Ltd', 3, 'Aut sed sit totam quis sit quis qui. Nihil maiores natus aut consequatur sint sunt perspiciatis. In a et aut a. Sequi quos tenetur ut sint nam consequatur in.', '2026-06-20 04:17:29', '2026-06-20 04:17:29'),
(23, 'dignissimos perferendis qui', 'Sequi eum modi omnis tempore ut quo.', 'Electronics', 65, 654.95, 4110.38, 'Donnelly, Torphy and Kreiger', 5, 'Eaque est qui sunt in in qui ratione. Qui ab nulla veniam. Repellendus adipisci fugit eum nihil perferendis. Nesciunt et qui qui laboriosam voluptas qui recusandae fugiat. Mollitia nihil itaque accusantium aut nostrum dolorem dolor.', '2026-06-20 04:17:29', '2026-06-20 04:17:29'),
(24, 'sdfg', NULL, 'sdfg', 50, 8000.00, 5000.00, NULL, 4, NULL, '2026-06-22 00:18:26', '2026-06-22 00:18:26'),
(25, 'Cicso Cat6  Cable', NULL, 'Network Cable', 49998, 20000.00, 15000.00, 'Abul', 3, '01700000000', '2026-06-23 08:29:36', '2026-06-23 09:56:09'),
(26, 'test by sahos', NULL, NULL, 50, 120.00, 100.00, NULL, 1, NULL, '2026-06-23 08:35:22', '2026-06-23 08:35:22'),
(27, 'test by sahos 2', NULL, NULL, 50, 250.00, 200.00, NULL, 4, NULL, '2026-06-23 08:37:15', '2026-06-23 08:37:15'),
(28, 'test sahos 3', NULL, NULL, 500, NULL, 50.00, NULL, 5, NULL, '2026-06-23 08:38:04', '2026-06-23 08:38:04'),
(29, 'sahos test 6', NULL, NULL, 20, NULL, NULL, NULL, 3, NULL, '2026-06-23 09:01:46', '2026-06-23 09:01:46'),
(30, 'Vivanco Cat6 Cable', NULL, 'Network Cable', 49900, NULL, NULL, NULL, 3, NULL, '2026-06-23 09:10:40', '2026-06-23 09:56:09'),
(31, 'Cisco Cat6 Cable (305)', NULL, 'Network Cable', 600000, NULL, NULL, NULL, 8, NULL, '2026-06-23 11:26:12', '2026-06-23 11:26:12'),
(32, 'tftyutyuyjyujghjhgjhg', NULL, NULL, 50000, NULL, NULL, NULL, 2, NULL, '2026-06-23 12:03:35', '2026-06-23 12:03:35'),
(33, 'Jabra Speak 510 Speakerphone Audio Conference', 'Warranty: 2 years', NULL, 49999, 14500.00, 14000.00, NULL, 1, NULL, '2026-06-23 13:49:06', '2026-06-23 14:29:45'),
(34, 'UGREEN HD104 HDMI Cable 20M', 'Warranty: 1 year', NULL, 4999, 5000.00, 4700.00, NULL, 1, NULL, '2026-06-23 13:54:28', '2026-06-23 14:29:45'),
(35, 'A4TECH FB35CS Fstyler Silent Click Rechargeable Wireless Mouse', 'Warranty: 1 year', NULL, 49985, 1500.00, 1400.00, NULL, 1, NULL, '2026-06-23 13:55:16', '2026-06-23 14:29:45'),
(36, 'Havit ST926 USB & USB-C 20W Charger', 'Warranty: 1 year', NULL, 49990, 790.00, 690.00, NULL, 1, NULL, '2026-06-23 13:56:15', '2026-06-23 14:29:45'),
(37, 'SEWOO NBS-8580 2D Bluetooth Barcode Scanner', 'Warranty: 1 year', NULL, 49997, 9000.00, 8500.00, NULL, 1, NULL, '2026-06-23 13:57:10', '2026-06-23 14:29:45'),
(38, 'HP Laser 107w Single Function Laser Printer', 'Warranty: 1 year', NULL, 4999, 22500.00, 21500.00, NULL, 1, NULL, '2026-06-23 13:58:03', '2026-06-23 14:29:45'),
(39, 'Logitech MK220 Wireless Keyboard & Mouse Combo', 'Warranty: 1 year', NULL, 4994, 2200.00, 2000.00, NULL, 1, NULL, '2026-06-23 14:00:09', '2026-06-23 14:29:45'),
(40, 'Dell OptiPlex 3050 Power Supply 180W (Original)', 'Warranty: 1 month', NULL, 4997, 3000.00, 2800.00, NULL, 1, NULL, '2026-06-23 14:00:48', '2026-06-23 14:29:45'),
(41, 'Dell Vostro 3650 Power Supply 240W (Original)', 'Warranty: 1  month', NULL, 4997, 3000.00, 2800.00, NULL, 1, NULL, '2026-06-23 14:01:52', '2026-06-23 14:29:45'),
(42, 'Tribrer APM58 4-in-1 Optical Power Meter', 'Warranty: 1 year', NULL, 4999, 4800.00, 4600.00, NULL, 1, NULL, '2026-06-23 14:02:32', '2026-06-23 14:29:45'),
(43, 'Ubiquiti Unifi U7 Pro WiFi 7 Tri Band Access Point (WithOut POE Adapter)', 'Model: Unifi U7 Pro\nWiFi standards: Wi-Fi 7 (802.11be), Tri Band\nThroughput: Up to 9335 Mb/s Total\nPower Consumption: ≤21 W\nInterface: 1x RJ45 2.5 GbE PoE+ (30 W, 802.3at)\nWarranty: 1 Year', NULL, 49995, 26500.00, 24500.00, NULL, 1, NULL, '2026-06-23 14:45:52', '2026-06-23 14:46:46'),
(44, 'Cisco Meraki MR57 Wi-Fi Access Point', 'Warranty: 1 Year', NULL, 500000, 290000.00, 275500.00, 'Aruba Group', 1, 'WeChat', '2026-06-23 14:56:35', '2026-06-23 14:56:35'),
(45, 'SEAGATE EXOS X24 24TB 7200 RPM 512e SATA Enterprise HDD', 'Model: ST24000NM002H\nWarranty: 5 Years', NULL, 5000, 105000.00, 105000.00, 'Roni (Global)', 1, '01969-633222', '2026-06-24 09:57:59', '2026-06-24 09:57:59'),
(46, '6COM Copper SFP BIDI-SFP+-LR-27 BIDI SFP+ 1270nm-TX1330nmRX 10km DOM Simplex LC SMF Transceiver Module', NULL, NULL, 4999996, NULL, NULL, NULL, 1, NULL, '2026-06-24 11:09:21', '2026-06-24 11:17:22'),
(47, 'A4TECH OP-620D 2X Click Optical Mouse', 'Warranty: 1 Year', NULL, 49995, NULL, NULL, NULL, 1, NULL, '2026-06-24 11:10:31', '2026-06-24 11:17:22'),
(48, 'Logitech K120 USB Keyboard with Bangla', NULL, NULL, 499995, NULL, NULL, NULL, 1, NULL, '2026-06-24 11:10:52', '2026-06-24 11:17:22'),
(49, 'Logitech M221 Silent Wireless Mouse (Color Black Ash)', 'Warranty: 1 Year', NULL, 499990, NULL, NULL, NULL, 1, NULL, '2026-06-24 11:11:46', '2026-06-24 11:17:22'),
(50, 'Tribrer 4-in-1 Optical Power Meter', 'Model: APM58\nWarranty: 1 Year', NULL, 4999, NULL, NULL, NULL, 1, NULL, '2026-06-24 11:13:00', '2026-06-24 11:17:22'),
(51, 'asas', NULL, NULL, 0, NULL, NULL, NULL, 2, NULL, '2026-06-24 11:27:42', '2026-06-24 11:27:42'),
(52, 'DELL POWEREDGE R740xd2 Server', 'Chassis: 2U Rackmount server, up 24 x 3.5” SAS/SATA (HDD) + up to 8 x 2.5” SAS/SATA (SSD)2 max\nProcessor: 2 × Intel® Xeon® Platinum 8280 Processor 38.5M Cache, 2.70 GHz\nMemory: 4 × 32GB DDR4 ECC DDR4-2666\nStorage:\n	2 x Dell 240GB SSD SATA Mix Use TLC 6Gbps 512e 2.5in Drive (OS RAID 1)\n 	1 x Dell 480GB SATA SSD for (Apps and cache)\n	6 x Dell 10TB 7.2K 12G 3.5inch SAS (Data & Storage)\nRAID Controller: Dell PERC H740\nNetworking: Dual Port 10Gb SFP+ NIC (Intel X710 Recommended)\nManagement: iDRAC9 Basic\nPower: 2 × 750W Hot-Swap Power Supplies\nAccessories: Front Bezel, 2U Rail Kit, 2 × UK Power Cables\nWarranty: 1 Year', NULL, 5000, NULL, NULL, 'Diana', 12, NULL, '2026-06-24 11:52:40', '2026-06-24 11:52:40'),
(53, 'Cisco CBS350-48T-4G-EU 48 Port GE Gigabit Managed Switch', 'Model: CBS350\n48 10/100/1000 ports\n4 Gigabit SFP\nMAC table Up to 16K addresses\nRack-mountable\nWarranty: 1 Year', NULL, 50000, NULL, NULL, NULL, 1, NULL, '2026-06-24 12:53:35', '2026-06-24 12:53:35'),
(54, 'Mikrotik CCR2116-12G-4S+ 16 Core ARM CPU 10G Router', 'Model: CCR2116-12G-4S+\nArchitecture: ARM 64bit\nCPU: AL73400\nSize of RAM: 16 GB\nStorage size: 128 MB, Operating System: RouterOS (v7 only)\nWarranty: 1 Year', NULL, 60000, NULL, NULL, NULL, 1, NULL, '2026-06-24 12:54:20', '2026-06-24 12:54:20'),
(55, 'Fortinet FG-120G Fortinet Firewall', 'Brand: Fortinet\nModel No:FG 120G\nCountry of origin : USA\n\"Interface:\n1x RJ45 Console Port\n2x RJ45 HA and Management Ports\n16x GE RJ45 Ports\n4x 10GE SFP+FortiLink Slots\n8x SFP Ports\n1x USB Ports\"\nTrusted Platform Module (TPM) : Yes\nDual power supply : Yes\nAccess layer security : Yes\nFirewall Throughput (1518/512/64 byte UDP Packets): 39/39/28/Gbps\nFirewall Throughput (Packets Per Second): 42 Mbps\nMaximum Number of FortiTokens : 5000\nHigh Availability Configurations : Active-Active. Active-Passive, Clustering\nForm Factor (supports EIA/non-EIA standards): Rack Mount, 1 RU\nInternal Storage: 1 x 480 GB SSD\nLicense Type: UTP\nWarranty: 3 Years', NULL, 40000, NULL, NULL, NULL, 1, NULL, '2026-06-24 12:54:48', '2026-06-24 12:54:48'),
(56, 'Dell PowerEdge R770 Rack Server', 'Brand : Dell EMC\nModel No: PowerEdge R770 (Latest 16 Generation)\nCountry of origin: USA\nChassis Configuration: 2.5\" Chassis with up to 24 Drives (16 SAS4/SATA + 8 NVMe Direct), Front PERC 12 (H365i)\nProcessor: Intel® Xeon® 6 Performance 6515P 2.3G, 16C/32T, 24GT/s, 72M Cache, Turbo, (150W) DDR5-6400\nAdditional Processor: Intel® Xeon® 6 Performance 6515P 2.3G, 16C/32T, 24GT/s, 72M Cache, Turbo, (150W) DDR5-6400\nThermal Configuration: Heatsink for 2 CPU configuration (CPU less than 200W)\nMemory Configuration Type: Performance Optimized\nCache memory: 72MB per processor\nMemory: 128GB (4x16GB) Memory DDR5, RDIMM, 6400MT/s, Dual Rank\nRAID Configuration: C7, Unconfigured RAID for HDDs or SSDs (Mixed Drive Types Allowed)\nRAID/Internal Storage Controllers: PERC H365i Controller, Front, DCMHS\nHard Disk: 2.4TB Hard Drive SAS ISE 12Gbps 10K 512e 2.5in Hot-Plug\nSSD: 480GB SSD SATA Mixed Use 6Gbps 512e 2.5in Hot-plug AG Drive, 3 DWPD\nBIOS and Advanced System Configuration Settings: Power Saving Dell Active Power Controller\nAdvanced System Configurations: UEFI BIOS Boot Mode with GPT Partition\nFANS: PowerEdge 2U High Performance Gold Fan\nPower Supply: Dual, Fault Tolerant Redundant (1+1) Hot-Plug MHS PowerSupply,1100W MM (100-240Vac) Titanium\nPower Cords: NEMA 5-15P to C13 Wall Plug, 125 Volt, 15 AMP, 10 Feet (3m), Power Cord, North America\nPCIe Riser: Riser Config 6-1, Rear Half Length, 4x16 FH Slots (Gen5), 1x8/1x16 OCP (Gen5), 2nd OCP x16 (Gen5)\nMotherboard: PowerEdge R770 Motherboard for RTS1.2, DAO\n\"OCP 3.0 Network Adapters: Broadcom 5719 Quad Port 1GbE Base-T Adapter, OCP 3.0 NIC +Sec - 01 Pcs\nBroadcom 57412 Quad Port 10GbE Base-T adapter, OCP 3.0 NIC +Sec-01Pcs\"\nOCP 3.0 Accessories: 2 OCP - No Cable\nBezel: PowerEdge 2U Standard Bezel\nBoot Optimized Storage Cards: No BOSS card, Rear Blank\nEmbedded Systems Management: iDRAC10, Enterprise 17G (Dell Connectivity Client - Enabled 17G)\nKVM: Blank Left Ear Module\nForm Factor: ReadyRails Sliding Rails Without Cable Management Arm\nRegulatory: PowerEdge CCC, No CE Label Marking\nSupported Operating System: Microsoft Windows Server R2/2019 and 2022.2025 x64 (Includes Hyper-V), Sun Solaris 11.3, Novell, SUSE, Linux Enterprise Server, Red Hat Enterprise Linux, VMware, ESXi, Proxmox\n\"I/O Slots\nFront Ports\n• 1 x iDRAC Direct (Micro-AB USB) port\n• 1 x USB 2.0\n• 1 x VGA Rear Ports\n• 1 x Dedicated iDRAC Ethernet port\n• 1 x USB 2.0\n• 1 x USB 3.0\n• 1 x VGA\n• 1 x Serial (optional)\n• 1 x VGA (optional for Direct Liquid Cooling configuration) Internal Ports\n• 1 x USB 3.0 (optional)\"\nManageability: iDRAC16G Enterprise for remote Management Automatic Server Recovery, Alerts, Inventory, Troubleshooting.\nWarranty: 3 Years', NULL, 50, NULL, NULL, NULL, 1, NULL, '2026-06-24 12:56:55', '2026-06-24 12:56:55'),
(57, 'Samsung T7 Shield 1TB USB 3.2 Gen 2 Type-C Black Portable External SSD', NULL, NULL, 500, 28500.00, 23750.00, NULL, 1, NULL, '2026-06-25 04:23:28', '2026-06-25 04:23:28'),
(58, 'EcoFlow E2000 2400W Portable Power Station', NULL, NULL, 0, 0.00, 0.00, NULL, 1, NULL, '2026-06-25 05:14:49', '2026-06-25 05:14:49'),
(59, 'EXFO AXS-115 handheld OTDR', NULL, NULL, 121, 160000.00, 155000.00, 'Zaman, 0 1820-528670', 1, NULL, '2026-06-25 05:49:14', '2026-06-25 05:49:14'),
(60, 'HP ProDesk 400 G4 MT 4+4 Pin 180 W Desktop Power Supply 901771-004', NULL, NULL, 0, 0.00, 0.00, NULL, 1, NULL, '2026-06-25 06:18:08', '2026-06-25 06:18:08'),
(61, 'Dell Power EDGE 230 Power Supply  & Cooling FAN', NULL, NULL, 2, 15000.00, 6118.00, 'dyna(Server group)', 1, NULL, '2026-06-25 06:32:06', '2026-06-25 06:32:06'),
(62, 'GATEWAY UBIQUITI UCG-ULTRA', NULL, NULL, 1, 20150.00, 17150.00, 'anash(dubai)', 1, NULL, '2026-06-25 06:57:06', '2026-06-25 07:46:12'),
(63, 'Transceiver Module', 'Cisco GLC-BX-D\nCisco GLC-BX-U', NULL, 0, 0.00, 0.00, NULL, 1, NULL, '2026-06-25 07:17:52', '2026-06-25 09:51:53'),
(64, 'Rongta RP80VI/RP80VI-USE High Printing Speed Label Barcode Printer', 'Model: RP80VI/RP80VI-USE\nCutter: Auto Cutter\nMax. Print Speed: 150 mm/sec\nTape Size: 85 mm\nInterface: USB, LAN, Serial\nWarranty: 1 Year', NULL, 5000, NULL, NULL, NULL, 1, NULL, '2026-06-25 07:39:52', '2026-06-25 07:39:52'),
(65, 'Huntkey PZC504 Five Socket Five Switch 3 Line Surge Protection PowerStrip', 'Product not available.', NULL, 0, 0.00, 0.00, NULL, 1, NULL, '2026-06-25 09:02:05', '2026-06-25 09:02:05'),
(66, 'Huntkey PZC504 Five Socket Five Switch 3 Line Surge Protection PowerStrip', 'product not available.', NULL, 495, 0.00, 0.00, NULL, 1, NULL, '2026-06-25 09:03:37', '2026-06-25 09:03:37'),
(67, 'DINSTAR DAG1000-4O FXO VOIP Gateway (4 Ports)', NULL, NULL, 4, 15500.00, 14500.00, NULL, 1, 'rasa', '2026-06-25 10:17:13', '2026-06-25 10:17:13'),
(68, 'JBL PartyBox Club 120 Portable Bluetooth Party Speaker', NULL, NULL, 0, NULL, NULL, NULL, 1, NULL, '2026-06-25 10:20:01', '2026-06-25 10:20:01'),
(69, 'APC NetShelter SX 16 Outlet PDUs', NULL, NULL, 45, NULL, NULL, NULL, 1, NULL, '2026-06-25 10:23:40', '2026-06-25 10:23:40'),
(70, '6COM 6C-QSFP+-LH4 20km Optical Transceiver', NULL, 'Transceiver Module', 6000, 11500.00, 10500.00, NULL, 13, NULL, '2026-06-25 10:26:51', '2026-06-25 10:26:51'),
(71, '6COM 6C-QSFP+-LH4 20km Optical Transceiver Module', NULL, 'Transceiver Module', 600, 11500.00, 10500.00, NULL, 13, NULL, '2026-06-25 10:28:14', '2026-06-25 10:28:14'),
(72, 'Acr122u', NULL, NULL, 0, NULL, NULL, NULL, 1, NULL, '2026-06-25 10:31:10', '2026-06-25 10:31:10'),
(73, 'Ceiling Mount Kit 3 Feet for 32-100\" Television', NULL, 'Ceiling Mount Kit', 495, 7000.00, 5500.00, NULL, 10, NULL, '2026-06-25 10:32:01', '2026-06-25 10:32:01'),
(74, 'Cisco CBS350-48T-4G-EU 48 Port GE Gigabit Managed Switch', 'Model: CBS350\n48 10/100/1000 ports\n4 Gigabit SFP\nMAC table Up to 16K addresses\nRack-mountable\nWarranty: 1 Year', NULL, 500, 74000.00, 74000.00, NULL, 1, NULL, '2026-06-25 10:34:18', '2026-06-25 10:34:18'),
(75, 'Audiowalle TP1000 3000W Socket Audio Purifier Power Filter Surge Protection', NULL, NULL, 1, NULL, NULL, NULL, 1, NULL, '2026-06-25 10:35:48', '2026-06-25 10:35:48'),
(76, 'Crucial MX500 CT250MX500SSD1 250GB 3D NAND SATA 2.5-inch Internal SSD', NULL, NULL, 0, NULL, NULL, NULL, 1, NULL, '2026-06-25 10:37:37', '2026-06-25 10:37:37'),
(77, 'Ubiquiti USW-Pro-Max-16-PoE', NULL, 'PoE Switch', 600, 73000.00, 65000.00, NULL, 7, NULL, '2026-06-25 10:44:49', '2026-06-25 10:44:49'),
(78, 'TOA ST-321B Microphone Stand', 'Client price share kora hoyeche.', NULL, 555, 13000.00, 10500.00, NULL, 1, NULL, '2026-06-25 10:55:09', '2026-06-25 10:55:09'),
(79, '10TB HDD TOSHIBA Video Surveillance S300 AI CMR, 3.5\'\', 512MB, 7200RPM,SATA', NULL, NULL, 1, 59000.00, NULL, NULL, 1, 'Asif vai', '2026-06-25 11:25:40', '2026-06-25 11:25:40'),
(80, 'Ruijie RG-EW3200GX pro', NULL, 'Router', 500, 13000.00, 12500.00, NULL, 12, NULL, '2026-06-25 12:09:19', '2026-06-25 12:09:19'),
(81, 'PIR Motion Sensor', NULL, NULL, 5000000, NULL, NULL, NULL, 1, NULL, '2026-06-25 12:22:01', '2026-06-25 12:22:01'),
(82, '6COM 6C-SFP+-LR 10GBASE-LR SFP+ 1310nm 10km DDM LC SMF Optical Transceiver Module', NULL, 'Transceiver Module', 500, 1600.00, 1450.00, NULL, 13, NULL, '2026-06-25 12:25:45', '2026-06-25 12:25:45'),
(83, 'Power Supply  525W for HP Z440', 'Warranty: 06 Months', NULL, 49999, NULL, NULL, 'Diana', 1, NULL, '2026-06-27 07:56:48', '2026-06-27 08:18:01'),
(84, 'Commscope GigaSPEED X10D 360GS10E Solid Cordage Modular Patch Cord', 'Part Number: CPCSSZ2-09F015\nLength: 15Ft', NULL, 4992, NULL, 1040.00, NULL, 1, NULL, '2026-06-27 08:04:56', '2026-06-27 08:18:01'),
(85, 'HP Spectre X360 13-AP SP04XL Laptop Battery', NULL, NULL, 4999, NULL, 2600.00, NULL, 1, NULL, '2026-06-27 08:09:22', '2026-06-27 08:18:01'),
(86, 'Dell Wyse 5070 Thin Client', 'Brand: Dell\nModel: Wyse 5070\nProcessor: Quad-core Intel Celeron J4105\nRAM: 8GB\nStorage: 256GB M.2 SSD\nWarranty: 1  Month', NULL, 5000, 18600.00, 15625.00, 'Alibaba', 1, NULL, '2026-06-27 08:50:42', '2026-06-27 08:50:42'),
(87, 'Lenovo ThinkCentre M720q', 'Processor: Intel Core i5 8th Gen\nRAM: 8GB DDR4 Memory\nSSD: 256GB M.2 SSD\nGraphics: Intel HD Graphics\nWarranty: 3 Months', NULL, 500, NULL, NULL, 'Lina Hong', 1, 'Alibaba', '2026-06-27 09:24:57', '2026-06-27 09:24:57'),
(88, 'Mac mini with M4 chip', 'Model: Apple Mac Mini M4\n10-core CPU, 10-core GPU, 16-core Neural Engine\nRAM: 24GB Unified Memory\nStorage: 512GB SSD\nWi-Fi 6E (802.11ax), Bluetooth 5.3\nGigabit Ethernet\nWarranty: 1 Year International', NULL, 500, 189400.00, 169400.00, 'Boss-Singapore', 1, NULL, '2026-06-27 09:37:11', '2026-06-27 09:37:11'),
(89, 'DINSTAR DAG2000-8S8O 8 FXS + 8 FXO VOIP Gateway (Stand Alone)', 'Model: DINSTAR DAG2000-8S8O\nNumber of FXO ports :  08\nDTMF support : DTMF, R2, Vox/DTMF\nAnalog audio support : 24-bit\nWarranty: 1 Year', NULL, 5000, 50000.00, 47000.00, 'Rasa', 1, NULL, '2026-06-27 10:02:10', '2026-06-27 10:02:10'),
(90, 'CloudEngine S5735-S24ST4XE-V2 Switch', NULL, NULL, 5000, NULL, NULL, 'Lucy', 1, NULL, '2026-06-27 10:22:42', '2026-06-27 10:22:42'),
(91, 'Universal Socket*1,15W Wireless Charger 1, twin USB A&C(35W),1.5 Metars 1mm With UK Plug Color:Black & White', NULL, NULL, 496, 3500.00, 2300.00, NULL, 7, NULL, '2026-06-27 11:12:39', '2026-06-27 11:13:13'),
(92, 'Ahuja, Model-Ahuja SSW-16M Zone Selector', NULL, NULL, 600, 12500.00, 12500.00, NULL, 12, NULL, '2026-06-27 11:17:31', '2026-06-27 11:17:31'),
(93, 'Abuja Microphone acme-96ch', NULL, NULL, 40, 5000.00, 4800.00, NULL, 12, NULL, '2026-06-27 11:18:17', '2026-06-27 11:18:17'),
(94, 'Ahuja ASC-20T 15 Watt PA Column Speaker', NULL, NULL, 50, 5000.00, 4750.00, NULL, 12, NULL, '2026-06-27 11:18:46', '2026-06-27 11:18:46'),
(95, 'Ahuja, Model-Ahuja SSW-16M Zone Selector', NULL, NULL, 50, 12500.00, 12500.00, NULL, 12, NULL, '2026-06-27 11:20:13', '2026-06-27 11:20:13'),
(96, 'Abuja Microphone acme-96ch', NULL, NULL, 496, 5000.00, 4800.00, NULL, 12, NULL, '2026-06-27 11:21:24', '2026-06-27 11:21:24'),
(97, 'Futronic FS80H/FS81H USB2.0 Fingerprint Scanner', NULL, NULL, 47, 6000.00, 5600.00, NULL, 12, NULL, '2026-06-27 11:26:19', '2026-06-27 11:26:19'),
(98, 'Taifun 2kg ABCE Dry Powder Fire Extinguisher', NULL, NULL, 40, 1200.00, 1050.00, NULL, 6, NULL, '2026-06-27 11:32:52', '2026-06-27 11:32:52'),
(99, 'Autonics E50S8-1000-3-T-24 Rotary Encoder', 'Brand: Autonics\nModel: E50S8-1000-3-T-24\nCountry of Origin: South Korea\nCountry of Manufacture: China/Korea', NULL, 5000, NULL, NULL, NULL, 1, NULL, '2026-06-27 11:33:17', '2026-06-27 11:33:17'),
(100, 'Autonics  CT6S-1P4  Digital Counter / Timer', 'Brand: Autonics\nModel: CT6S-1P4 \nCountry of Origin: South Korea\nCountry of Manufacture: China/Korea', NULL, 5000, NULL, NULL, NULL, 1, NULL, '2026-06-27 11:35:08', '2026-06-29 09:40:34'),
(101, 'RKC Instrument Inc RS400 Digital Temperature Controller', 'Brand:  RKC Instrument Inc\nModel: RS400\nSize: 48 × 96 mm\nSupply Voltage: 240 VAC\nCountry of Origin: Japan\nCountry of Manufacture: Japan/China', NULL, 5000, NULL, NULL, NULL, 1, NULL, '2026-06-27 11:39:48', '2026-06-27 11:39:48'),
(102, 'CS1-U Magnetic Sensor Switch', NULL, NULL, 5000, NULL, NULL, NULL, 1, NULL, '2026-06-27 11:43:15', '2026-06-27 11:43:15'),
(103, 'Samsung WA75F 75 inch UHD 4K Touchscreen Commercial Monitor', 'Model: WA75F\nRam: 8GB\nStorage: 128GB\nWarranty: 1 Year', NULL, 5000, 376400.00, 228000.00, NULL, 1, NULL, '2026-06-27 11:57:25', '2026-06-27 11:57:25'),
(104, 'EXFO AXS-115 handheld OTDR', NULL, NULL, 15, 157000.00, 155000.00, NULL, 12, NULL, '2026-06-27 12:07:53', '2026-06-27 12:07:53'),
(105, 'LONG LG7-12 12V 9Ah Rechargeable Sealed Lead Acid Battery', NULL, NULL, 500, 3150.00, 2950.00, NULL, 1, NULL, '2026-06-28 04:34:10', '2026-06-28 04:34:10'),
(106, 'Hanwha ANO-L7022R 4MP IR Bullet Camera', NULL, NULL, 0, 0.00, 0.00, NULL, 1, NULL, '2026-06-28 04:41:52', '2026-06-28 04:41:52'),
(107, 'LONG WP12-12 12V 12Ah Rechargeable Sealed Lead Acid Battery', NULL, NULL, 35, 4500.00, 4400.00, NULL, 1, NULL, '2026-06-28 04:47:35', '2026-06-28 04:47:35'),
(108, 'ASUS ROG Rapture GT-BE19000AI WiFi 7 Tri-band Gaming Router', NULL, NULL, 500, 129996.00, 120000.00, NULL, 1, NULL, '2026-06-28 04:55:35', '2026-06-28 04:55:35'),
(109, 'Kingston XS1000 2TB SSD | Pocket-Sized | USB 3.2 Gen 2 | External Solid State Drive | Up to 1050MB/s | SXS1000/2000G', NULL, NULL, 55, 0.00, 0.00, NULL, 1, NULL, '2026-06-28 06:23:06', '2026-06-28 06:23:06'),
(110, 'LONG LG7-12 12V 9Ah Rechargeable Sealed Lead Acid Battery', NULL, NULL, 51, 3050.00, 3000.00, NULL, 1, NULL, '2026-06-28 06:34:52', '2026-06-28 06:34:52'),
(111, 'Samsung Wa65f 65 Inch Interactive Display', 'Model: WA65F / LH65WAFWLGCXZA\nProcessor: A73 X 4 + A53 X 4\nRam: 8GB\nStorage: 64GB\nDisplay Size: 65 Inch\nResolution: 3,840 x 2,160 (Landscape)\nOperating System: Android 14\nWarranty: 2 Years', NULL, 5000, 350000.00, 129500.00, NULL, 1, NULL, '2026-06-28 08:21:04', '2026-06-28 09:03:29'),
(112, 'Ahuja Pro+3200 Supercardioid Dynamic Microphone', NULL, NULL, 40, NULL, NULL, NULL, 1, NULL, '2026-06-28 09:17:17', '2026-06-28 09:17:17'),
(113, 'Hikvision face terminal device DS k1 T671MF pro', NULL, NULL, 52, NULL, NULL, NULL, 1, NULL, '2026-06-28 09:20:58', '2026-06-28 09:20:58'),
(114, 'BOSCH DIP-4420IG-00N Management appliance w/o HDD', NULL, 'NVR', 2, 483650.00, 433650.00, NULL, 12, NULL, '2026-06-28 09:58:05', '2026-06-28 09:58:05'),
(115, 'BOSCH MBV-BLIT-DIP DIVAR IP License Lite base for DIVAR IP AIO 4000/5000', NULL, 'NVR License', 1, 51000.00, 41300.00, NULL, 1, NULL, '2026-06-28 09:58:55', '2026-06-28 09:58:55'),
(116, 'BOSCH MBV-MLIT-DIP SMA license for MBV-BLIT-DIP, 1 year', NULL, 'NVR License', 3, 20000.00, 15050.00, NULL, 1, NULL, '2026-06-28 09:59:37', '2026-06-28 09:59:37'),
(117, 'Dell Optiplex 3080 5080 7080 G5 5090 SFF MT 260W Power Supply H260EBM-01 WYHR8', NULL, NULL, 33, 2800.00, 2500.00, NULL, 1, NULL, '2026-06-28 10:24:23', '2026-06-28 10:24:23'),
(118, 'Ring Stick Up Cam', NULL, NULL, 52, 14000.00, 6500.00, NULL, 1, NULL, '2026-06-28 10:38:53', '2026-06-28 10:38:53'),
(119, 'HP ZBook Studio G11 16‑inch Mobile Workstation PC', NULL, NULL, 3, NULL, NULL, NULL, 1, NULL, '2026-06-28 10:43:55', '2026-06-28 10:43:55'),
(120, 'Western Digital SN850X 1TB NVMe M.2 SSD', NULL, NULL, 5, 30000.00, 25000.00, NULL, 1, NULL, '2026-06-28 10:49:30', '2026-06-28 10:49:30'),
(121, '6 Core SM Fiber Optic Cable', NULL, NULL, 55, 23.00, 22.00, NULL, 3, NULL, '2026-06-28 10:51:01', '2026-06-28 10:51:01'),
(122, '12 Port ODF with pigtail and SC-SC adapter (Loaded)', NULL, NULL, 503, 3700.00, 3500.00, NULL, 1, NULL, '2026-06-28 10:51:50', '2026-06-28 10:51:50'),
(123, '6 Core SM Fiber Optic Cable', NULL, NULL, 95, 23.00, 22.00, NULL, 3, NULL, '2026-06-28 10:53:20', '2026-06-28 10:53:20'),
(124, '12 Port ODF with pigtail and SC-SC adapter (Loaded)', NULL, NULL, 953, 3700.00, 3500.00, NULL, 1, NULL, '2026-06-28 10:54:04', '2026-06-28 10:54:04'),
(125, '24 Port ODF with pigtail and SC-SC adapter (Loaded)', NULL, NULL, 73, 4700.00, 4500.00, NULL, 1, NULL, '2026-06-28 10:54:44', '2026-06-28 10:54:44'),
(126, '48 Port ODF with pigtail and SC-SC adapter (Loaded)', NULL, NULL, 185, 7700.00, 7500.00, NULL, 1, NULL, '2026-06-28 10:55:35', '2026-06-28 10:55:35'),
(127, 'Hikvision face terminal device DS k1 T671MF pro', NULL, NULL, 2, NULL, NULL, NULL, 1, NULL, '2026-06-28 11:07:45', '2026-06-28 11:07:45'),
(128, 'Hundure RAC-960PEF Standalone Fingerprint Access Controller', NULL, NULL, 3, NULL, NULL, NULL, 1, NULL, '2026-06-28 11:11:16', '2026-06-28 11:11:16'),
(129, 'Lenovo ThinkPad P14s Gen 5 (14″ AMD) Mobile Workstation', NULL, NULL, 5, NULL, NULL, NULL, 1, NULL, '2026-06-28 11:25:16', '2026-06-28 11:25:16'),
(130, 'Dell Precision Tower 5810 Workstation Power supply', NULL, NULL, 5, NULL, NULL, NULL, 1, NULL, '2026-06-28 11:27:05', '2026-06-28 11:27:17'),
(131, 'HP 250R G10 Core-5-120U Ram 8GB DDR5 5600 MHz SSD 512GB Back lite Keyboard, Finger Print 15.6\" Laptop', NULL, NULL, 0, 73000.00, 68000.00, NULL, 1, NULL, '2026-06-28 11:30:27', '2026-06-28 11:30:27'),
(132, 'HPE 900GB SAS 12G Mission Critical 15K SFF HDD', NULL, NULL, 5, NULL, NULL, NULL, 1, NULL, '2026-06-28 11:33:37', '2026-06-28 11:33:37'),
(133, 'Cisco C9300-48T-E Catalyst 9300 Series Switch', NULL, NULL, 4, NULL, NULL, NULL, 1, NULL, '2026-06-28 12:28:59', '2026-06-28 12:28:59'),
(134, 'Cisco Catalyst C1200-24T-4G', NULL, NULL, 5665, 35000.00, 34000.00, NULL, 1, NULL, '2026-06-28 12:30:19', '2026-06-28 12:30:19'),
(135, 'Western Digital Purple 2TB 5400RPM Surveillance HDD', NULL, 'HDD', 5, 15000.00, 14500.00, NULL, 1, NULL, '2026-06-29 05:20:44', '2026-06-29 05:20:44'),
(136, 'Hanvon F910 Flexible Facial ID Access Control', NULL, NULL, 6461, 36000.00, 35000.00, NULL, 1, NULL, '2026-06-29 05:22:22', '2026-06-29 05:22:22'),
(137, 'Seagate SkyHawk AI 10TB 3.5\" Surveillance HDD', NULL, NULL, 0, NULL, NULL, NULL, 1, NULL, '2026-06-29 05:33:03', '2026-06-29 05:33:03'),
(138, '6TB HDD TOSHIBA N300 NAS 7200RPM SATA HDWG760EZSTA', 'Warranty: 3 Years', NULL, 5, 36550.00, 32550.00, NULL, 1, NULL, '2026-06-29 06:26:36', '2026-06-29 06:26:36'),
(139, 'Seagate ST6000NM019B Exos 7E10 6TB Enterprise Hard Drive', NULL, NULL, 4, 0.00, 0.00, NULL, 1, NULL, '2026-06-29 06:40:44', '2026-06-29 06:40:44'),
(140, 'Apollo UP40-12S 12V-40Ah AGM Battery er', NULL, NULL, 0, 8500.00, NULL, NULL, 1, NULL, '2026-06-29 07:56:57', '2026-06-29 07:56:57'),
(141, 'KSTAR 6-FM-200T 12V 200AH UPS Battery', NULL, NULL, 6, 30000.00, 29500.00, NULL, 1, NULL, '2026-06-29 09:26:12', '2026-06-29 09:26:12');

-- --------------------------------------------------------

--
-- Table structure for table `requirements`
--

CREATE TABLE `requirements` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `ait_percentage` decimal(5,2) NOT NULL DEFAULT 0.00,
  `vat_percentage` decimal(5,2) NOT NULL DEFAULT 0.00,
  `has_accessories` tinyint(1) NOT NULL DEFAULT 0,
  `has_installation` tinyint(1) NOT NULL DEFAULT 0,
  `price_validity_days` int(11) NOT NULL DEFAULT 0,
  `delivery_time_days` int(11) NOT NULL DEFAULT 0,
  `advance_payment` int(11) NOT NULL DEFAULT 0,
  `before_payment` int(11) NOT NULL DEFAULT 100,
  `delivery_location` varchar(255) DEFAULT NULL,
  `after_payment` int(11) NOT NULL DEFAULT 0,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `send_qutation_to` bigint(20) UNSIGNED DEFAULT NULL,
  `qutation_send_by` bigint(20) UNSIGNED DEFAULT NULL,
  `grand_total` decimal(12,2) NOT NULL DEFAULT 0.00,
  `total_costing` decimal(12,2) NOT NULL DEFAULT 0.00,
  `notes` text DEFAULT NULL,
  `status` enum('pending','processing','purchased','cancel') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `requirements`
--

INSERT INTO `requirements` (`id`, `title`, `ait_percentage`, `vat_percentage`, `has_accessories`, `has_installation`, `price_validity_days`, `delivery_time_days`, `advance_payment`, `before_payment`, `delivery_location`, `after_payment`, `customer_id`, `user_id`, `send_qutation_to`, `qutation_send_by`, `grand_total`, `total_costing`, `notes`, `status`, `created_at`, `updated_at`) VALUES
(5, 'IT Equipment', 0.00, 0.00, 0, 0, 5, 2, 0, 0, 'Plot No. 129 - 131, D.E.P.Z Savar, 1349 Bangladesh.', 100, 56, 54, NULL, NULL, 135400.00, 62990.00, NULL, 'purchased', '2026-06-23 14:04:13', '2026-06-23 14:29:45'),
(6, 'Access Point', 0.00, 0.00, 0, 0, 5, 10, 0, 0, 'Plot No. 129 - 131, D.E.P.Z Savar, 1349 Bangladesh.', 100, 56, 54, NULL, NULL, 132500.00, 24500.00, NULL, 'purchased', '2026-06-23 14:46:42', '2026-06-23 14:48:00'),
(7, 'Access Point', 0.00, 0.00, 0, 0, 5, 15, 100, 0, '105 Pragati Sarani, Middle Badda, GPO BOX - 83, Dhaka-1212, Bangladesh.', 0, 58, 54, NULL, NULL, 1590000.00, 300000.00, NULL, 'processing', '2026-06-23 14:57:31', '2026-06-24 10:12:10'),
(8, 'Hard Disk Drive', 0.00, 0.00, 0, 0, 3, 2, 100, 0, 'Tongabari, Ashulia, Savar, Dhaka.', 0, 59, 54, NULL, NULL, 210000.00, 105000.00, NULL, 'processing', '2026-06-24 09:59:46', '2026-06-24 10:12:05'),
(9, 'IT Equipment', 0.00, 0.00, 0, 0, 7, 2, 0, 0, 'VATARKHOLA, NAOGAON BAZAR, DHAMRAI, Bangladesh', 100, 60, 54, NULL, NULL, 40000.00, 9720.00, NULL, 'purchased', '2026-06-24 11:15:49', '2026-06-24 11:17:22'),
(10, 'Rack Server', 0.00, 0.00, 0, 0, 3, 20, 100, 0, NULL, 0, 61, 54, NULL, NULL, 779750.00, 479750.00, NULL, 'processing', '2026-06-24 11:54:20', '2026-06-24 14:31:24'),
(11, 'IT Equipments', 0.00, 0.00, 0, 0, 3, 20, 100, 0, 'House- 277, Road- 1, Baitul Aman Housing Society, Shyamoli, Adabor, Dhaka- 1207.', 0, 62, 54, NULL, NULL, 2843637.00, 2583387.00, NULL, 'processing', '2026-06-24 12:57:02', '2026-06-25 08:47:11'),
(12, 'SSD', 0.00, 0.00, 0, 0, 0, 15, 0, 0, 'Chattogram', 0, 63, 53, NULL, NULL, 28500.00, 23750.00, NULL, 'processing', '2026-06-25 04:23:35', '2026-06-25 04:23:40'),
(13, 'Power Station', 0.00, 0.00, 0, 0, 0, 0, 0, 0, 'Old Dhaka', 0, 65, 53, NULL, NULL, 0.00, 0.00, 'Product not available in local market.', 'cancel', '2026-06-25 05:15:02', '2026-06-25 09:42:53'),
(14, 'OTDR', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 66, 56, NULL, NULL, 160000.00, 155000.00, 'price is high, so he don\'t buy it', 'processing', '2026-06-25 05:49:19', '2026-06-28 07:08:08'),
(15, 'Power Supply', 0.00, 0.00, 0, 0, 0, 0, 0, 0, '145, Eastern Plus Shopping Complex, Shop-57, Level-4, Shantinagar, Dhaka-1217', 0, 67, 53, 67, 53, 3000.00, 2500.00, 'Client ke price share kora hoyeche, client pore update janabe.', 'processing', '2026-06-25 06:18:13', '2026-06-28 03:17:38'),
(16, 'Server Power supplye', 0.00, 0.00, 0, 0, 0, 0, 0, 0, '54, Motijheel Commercial Area, Elite House 3rd Floor, Dhaka-1000, Bangladesh.', 0, 68, 56, NULL, NULL, 15000.00, 6119.00, 'customer just asking for price', 'cancel', '2026-06-25 06:32:37', '2026-06-28 07:05:22'),
(17, 'Cloud Gateway', 5.00, 10.00, 0, 0, 3, 10, 100, 0, 'House #57, Road #7/B, Block #H, Banani, Dhaka - 1213, Bangladesh', 0, 72, 56, NULL, NULL, 23331.58, 17150.00, 'price high, so customer don\'t buy it', 'cancel', '2026-06-25 06:59:37', '2026-06-28 07:00:59'),
(18, 'Transceiver Module', 0.00, 0.00, 0, 0, 0, 0, 0, 0, 'Dhaka', 0, 74, 53, NULL, NULL, 486000.00, 7600.00, NULL, 'processing', '2026-06-25 07:18:07', '2026-06-25 09:51:53'),
(19, 'Label Barcode Printer', 5.00, 0.00, 0, 0, 5, 2, 0, 0, '280, East Narsingahpur, Ashulia, Dhaka-1346. Savar Bangladesh.', 100, 69, 54, NULL, NULL, 98526.32, 10000.00, NULL, 'processing', '2026-06-25 07:42:38', '2026-06-25 12:33:45'),
(20, 'power Strip', 0.00, 0.00, 0, 0, 0, 0, 0, 0, 'Gulshan 1', 0, 75, 53, NULL, NULL, 0.00, 0.00, 'Client ke agami Saturday te knock dite bolechi. price ta ekhon pai ni. saturday junayet bhai kach theke price niye client ke janate hobe.', 'cancel', '2026-06-25 09:03:43', '2026-06-28 07:46:28'),
(21, 'Gateway', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 76, 56, NULL, NULL, 15500.00, 14500.00, NULL, 'processing', '2026-06-25 10:17:19', '2026-06-25 10:17:23'),
(22, 'Bluetooth Party Speaker', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 77, 56, NULL, NULL, 0.00, 0.00, NULL, 'cancel', '2026-06-25 10:20:24', '2026-06-25 10:20:28'),
(23, 'PDU', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 78, 56, NULL, NULL, 0.00, 0.00, NULL, 'cancel', '2026-06-25 10:23:45', '2026-06-25 10:28:53'),
(24, 'Transceiver Module', 0.00, 0.00, 0, 0, 0, 0, 0, 0, 'Gopalganj', 0, 71, 55, NULL, NULL, 11500.00, 10500.00, NULL, 'processing', '2026-06-25 10:28:33', '2026-06-25 10:28:38'),
(25, 'NFC Reader', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 80, 56, NULL, NULL, 0.00, 0.00, NULL, 'cancel', '2026-06-25 10:31:16', '2026-06-25 10:31:20'),
(26, 'Ceiling Mount Kit', 0.00, 0.00, 0, 0, 0, 0, 0, 0, 'Rangs Industries Limited Rangs Bhaban (Level-6) 117/A, Old Airport Road Bijoy Sharani, Dhaka-1215', 0, 73, 55, NULL, NULL, 7000.00, 5500.00, NULL, 'cancel', '2026-06-25 10:32:10', '2026-06-25 12:22:43'),
(27, 'Cisco Switch', 0.00, 0.00, 0, 0, 0, 0, 0, 0, 'Level-2, Shop-124/1, Muktobangla Shopping Complex, Mirpur-01, Dhaka-1216.', 0, 82, 53, NULL, NULL, 74000.00, 74000.00, 'Client costing price deoya hoyeche. and alternative model er price deoya hoyeche.', 'processing', '2026-06-25 10:34:55', '2026-06-25 10:35:00'),
(28, 'Power Filter Surge Protection', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 83, 56, NULL, NULL, 0.00, 0.00, NULL, 'cancel', '2026-06-25 10:35:59', '2026-06-25 10:36:03'),
(29, 'SSD', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 84, 56, NULL, NULL, 0.00, 0.00, NULL, 'cancel', '2026-06-25 10:37:42', '2026-06-25 10:37:45'),
(30, 'PoE Switch', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 85, 55, NULL, NULL, 73000.00, 65000.00, NULL, 'processing', '2026-06-25 10:44:52', '2026-06-25 10:44:56'),
(31, 'Microphone Stand', 0.00, 0.00, 0, 0, 0, 0, 0, 0, 'Sirajgonj', 0, 87, 53, NULL, NULL, 13000.00, 10500.00, 'Client ke pricec share kora hoyeche. client kon update janay ni.', 'processing', '2026-06-25 10:55:12', '2026-06-25 10:57:00'),
(32, 'Surveillance HDD', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 88, 56, NULL, NULL, 59000.00, 0.00, 'customer onno HDD chayche', 'cancel', '2026-06-25 11:25:48', '2026-06-28 06:56:11'),
(33, 'Router', 0.00, 0.00, 0, 0, 0, 0, 0, 0, 'Faridganj Chadpur', 0, 64, 55, NULL, NULL, 13000.00, 12500.00, NULL, 'cancel', '2026-06-25 12:09:28', '2026-06-25 12:09:33'),
(34, 'Motion Sensor', 0.00, 0.00, 0, 0, 5, 10, 100, 0, 'Boroshala, Khadimnogor Union Parishad, Airport Road, Sylhet Sodor.', 0, 89, 54, NULL, NULL, 9600.00, 323.00, NULL, 'processing', '2026-06-25 12:22:21', '2026-06-27 06:49:03'),
(35, 'Transceiver Module', 0.00, 0.00, 0, 0, 0, 0, 0, 0, '24, Elephant Road (Ground Floor) Dhaka-1205.', 0, 86, 55, NULL, NULL, 1600.00, 1450.00, NULL, 'processing', '2026-06-25 12:25:50', '2026-06-25 12:25:59'),
(36, 'Access Point', 0.00, 0.00, 0, 0, 5, 10, 100, 0, '387, Tejgaon Industrial Area, Dhaka 1215.', 0, 91, 54, NULL, NULL, 85500.00, 24500.00, NULL, 'processing', '2026-06-25 12:32:24', '2026-06-25 12:32:38'),
(37, 'IT Equipment', 5.00, 10.00, 0, 0, 5, 15, 0, 0, 'Nowbabpur', 100, 90, 54, NULL, NULL, 25203.37, 8960.00, NULL, 'purchased', '2026-06-27 08:15:42', '2026-06-27 08:18:01'),
(38, 'Thin Client', 0.00, 0.00, 0, 0, 5, 15, 100, 0, 'Dhaka', 0, 98, 54, NULL, NULL, 111600.00, 15625.00, 'Out of Budget\nBudget 6k', 'cancel', '2026-06-27 08:51:29', '2026-06-28 04:32:14'),
(39, 'Used ThinkCentre', 0.00, 0.00, 0, 0, 5, 15, 100, 0, 'Road 21, House 133-B, Mohakhali DOHS, Dhaka-1207, Bangladesh.', 0, 100, 54, NULL, 54, 144880.00, 26220.00, NULL, 'processing', '2026-06-27 09:25:47', '2026-06-29 05:52:14'),
(40, 'Apple Mac Mini', 0.00, 0.00, 0, 0, 5, 70, 100, 0, '6, Motijheel C/A, 7th Floor, Dhaka-1000.', 0, 101, 54, NULL, NULL, 189400.00, 169400.00, 'Lead time is too long', 'cancel', '2026-06-27 09:37:45', '2026-06-28 04:39:29'),
(41, 'FXO VOIP Gateway', 0.00, 0.00, 0, 0, 5, 2, 100, 0, NULL, 0, 103, 54, NULL, NULL, 50000.00, 47000.00, NULL, 'processing', '2026-06-27 10:02:18', '2026-06-27 10:02:22'),
(42, 'Network Switch', 0.00, 0.00, 0, 0, 5, 20, 100, 0, 'Suite 5/E, Level-05, Azmiri Probal Towe 45, Ring Road, Adabar, Dhaka-1207, Bangladesh', 0, 104, 54, NULL, NULL, 0.00, 0.00, 'RFQ date over', 'cancel', '2026-06-27 10:22:55', '2026-06-29 07:56:29'),
(43, 'Popup Socket', 0.00, 0.00, 0, 0, 0, 0, 0, 0, 'Uttara', 0, 99, 55, NULL, NULL, 3500.00, 2300.00, NULL, 'purchased', '2026-06-27 11:12:55', '2026-06-27 11:13:13'),
(44, 'Ahuja Sound System', 0.00, 0.00, 0, 0, 0, 0, 0, 0, 'Shop No #339, 3rd Floor Aloka Nodi Bangla Complex Mymensingh', 0, 102, 55, NULL, NULL, 22500.00, 22050.00, NULL, 'processing', '2026-06-27 11:19:01', '2026-06-27 11:21:41'),
(45, 'Finger print Scanner', 0.00, 0.00, 0, 0, 0, 0, 0, 0, 'Norail Sadar', 0, 96, 55, NULL, NULL, 6000.00, 5600.00, NULL, 'processing', '2026-06-27 11:26:25', '2026-06-27 11:26:35'),
(46, 'Fire Extinguisher', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 106, 55, NULL, NULL, 1200.00, 1050.00, NULL, 'cancel', '2026-06-27 11:33:58', '2026-06-27 11:34:07'),
(47, 'IT Equipments', 0.00, 0.00, 0, 0, 5, 20, 100, 0, '1st Floor, Hoous-12, Road-9, Sector-1, Block-F, Aftabnagar, Dhaka-1212, Bangladesh', 0, 105, 54, NULL, NULL, 0.00, 20444.00, NULL, 'pending', '2026-06-27 11:43:30', '2026-06-29 09:39:49'),
(48, 'Interactive Display', 5.00, 10.00, 0, 0, 5, 10, 100, 0, 'Jalalabad gas field in Block 13. Situated in Lakkatura, Sylhet.', 0, 108, 54, NULL, NULL, 405263.16, 129500.00, NULL, 'processing', '2026-06-27 11:58:25', '2026-06-28 08:22:10'),
(49, 'OTDR', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 109, 55, NULL, NULL, 157000.00, 155000.00, NULL, 'processing', '2026-06-27 12:09:22', '2026-06-27 12:09:42'),
(50, 'Bettary', 0.00, 0.00, 0, 0, 0, 0, 0, 0, 'narayanganj', 0, 113, 53, NULL, NULL, 3150.00, 2950.00, 'Client ke price share kora hoyeche.', 'processing', '2026-06-28 04:34:15', '2026-06-28 04:35:08'),
(51, 'Camera', 0.00, 0.00, 0, 0, 0, 0, 0, 0, 'House # 26, Road # 09, PC Culture Housing, Shakertek, Adabor, Dhaka-1207, Bangladesh', 0, 112, 53, NULL, NULL, 0.00, 0.00, 'Client check ready stock availability.', 'cancel', '2026-06-28 04:42:57', '2026-06-28 04:43:01'),
(52, 'Battery', 0.00, 0.00, 0, 0, 0, 0, 0, 0, 'Level-4, House: 339/B, Khilgaon, Dhaka-1219 Bangladesh', 0, 114, 55, NULL, NULL, 4500.00, 4400.00, NULL, 'processing', '2026-06-28 04:47:41', '2026-06-28 09:15:19'),
(53, 'Router', 0.00, 0.00, 0, 0, 0, 0, 0, 0, 'Bogura', 0, 116, 53, NULL, NULL, 130000.00, 120000.00, 'Client just come for asking price.', 'processing', '2026-06-28 04:55:51', '2026-06-28 04:55:55'),
(54, 'Protable SSD', 0.00, 0.00, 0, 0, 0, 0, 0, 0, 'Dhaka', 0, 117, 53, NULL, NULL, 37500.00, 35000.00, 'Client ke alternative product er price share kora hoyeche.', 'cancel', '2026-06-28 06:24:28', '2026-06-29 07:55:00'),
(55, 'Bettary', 0.00, 0.00, 0, 0, 0, 0, 0, 0, 'Level-4, House: 339/B, Khilgaon, Dhaka-1219 Bangladesh', 0, 118, 53, NULL, NULL, 9150.00, 3000.00, 'Client ke price share kora hoyeche client ekhon o kon update janay ni.', 'processing', '2026-06-28 06:35:00', '2026-06-28 06:35:36'),
(56, 'Microphone', 0.00, 0.00, 0, 0, 0, 0, 0, 0, 'Mirpur Shewrapara', 0, 120, 55, NULL, NULL, 32000.00, 7500.00, NULL, 'processing', '2026-06-28 09:18:35', '2026-06-29 06:18:03'),
(57, 'Attendance Device', 0.00, 0.00, 0, 0, 0, 0, 0, 0, '218, Sahera Tropical Centre Level #14, Suite No #1403-A Elephant Road (Bata Signal), Dhaka-1205', 0, 115, 55, NULL, NULL, 0.00, 0.00, NULL, 'cancel', '2026-06-28 09:21:02', '2026-06-29 08:55:33'),
(58, 'NVR & License', 0.00, 0.00, 0, 0, 0, 0, 0, 0, '44 No Nazir Ahmed Chy, Road, Andharkilla, Chittagong, Bangladesh', 0, 121, 55, NULL, NULL, 554650.00, 490000.00, NULL, 'processing', '2026-06-28 09:59:43', '2026-06-28 09:59:49'),
(59, 'Power Supply', 0.00, 0.00, 0, 0, 0, 0, 0, 0, 'Showkat Ali Talukder (Capsule), Poura Super Market (1st Floor), Victoria Road, Tangail-1900, Bangladesh', 0, 122, 53, NULL, NULL, 14000.00, 2500.00, 'Product not available in stock.', 'processing', '2026-06-28 10:24:31', '2026-06-28 10:49:28'),
(60, 'NVR & License', 0.00, 0.00, 0, 0, 0, 0, 0, 0, '2551/C, Basa Mia Road, West Nasirabad, Pahartali Chittagong', 0, 123, 55, NULL, NULL, 554650.00, 490000.00, NULL, 'processing', '2026-06-28 10:34:24', '2026-06-28 10:34:37'),
(61, 'Security Camera', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 124, 55, NULL, NULL, 14000.00, 6500.00, NULL, 'processing', '2026-06-28 10:38:57', '2026-06-28 10:39:02'),
(62, 'laptop', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 125, 56, NULL, NULL, 0.00, 0.00, 'Ready stock not Available', 'cancel', '2026-06-28 10:47:49', '2026-06-28 12:35:58'),
(63, 'Hdd', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 127, 56, NULL, NULL, 30000.00, 25000.00, 'price high', 'cancel', '2026-06-28 10:49:37', '2026-06-28 10:50:19'),
(64, 'Networking Accessories', 0.00, 0.00, 0, 0, 0, 0, 0, 0, '67 Motijheel B/A, Dhaka 1000', 0, 126, 53, NULL, NULL, 274300.00, 15522.00, 'Client ke price share kora hoyeche, client pore update janabe.', 'processing', '2026-06-28 10:55:50', '2026-06-28 10:56:32'),
(65, 'face terminal device', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 128, 56, NULL, NULL, 0.00, 0.00, 'As discussed \nprice share korbo kal', 'pending', '2026-06-28 11:07:48', '2026-06-28 12:35:09'),
(66, 'Fingerprint Access Controller', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 129, 56, NULL, NULL, 28000.00, 26500.00, NULL, 'processing', '2026-06-28 11:11:58', '2026-06-28 11:12:03'),
(67, 'Laptaop', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 130, 56, NULL, NULL, 0.00, 0.00, 'Alternative model share kora hoyche, customer janabe', 'cancel', '2026-06-28 11:25:20', '2026-06-29 05:51:39'),
(68, 'Power Supply', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 131, 56, NULL, NULL, 0.00, 0.00, 'customer ready stock required', 'cancel', '2026-06-28 11:27:08', '2026-06-28 12:33:52'),
(69, 'Laptop', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 132, 56, NULL, NULL, 73000.00, 68000.00, 'Alternative share kora hoyche, customer janabe', 'processing', '2026-06-28 11:30:38', '2026-06-28 12:33:22'),
(70, 'SAS HDD', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 133, 56, NULL, NULL, 0.00, 0.00, 'customer Ready stock required', 'cancel', '2026-06-28 11:33:52', '2026-06-28 12:32:48'),
(71, 'Series Switch', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 134, 56, NULL, NULL, 324500.00, 294500.00, NULL, 'processing', '2026-06-28 12:29:05', '2026-06-29 05:48:49'),
(72, 'Cisco Switch', 0.00, 0.00, 0, 0, 0, 0, 0, 0, 'Chittagong Computer City, RF Johura Tower (2nd Floor), Shop No. # 303, 1401, Sk Mujib Road, Chowmuhani, Agrabad, Chattogram-4100, Bangladesh', 0, 135, 53, NULL, NULL, 70000.00, 34000.00, 'Client ke price share kora hoyeche and lead time o 3 month doeya hoyeche. client tar customer er sathe kotha bole update janabe.', 'processing', '2026-06-28 12:30:29', '2026-06-28 12:32:07'),
(73, 'Surveillance HDD', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 136, 55, NULL, NULL, 15000.00, 14500.00, NULL, 'processing', '2026-06-29 05:20:50', '2026-06-29 05:21:20'),
(74, 'Access Control', 0.00, 0.00, 0, 1, 3, 7, 0, 0, 'RS-903, Shasongoan, Enayetnagar, Fatullah, Narayanganj-1400', 100, 137, 53, NULL, NULL, 74500.00, 36000.00, NULL, 'processing', '2026-06-29 05:22:29', '2026-06-29 06:02:28'),
(75, 'Surveillance HDD', 0.00, 0.00, 0, 0, 0, 0, 0, 0, 'Sagufta De Nawar-1, Level-3-4, 136/Ta Gulshan-Badda Link Road, Dhaka-1212', 0, 138, 55, NULL, NULL, 1008000.00, 59999.00, NULL, 'processing', '2026-06-29 05:34:06', '2026-06-29 06:15:04'),
(76, 'Server HDD', 0.00, 0.00, 0, 0, 3, 10, 100, 0, NULL, 0, 139, 56, NULL, NULL, 36550.00, 32550.00, NULL, 'processing', '2026-06-29 06:26:45', '2026-06-29 06:30:23'),
(77, 'HDD', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 140, 53, NULL, NULL, 0.00, 0.00, 'Product not available.', 'cancel', '2026-06-29 06:40:57', '2026-06-29 07:54:11'),
(78, 'Battery', 0.00, 0.00, 0, 0, 0, 0, 0, 0, NULL, 0, 141, 53, NULL, NULL, 8500.00, 0.00, 'Client 1 pc battery nibe, online theke price niye share korechi.', 'cancel', '2026-06-29 07:57:07', '2026-06-29 07:57:49'),
(79, 'Battery', 0.00, 0.00, 0, 0, 0, 0, 0, 0, 'Savar Cantonment', 0, 143, 53, NULL, NULL, 30000.00, 29500.00, 'Client ke price share kora hoyeche, client pore office theke aproval niye update janabe.', 'processing', '2026-06-29 09:26:47', '2026-06-29 09:26:50');

-- --------------------------------------------------------

--
-- Table structure for table `requirement_accessories`
--

CREATE TABLE `requirement_accessories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `requirement_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_id` bigint(20) UNSIGNED DEFAULT NULL,
  `price` decimal(12,2) DEFAULT NULL,
  `total_price` decimal(12,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `requirement_installations`
--

CREATE TABLE `requirement_installations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `requirement_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_id` bigint(20) UNSIGNED DEFAULT NULL,
  `price` decimal(12,2) NOT NULL,
  `total_price` decimal(12,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `requirement_installations`
--

INSERT INTO `requirement_installations` (`id`, `requirement_id`, `title`, `quantity`, `unit_id`, `price`, `total_price`, `created_at`, `updated_at`) VALUES
(3, 74, 'Delivery Charge', 1, 14, 500.00, 500.00, '2026-06-29 06:02:28', '2026-06-29 06:02:28');

-- --------------------------------------------------------

--
-- Table structure for table `requirement_items`
--

CREATE TABLE `requirement_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `requirement_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `unit_price` decimal(10,2) DEFAULT NULL,
  `costing_price` decimal(12,2) NOT NULL DEFAULT 0.00,
  `description` text DEFAULT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `requirement_items`
--

INSERT INTO `requirement_items` (`id`, `requirement_id`, `product_id`, `quantity`, `unit_price`, `costing_price`, `description`, `total_price`, `created_at`, `updated_at`) VALUES
(42, 5, 33, 1, 14500.00, 14000.00, 'Warranty: 2 years', 14500.00, '2026-06-23 14:29:34', '2026-06-23 14:29:34'),
(43, 5, 34, 1, 5000.00, 4700.00, 'Warranty: 1 year', 5000.00, '2026-06-23 14:29:34', '2026-06-23 14:29:34'),
(44, 5, 35, 15, 1500.00, 1400.00, 'Warranty: 1 year', 22500.00, '2026-06-23 14:29:34', '2026-06-23 14:29:34'),
(45, 5, 36, 10, 790.00, 690.00, 'Warranty: 1 year', 7900.00, '2026-06-23 14:29:34', '2026-06-23 14:29:34'),
(46, 5, 37, 3, 9000.00, 8500.00, 'Warranty: 1 year', 27000.00, '2026-06-23 14:29:34', '2026-06-23 14:29:34'),
(47, 5, 38, 1, 22500.00, 21500.00, NULL, 22500.00, '2026-06-23 14:29:34', '2026-06-23 14:29:34'),
(48, 5, 39, 6, 2200.00, 2000.00, 'Warranty: 1 year', 13200.00, '2026-06-23 14:29:34', '2026-06-23 14:29:34'),
(49, 5, 40, 3, 3000.00, 2800.00, 'Warranty: 1 month', 9000.00, '2026-06-23 14:29:34', '2026-06-23 14:29:34'),
(50, 5, 41, 3, 3000.00, 2800.00, 'Warranty: 1  month', 9000.00, '2026-06-23 14:29:35', '2026-06-23 14:29:35'),
(51, 5, 42, 1, 4800.00, 4600.00, 'Warranty: 1 year', 4800.00, '2026-06-23 14:29:35', '2026-06-23 14:29:35'),
(53, 6, 43, 5, 26500.00, 24500.00, 'Model: Unifi U7 Pro\nWiFi standards: Wi-Fi 7 (802.11be), Tri Band\nThroughput: Up to 9335 Mb/s Total\nPower Consumption: ≤21 W\nInterface: 1x RJ45 2.5 GbE PoE+ (30 W, 802.3at)\nWarranty: 1 Year', 132500.00, '2026-06-23 14:48:00', '2026-06-23 14:48:00'),
(54, 7, 44, 5, 290000.00, 275500.00, 'Warranty: 1 Year', 1450000.00, '2026-06-23 14:57:31', '2026-06-23 14:57:31'),
(55, 7, 43, 5, 28000.00, 24500.00, 'Model: Unifi U7 Pro\nWiFi standards: Wi-Fi 7 (802.11be), Tri Band\nThroughput: Up to 9335 Mb/s Total\nPower Consumption: ≤21 W\nInterface: 1x RJ45 2.5 GbE PoE+ (30 W, 802.3at)\nWarranty: 1 Year', 140000.00, '2026-06-23 14:57:31', '2026-06-23 14:57:31'),
(56, 8, 45, 2, 105000.00, 105000.00, 'Model: ST24000NM002H\nWarranty: 5 Years', 210000.00, '2026-06-24 09:59:46', '2026-06-24 09:59:46'),
(62, 9, 46, 4, 3500.00, 2900.00, NULL, 14000.00, '2026-06-24 11:17:16', '2026-06-24 11:17:16'),
(63, 9, 47, 5, 470.00, 420.00, 'Warranty: 1 Year', 2350.00, '2026-06-24 11:17:16', '2026-06-24 11:17:16'),
(64, 9, 48, 5, 770.00, 670.00, 'Warranty: 1 Year', 3850.00, '2026-06-24 11:17:16', '2026-06-24 11:17:16'),
(65, 9, 49, 10, 1500.00, 1230.00, 'Warranty: 1 Year', 15000.00, '2026-06-24 11:17:17', '2026-06-24 11:17:17'),
(66, 9, 50, 1, 4800.00, 4500.00, 'Model: APM58\nWarranty: 1 Year', 4800.00, '2026-06-24 11:17:17', '2026-06-24 11:17:17'),
(95, 10, 52, 1, 779750.00, 479750.00, 'Chassis: 2U Rackmount server, up 24 x 3.5” SAS/SATA (HDD)\nProcessor: 2 × Intel® Xeon® Platinum 8280 Processor 38.5M Cache, 2.70 GHz\nMemory: 4 × 32GB DDR4 ECC DDR4-2666\nStorage:\n	2 x Dell 240GB SSD SATA Mix Use TLC 6Gbps 512e 2.5in Drive (OS RAID 1)\n 	1 x Dell 480GB SATA SSD for (Apps and cache)\n	6 x Dell 10TB 7.2K 12G 3.5inch SAS (Data & Storage)\nRAID Controller: Dell PERC H740\nNetworking: Dual Port 10Gb SFP+ NIC (Intel X710 Recommended)\nManagement: iDRAC9 Basic\nPower: 2 × 750W Hot-Swap Power Supplies\nAccessories: Front Bezel, 2U Rail Kit, 2 × UK Power Cables\nWarranty: 1 Year', 779750.00, '2026-06-24 14:31:24', '2026-06-24 14:31:24'),
(96, 12, 57, 1, 28500.00, 23750.00, NULL, 28500.00, '2026-06-25 04:23:35', '2026-06-25 04:23:35'),
(107, 18, 63, 60, 8100.00, 7600.00, 'Cisco GLC-BX-D\nCisco GLC-BX-U', 486000.00, '2026-06-25 07:50:02', '2026-06-25 07:50:02'),
(109, 11, 53, 1, 74000.00, 74000.00, 'Model: CBS350\n48 10/100/1000 ports\n4 Gigabit SFP\nMAC table Up to 16K addresses\nRack-mountable\nWarranty: 1 Year', 74000.00, '2026-06-25 08:47:04', '2026-06-25 08:47:04'),
(110, 11, 54, 1, 110000.00, 99750.00, 'Model: CCR2116-12G-4S+\nArchitecture: ARM 64bit\nCPU: AL73400\nSize of RAM: 16 GB\nStorage size: 128 MB, Operating System: RouterOS (v7 only)\nWarranty: 1 Year', 110000.00, '2026-06-25 08:47:04', '2026-06-25 08:47:04'),
(111, 11, 55, 1, 905000.00, 855000.00, 'Brand: Fortinet\nModel No:FG 120G\nCountry of origin : USA\n\"Interface:\n1x RJ45 Console Port\n2x RJ45 HA and Management Ports\n16x GE RJ45 Ports\n4x 10GE SFP+FortiLink Slots\n8x SFP Ports\n1x USB Ports\"\nTrusted Platform Module (TPM) : Yes\nDual power supply : Yes\nAccess layer security : Yes\nFirewall Throughput (1518/512/64 byte UDP Packets): 39/39/28/Gbps\nFirewall Throughput (Packets Per Second): 42 Mbps\nMaximum Number of FortiTokens : 5000\nHigh Availability Configurations : Active-Active. Active-Passive, Clustering\nForm Factor (supports EIA/non-EIA standards): Rack Mount, 1 RU\nInternal Storage: 1 x 480 GB SSD\nLicense Type: UTP\nWarranty: 3 Years', 905000.00, '2026-06-25 08:47:04', '2026-06-25 08:47:04'),
(112, 11, 56, 1, 1754637.00, 1554637.00, 'Brand : Dell EMC\nModel No: PowerEdge R770 (Latest 16 Generation)\nCountry of origin: USA\nChassis Configuration: 2.5\" Chassis with up to 24 Drives (16 SAS4/SATA + 8 NVMe Direct), Front PERC 12 (H365i)\nProcessor: Intel® Xeon® 6 Performance 6515P 2.3G, 16C/32T, 24GT/s, 72M Cache, Turbo, (150W) DDR5-6400\nAdditional Processor: Intel® Xeon® 6 Performance 6515P 2.3G, 16C/32T, 24GT/s, 72M Cache, Turbo, (150W) DDR5-6400\nThermal Configuration: Heatsink for 2 CPU configuration (CPU less than 200W)\nMemory Configuration Type: Performance Optimized\nCache memory: 72MB per processor\nMemory: 128GB (4x16GB) Memory DDR5, RDIMM, 6400MT/s, Dual Rank\nRAID Configuration: C7, Unconfigured RAID for HDDs or SSDs (Mixed Drive Types Allowed)\nRAID/Internal Storage Controllers: PERC H365i Controller, Front, DCMHS\nHard Disk: 2.4TB Hard Drive SAS ISE 12Gbps 10K 512e 2.5in Hot-Plug\nSSD: 480GB SSD SATA Mixed Use 6Gbps 512e 2.5in Hot-plug AG Drive, 3 DWPD\nBIOS and Advanced System Configuration Settings: Power Saving Dell Active Power Controller\nAdvanced System Configurations: UEFI BIOS Boot Mode with GPT Partition\nFANS: PowerEdge 2U High Performance Gold Fan\nPower Supply: Dual, Fault Tolerant Redundant (1+1) Hot-Plug MHS PowerSupply,1100W MM (100-240Vac) Titanium\nPower Cords: NEMA 5-15P to C13 Wall Plug, 125 Volt, 15 AMP, 10 Feet (3m), Power Cord, North America\nPCIe Riser: Riser Config 6-1, Rear Half Length, 4x16 FH Slots (Gen5), 1x8/1x16 OCP (Gen5), 2nd OCP x16 (Gen5)\nMotherboard: PowerEdge R770 Motherboard for RTS1.2, DAO\n\"OCP 3.0 Network Adapters: Broadcom 5719 Quad Port 1GbE Base-T Adapter, OCP 3.0 NIC +Sec - 01 Pcs\nBroadcom 57412 Quad Port 10GbE Base-T adapter, OCP 3.0 NIC +Sec-01Pcs\"\nOCP 3.0 Accessories: 2 OCP - No Cable\nBezel: PowerEdge 2U Standard Bezel\nBoot Optimized Storage Cards: No BOSS card, Rear Blank\nEmbedded Systems Management: iDRAC10, Enterprise 17G (Dell Connectivity Client - Enabled 17G)\nKVM: Blank Left Ear Module\nForm Factor: ReadyRails Sliding Rails Without Cable Management Arm\nRegulatory: PowerEdge CCC, No CE Label Marking\nSupported Operating System: Microsoft Windows Server R2/2019 and 2022.2025 x64 (Includes Hyper-V), Sun Solaris 11.3, Novell, SUSE, Linux Enterprise Server, Red Hat Enterprise Linux, VMware, ESXi, Proxmox\n\"I/O Slots\nFront Ports\n• 1 x iDRAC Direct (Micro-AB USB) port\n• 1 x USB 2.0\n• 1 x VGA Rear Ports\n• 1 x Dedicated iDRAC Ethernet port\n• 1 x USB 2.0\n• 1 x USB 3.0\n• 1 x VGA\n• 1 x Serial (optional)\n• 1 x VGA (optional for Direct Liquid Cooling configuration) Internal Ports\n• 1 x USB 3.0 (optional)\"\nManageability: iDRAC16G Enterprise for remote Management Automatic Server Recovery, Alerts, Inventory, Troubleshooting.\nWarranty: 3 Years', 1754637.00, '2026-06-25 08:47:04', '2026-06-25 08:47:04'),
(115, 13, 58, 1, 0.00, 0.00, NULL, 0.00, '2026-06-25 09:42:33', '2026-06-25 09:42:33'),
(116, 20, 66, 1, 0.00, 0.00, 'product not available.', 0.00, '2026-06-25 09:45:29', '2026-06-25 09:45:29'),
(117, 21, 67, 1, 15500.00, 14500.00, NULL, 15500.00, '2026-06-25 10:17:19', '2026-06-25 10:17:19'),
(118, 22, 68, 1, NULL, 0.00, NULL, 0.00, '2026-06-25 10:20:24', '2026-06-25 10:20:24'),
(119, 23, 69, 1, NULL, 0.00, NULL, 0.00, '2026-06-25 10:23:45', '2026-06-25 10:23:45'),
(120, 24, 71, 1, 11500.00, 10500.00, NULL, 11500.00, '2026-06-25 10:28:33', '2026-06-25 10:28:33'),
(121, 25, 72, 1, NULL, 0.00, NULL, 0.00, '2026-06-25 10:31:16', '2026-06-25 10:31:16'),
(122, 26, 73, 1, 7000.00, 5500.00, NULL, 7000.00, '2026-06-25 10:32:10', '2026-06-25 10:32:10'),
(123, 27, 74, 1, 74000.00, 74000.00, 'Model: CBS350\n48 10/100/1000 ports\n4 Gigabit SFP\nMAC table Up to 16K addresses\nRack-mountable\nWarranty: 1 Year', 74000.00, '2026-06-25 10:34:55', '2026-06-25 10:34:55'),
(124, 28, 75, 1, NULL, 0.00, NULL, 0.00, '2026-06-25 10:35:59', '2026-06-25 10:35:59'),
(125, 29, 76, 1, NULL, 0.00, NULL, 0.00, '2026-06-25 10:37:42', '2026-06-25 10:37:42'),
(126, 30, 77, 1, 73000.00, 65000.00, NULL, 73000.00, '2026-06-25 10:44:52', '2026-06-25 10:44:52'),
(128, 31, 78, 1, 13000.00, 10500.00, 'Client price share kora hoyeche.', 13000.00, '2026-06-25 10:57:00', '2026-06-25 10:57:00'),
(130, 33, 80, 1, 13000.00, 12500.00, NULL, 13000.00, '2026-06-25 12:09:28', '2026-06-25 12:09:28'),
(133, 35, 82, 1, 1600.00, 1450.00, NULL, 1600.00, '2026-06-25 12:25:50', '2026-06-25 12:25:50'),
(135, 36, 43, 3, 28500.00, 24500.00, 'Model: Unifi U7 Pro\nWiFi standards: Wi-Fi 7 (802.11be), Tri Band\nThroughput: Up to 9335 Mb/s Total\nPower Consumption: ≤21 W\nInterface: 1x RJ45 2.5 GbE PoE+ (30 W, 802.3at)\nWarranty: 1 Year', 85500.00, '2026-06-25 12:32:38', '2026-06-25 12:32:38'),
(136, 19, 64, 9, 10400.00, 10000.00, 'Model: RP80VI/RP80VI-USE\nCutter: Auto Cutter\nMax. Print Speed: 150 mm/sec\nTape Size: 85 mm\nInterface: USB, LAN, Serial\nWarranty: 1 Year', 98526.32, '2026-06-25 12:33:45', '2026-06-25 12:33:45'),
(137, 34, 81, 12, 800.00, 323.00, 'Power Source: 220-240 V/AC\nPower Frequency: 50 Hz/60 Hz\n220V Rated Load:\nMax. 1200W\nMax. 300W', 9600.00, '2026-06-27 06:03:19', '2026-06-27 06:03:19'),
(138, 37, 83, 1, 8204.55, 5320.00, 'Warranty: 06 Months', 8636.36, '2026-06-27 08:15:42', '2026-06-27 08:15:42'),
(139, 37, 84, 8, 1339.00, 1040.00, 'Part Number: CPCSSZ2-09F015\nLength: 15Ft', 11275.79, '2026-06-27 08:15:42', '2026-06-27 08:15:42'),
(140, 37, 85, 1, 2850.00, 2600.00, NULL, 3000.00, '2026-06-27 08:15:42', '2026-06-27 08:15:42'),
(144, 41, 89, 1, 50000.00, 47000.00, 'Model: DINSTAR DAG2000-8S8O\nNumber of FXO ports :  08\nDTMF support : DTMF, R2, Vox/DTMF\nAnalog audio support : 24-bit\nWarranty: 1 Year', 50000.00, '2026-06-27 10:02:18', '2026-06-27 10:02:18'),
(146, 43, 91, 1, 3500.00, 2300.00, NULL, 3500.00, '2026-06-27 11:12:55', '2026-06-27 11:12:55'),
(148, 44, 94, 1, 5000.00, 4750.00, NULL, 5000.00, '2026-06-27 11:21:31', '2026-06-27 11:21:31'),
(149, 44, 95, 1, 12500.00, 12500.00, NULL, 12500.00, '2026-06-27 11:21:31', '2026-06-27 11:21:31'),
(150, 44, 96, 1, 5000.00, 4800.00, NULL, 5000.00, '2026-06-27 11:21:31', '2026-06-27 11:21:31'),
(151, 45, 97, 1, 6000.00, 5600.00, NULL, 6000.00, '2026-06-27 11:26:25', '2026-06-27 11:26:25'),
(152, 46, 98, 1, 1200.00, 1050.00, NULL, 1200.00, '2026-06-27 11:33:58', '2026-06-27 11:33:58'),
(158, 49, 104, 1, 157000.00, 155000.00, NULL, 157000.00, '2026-06-27 12:09:22', '2026-06-27 12:09:22'),
(159, 15, 60, 1, 3000.00, 2500.00, NULL, 3000.00, '2026-06-28 03:17:33', '2026-06-28 03:17:33'),
(160, 38, 86, 6, 18600.00, 15625.00, 'Brand: Dell\nModel: Wyse 5070\nProcessor: Quad-core Intel Celeron J4105\nRAM: 8GB\nStorage: 256GB M.2 SSD\nWarranty: 1  Month', 111600.00, '2026-06-28 04:32:14', '2026-06-28 04:32:14'),
(162, 50, 105, 1, 3150.00, 2950.00, NULL, 3150.00, '2026-06-28 04:35:08', '2026-06-28 04:35:08'),
(163, 40, 88, 1, 189400.00, 169400.00, 'Model: Apple Mac Mini M4\n10-core CPU, 10-core GPU, 16-core Neural Engine\nRAM: 24GB Unified Memory\nStorage: 512GB SSD\nWi-Fi 6E (802.11ax), Bluetooth 5.3\nGigabit Ethernet\nWarranty: 1 Year International', 189400.00, '2026-06-28 04:39:29', '2026-06-28 04:39:29'),
(164, 51, 106, 1, 0.00, 0.00, NULL, 0.00, '2026-06-28 04:42:57', '2026-06-28 04:42:57'),
(165, 52, 107, 1, 4500.00, 4400.00, NULL, 4500.00, '2026-06-28 04:47:41', '2026-06-28 04:47:41'),
(166, 53, 108, 1, 130000.00, 120000.00, NULL, 130000.00, '2026-06-28 04:55:51', '2026-06-28 04:55:51'),
(170, 55, 110, 3, 3050.00, 3000.00, NULL, 9150.00, '2026-06-28 06:35:36', '2026-06-28 06:35:36'),
(171, 32, 79, 1, 59000.00, 0.00, NULL, 59000.00, '2026-06-28 06:56:11', '2026-06-28 06:56:11'),
(172, 17, 62, 1, 20150.00, 17150.00, NULL, 21210.53, '2026-06-28 07:00:52', '2026-06-28 07:00:52'),
(173, 16, 61, 1, 15000.00, 6119.00, NULL, 15000.00, '2026-06-28 07:05:17', '2026-06-28 07:05:17'),
(174, 14, 59, 1, 160000.00, 155000.00, NULL, 160000.00, '2026-06-28 07:08:08', '2026-06-28 07:08:08'),
(175, 48, 111, 1, 350000.00, 129500.00, 'Model: WA65F / LH65WAFWLGCXZA\nProcessor: A73 X 4 + A53 X 4\nRam: 8GB\nStorage: 64GB\nDisplay Size: 65 Inch\nResolution: 3,840 x 2,160 (Landscape)\nOperating System: Android 14\nWarranty: 2 Years', 368421.05, '2026-06-28 08:22:10', '2026-06-28 08:22:10'),
(177, 57, 113, 1, NULL, 0.00, NULL, 0.00, '2026-06-28 09:21:02', '2026-06-28 09:21:02'),
(178, 58, 114, 1, 483650.00, 433650.00, NULL, 483650.00, '2026-06-28 09:59:43', '2026-06-28 09:59:43'),
(179, 58, 115, 1, 51000.00, 41300.00, NULL, 51000.00, '2026-06-28 09:59:43', '2026-06-28 09:59:43'),
(180, 58, 116, 1, 20000.00, 15050.00, NULL, 20000.00, '2026-06-28 09:59:43', '2026-06-28 09:59:43'),
(182, 60, 114, 1, 483650.00, 433650.00, NULL, 483650.00, '2026-06-28 10:34:24', '2026-06-28 10:34:24'),
(183, 60, 115, 1, 51000.00, 41300.00, NULL, 51000.00, '2026-06-28 10:34:24', '2026-06-28 10:34:24'),
(184, 60, 116, 1, 20000.00, 15050.00, NULL, 20000.00, '2026-06-28 10:34:24', '2026-06-28 10:34:24'),
(185, 61, 118, 1, 14000.00, 6500.00, NULL, 14000.00, '2026-06-28 10:38:57', '2026-06-28 10:38:57'),
(187, 59, 117, 5, 2800.00, 2500.00, NULL, 14000.00, '2026-06-28 10:49:28', '2026-06-28 10:49:28'),
(189, 63, 120, 1, 30000.00, 25000.00, NULL, 30000.00, '2026-06-28 10:50:19', '2026-06-28 10:50:19'),
(194, 64, 123, 7500, 23.00, 22.00, NULL, 172500.00, '2026-06-28 10:56:32', '2026-06-28 10:56:32'),
(195, 64, 124, 17, 3700.00, 3500.00, NULL, 62900.00, '2026-06-28 10:56:32', '2026-06-28 10:56:32'),
(196, 64, 125, 5, 4700.00, 4500.00, NULL, 23500.00, '2026-06-28 10:56:32', '2026-06-28 10:56:32'),
(197, 64, 126, 2, 7700.00, 7500.00, NULL, 15400.00, '2026-06-28 10:56:32', '2026-06-28 10:56:32'),
(199, 66, 128, 1, 28000.00, 26500.00, NULL, 28000.00, '2026-06-28 11:11:58', '2026-06-28 11:11:58'),
(206, 72, 134, 2, 35000.00, 34000.00, NULL, 70000.00, '2026-06-28 12:32:07', '2026-06-28 12:32:07'),
(208, 70, 132, 1, NULL, 0.00, NULL, 0.00, '2026-06-28 12:32:48', '2026-06-28 12:32:48'),
(209, 69, 131, 1, 73000.00, 68000.00, NULL, 73000.00, '2026-06-28 12:33:22', '2026-06-28 12:33:22'),
(210, 68, 130, 1, NULL, 0.00, NULL, 0.00, '2026-06-28 12:33:52', '2026-06-28 12:33:52'),
(211, 67, 129, 1, NULL, 0.00, NULL, 0.00, '2026-06-28 12:34:28', '2026-06-28 12:34:28'),
(212, 65, 127, 1, NULL, 0.00, NULL, 0.00, '2026-06-28 12:35:09', '2026-06-28 12:35:09'),
(213, 62, 119, 1, NULL, 0.00, NULL, 0.00, '2026-06-28 12:35:58', '2026-06-28 12:35:58'),
(214, 73, 135, 1, 15000.00, 14500.00, NULL, 15000.00, '2026-06-29 05:20:50', '2026-06-29 05:20:50'),
(220, 71, 133, 1, 324500.00, 294500.00, NULL, 324500.00, '2026-06-29 05:48:49', '2026-06-29 05:48:49'),
(221, 39, 87, 4, 36220.00, 26220.00, 'Processor: Intel Core i5 8th Gen\nRAM: 8GB DDR4 Memory\nSSD: 256GB M.2 SSD\nGraphics: Intel HD Graphics\nWarranty: 3 Months', 144880.00, '2026-06-29 05:50:50', '2026-06-29 05:50:50'),
(223, 74, 136, 2, 37000.00, 36000.00, NULL, 74000.00, '2026-06-29 06:02:28', '2026-06-29 06:02:28'),
(224, 75, 137, 16, 63000.00, 59999.00, NULL, 1008000.00, '2026-06-29 06:14:49', '2026-06-29 06:14:49'),
(225, 56, 112, 4, 8000.00, 7500.00, NULL, 32000.00, '2026-06-29 06:17:53', '2026-06-29 06:17:53'),
(227, 76, 138, 1, 36550.00, 32550.00, 'Warranty: 3 Years', 36550.00, '2026-06-29 06:30:23', '2026-06-29 06:30:23'),
(231, 77, 139, 1, 0.00, 0.00, NULL, 0.00, '2026-06-29 07:54:11', '2026-06-29 07:54:11'),
(232, 54, 109, 1, 37500.00, 35000.00, NULL, 37500.00, '2026-06-29 07:55:00', '2026-06-29 07:55:00'),
(233, 42, 90, 1, NULL, 0.00, NULL, 0.00, '2026-06-29 07:56:18', '2026-06-29 07:56:18'),
(235, 78, 140, 1, 8500.00, 0.00, NULL, 8500.00, '2026-06-29 07:57:49', '2026-06-29 07:57:49'),
(236, 79, 141, 1, 30000.00, 29500.00, NULL, 30000.00, '2026-06-29 09:26:47', '2026-06-29 09:26:47'),
(237, 47, 99, 5, NULL, 6745.00, 'Brand: Autonics\nModel: E50S8-1000-3-T-24\nMade in China', 0.00, '2026-06-29 09:39:49', '2026-06-29 09:39:49'),
(238, 47, 100, 5, NULL, 5130.00, 'Brand: Autonics\nModel: CT6S-2P\nMade in China', 0.00, '2026-06-29 09:39:49', '2026-06-29 09:39:49'),
(239, 47, 101, 15, NULL, 8265.00, 'Brand:  RKC Instrument Inc\nModel: RS400\nSize: 48 × 96 mm\nSupply Voltage: 240 VAC\nMade in Japan', 0.00, '2026-06-29 09:39:49', '2026-06-29 09:39:49'),
(240, 47, 102, 5, NULL, 304.00, 'M', 0.00, '2026-06-29 09:39:49', '2026-06-29 09:39:49');

-- --------------------------------------------------------

--
-- Table structure for table `sales`
--

CREATE TABLE `sales` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `requirement_id` bigint(20) UNSIGNED NOT NULL,
  `customer_id` bigint(20) UNSIGNED NOT NULL,
  `amount` decimal(12,2) NOT NULL,
  `sale_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sales`
--

INSERT INTO `sales` (`id`, `requirement_id`, `customer_id`, `amount`, `sale_date`, `created_at`, `updated_at`) VALUES
(2, 5, 56, 135400.00, '2026-06-23 14:29:45', '2026-06-23 14:29:45', '2026-06-23 14:29:45'),
(3, 6, 56, 132500.00, '2026-06-23 14:46:46', '2026-06-23 14:46:46', '2026-06-23 14:46:46'),
(4, 9, 60, 40000.00, '2026-06-24 11:17:22', '2026-06-24 11:17:22', '2026-06-24 11:17:22'),
(7, 37, 90, 25203.37, '2026-06-27 08:18:01', '2026-06-27 08:18:01', '2026-06-27 08:18:01'),
(8, 43, 99, 3500.00, '2026-06-27 11:13:13', '2026-06-27 11:13:13', '2026-06-27 11:13:13');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('dYAuXo0M2XYYQPXviFQLYFVHdEuiSCDuatL0XmwI', 54, '103.181.42.24', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiRDlYbFpzbVZEVFd5ckxNbXhNakRJN3czMUczcGZUWkNjenZDaU1EMCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6NTQ7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NzI6Imh0dHBzOi8vY3J5c3RhbHZpc2lvbnNvbHV0aW9ucy51cy9mb2xsb3ctdXBzP3BlcmlvZD10b2RheSZzdGF0dXM9cGVuZGluZyI7czo1OiJyb3V0ZSI7czoxNjoiZm9sbG93LXVwcy5pbmRleCI7fX0=', 1782725745),
('FjFFJsjvKLJasEFKBeNWaAQKKkrwv5WbVh0iQ2NV', 53, '119.40.85.66', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoidzUwRWRyNkRjcE1wM1hhUElZelFYNk8zQ2pKcTh1dlN5dnFMZjhkbyI7czozOiJ1cmwiO2E6MDp7fXM6OToiX3ByZXZpb3VzIjthOjI6e3M6MzoidXJsIjtzOjQ2OiJodHRwczovL2NyeXN0YWx2aXNpb25zb2x1dGlvbnMudXMvcmVxdWlyZW1lbnRzIjtzOjU6InJvdXRlIjtzOjE4OiJyZXF1aXJlbWVudHMuaW5kZXgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aTo1Mzt9', 1782727399),
('JuIGwW4s5Rd6zNZeneyhhOhzNSLsUFfzL4T1e7yV', 55, '119.40.85.66', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiSG45UVM3ekh6UWpnTUxvVDNJdlpYUE1pNmxRMEdHcUNEcnV1bDc1NiI7czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6NTU7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDM6Imh0dHBzOi8vY3J5c3RhbHZpc2lvbnNvbHV0aW9ucy51cy9kYXNoYm9hcmQiO3M6NToicm91dGUiO3M6OToiZGFzaGJvYXJkIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1782723491),
('q52sGsO0B4wbnk4xG8GYD5GyD7dPbUjFnVYBOYPS', NULL, '46.224.210.134', 'Mozilla/5.0 (compatible; WebatlaBot/1.0; +https://bot.webatla.com; abuse@webatla.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSTRzR2xYbzVYVkdGdHdqQ0tYVlM1MkkwRmcyWENtdlFYcG82ZGtaeSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzM6Imh0dHBzOi8vY3J5c3RhbHZpc2lvbnNvbHV0aW9ucy51cyI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1782718680),
('RPtFvjCh3bRHnOllS4Wq5gv8ZAf1oE65pcGLOVnG', 1, '103.181.42.24', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiNjJqRnFsU3VNVmU5ZmN0a3U5cmlPbmx3eEVQbko1aW5XUnpIdXR3eCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDI6Imh0dHA6Ly9jcnlzdGFsdmlzaW9uc29sdXRpb25zLnVzL2Rhc2hib2FyZCI7czo1OiJyb3V0ZSI7czo5OiJkYXNoYm9hcmQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=', 1782727542),
('sRrMzL1RQlnS2ExUku0piodYLPzmWYvK9unlZyKz', NULL, '46.224.210.134', 'Mozilla/5.0 (compatible; WebatlaBot/1.0; +https://bot.webatla.com; abuse@webatla.com)', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUnpZbEt4V0JMUU5ISktJVEhFalZ5SmxMT1pyZUFXc0xGSzBCWkl3QSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mzk6Imh0dHBzOi8vY3J5c3RhbHZpc2lvbnNvbHV0aW9ucy51cy9sb2dpbiI7czo1OiJyb3V0ZSI7czo1OiJsb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1782718680),
('VahrUJs4EBAQrAhnG9aqKFdGhYo9MBjmsWjeAFrv', 54, '119.40.85.66', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiN0t4NUwwSmhLUU0wZUJrM3dtSTMwcEFzQkFxd3pBV0VuaVhlckhIZiI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NzQ6Imh0dHBzOi8vY3J5c3RhbHZpc2lvbnNvbHV0aW9ucy51cy9yZXF1aXJlbWVudHM/cGVyaW9kPXRvdGFsJnN0YXR1cz1wZW5kaW5nIjtzOjU6InJvdXRlIjtzOjE4OiJyZXF1aXJlbWVudHMuaW5kZXgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aTo1NDt9', 1782726041);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `key` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `key`, `value`, `created_at`, `updated_at`) VALUES
(1, 'app_name', 'Crystal Vision Solutions', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(2, 'email', 'crystalsolutionsbd@gmail.com', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(3, 'phone', '01730-495650', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(4, 'address', 'Tower 71, Level-8, Near ECB Circle, Dhaka Cantonment, Dhaka-1206', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(5, 'website_url', 'http://www.crystalcomputers.com.bd', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(6, 'branding_slogan', 'LEADING ICT AND SECURITY SERVICES PROVIDER', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(7, 'branding_services_bar', 'Server | Server Spare Parts | Networking Equipment\'s | Security Equipment\'s | Sound Equipment\'s | Smart Device | Interactive Display', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(8, 'support_whatsapp', NULL, '2026-06-20 04:17:27', '2026-06-24 10:08:20'),
(9, 'office_name_1', 'Elephant Road Branch', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(10, 'office_address_1', 'Tabas Building (Level-5), 53/2 New Elephant Road\r\nDhaka-1205, Bangladesh', '2026-06-20 04:17:27', '2026-06-23 07:40:49'),
(11, 'office_name_2', 'Corporate Office', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(12, 'office_address_2', 'Tower 71 (Level-8, C-9), 516/3 South Manikdi, Near ECB Circle\r\nDhaka Cantonment, Dhaka-1206, Bangladesh', '2026-06-20 04:17:27', '2026-06-23 07:40:50'),
(13, 'office_name_3', 'Service Centre', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(14, 'office_address_3', 'Tabas Building (Level-5), 53/2 New Elephant Road\r\nDhaka-1205, Bangladesh', '2026-06-20 04:17:27', '2026-06-23 07:40:50'),
(15, 'footer_contact_info', 'E-mail: info@crystalcomputers.com.bd, Hunting: 09666733744, Mobile: 01730-495650, 01730-495651', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(16, 'pdf_sender_office_info', '<strong>Corporate Office:</strong> Tower 71, Level-8, Near ECB Circle, Dhaka Cantonment, Dhaka-1206', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(17, 'paginated_quantity', '10', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(18, 'default_vat', '0', '2026-06-20 04:26:22', '2026-06-20 04:27:19'),
(19, 'default_ait', '0', '2026-06-20 04:26:22', '2026-06-20 04:27:19'),
(20, 'quotation_thanks_text', NULL, '2026-06-20 04:26:22', '2026-06-20 04:26:22'),
(21, 'site_logo', 'settings/82tv6O3rQAx48mfJsAPkegN4mVLwMnrLtT4MVGVe.png', '2026-06-23 07:40:49', '2026-06-23 10:17:53'),
(22, 'logo', 'settings/ioVIBDtLNbTX3LasBtj95Wowd5c3RCDR3fX3sGci.png', '2026-06-23 07:40:49', '2026-06-23 10:17:53'),
(23, 'secondary_logo', 'settings/bBcFlCcy7QDJCmjNKymqA5VQt2TGPZboZYNThEkA.png', '2026-06-23 07:40:49', '2026-06-23 10:17:53'),
(24, 'favicon', 'settings/z155YhDvXjv6HvxN4BxH03JsSE6hYwDdd93GFHd5.png', '2026-06-23 07:40:49', '2026-06-23 10:17:53'),
(25, 'company_seal', 'settings/Mjpf2Pziwu2KZemg5kJuYyTqrJkgjTn59HRGT5hS.png', '2026-06-23 07:40:49', '2026-06-23 10:17:53');

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `short_form` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `title`, `short_form`, `created_at`, `updated_at`) VALUES
(1, 'Piece', 'Pcs', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(2, 'Kilogram', 'KG', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(3, 'Meter', 'Mtr', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(4, 'Gram', 'g', '2026-06-20 04:17:27', '2026-06-20 23:16:59'),
(5, 'Box', 'Box', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(6, 'Pack', 'Pack', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(7, 'Set', 'Set', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(8, 'Roll', 'Roll', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(9, 'Litre', 'Ltr', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(10, 'Inch', 'Inch', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(11, 'Feet', 'Ft', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(12, 'Unit', 'Unit', '2026-06-24 11:49:06', '2026-06-24 11:49:06'),
(13, 'Pair', 'Pair', '2026-06-24 13:33:03', '2026-06-24 13:33:03'),
(14, 'Job', 'Job', '2026-06-29 05:55:48', '2026-06-29 05:55:48');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `two_factor_secret` text DEFAULT NULL,
  `two_factor_recovery_codes` text DEFAULT NULL,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `role` enum('super_admin','user') NOT NULL DEFAULT 'user',
  `signature` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `designation` varchar(255) DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `role`, `signature`, `phone`, `designation`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Admin', 'admin@example.com', '2026-06-20 04:17:28', '$2y$12$HjWCk4M.qNvvQOVPkzDnuOxt7cSmrtiNbwZFrv8REtvnzL.8mj6Ne', NULL, NULL, NULL, 'super_admin', 'signatures/JJX50DV6j4hlCdxu2KXIxNoQZI3OdtLBGFpMPHkF.png', '01900000000', 'Asst. Manager', NULL, '2026-06-20 04:17:28', '2026-06-25 05:40:03'),
(52, 'Mr Shahin', 'shahin@example.com', NULL, '$2y$12$9ubnWPiEHknEvPXmpAY.E.cqoDgIurApvzGI9PkcczZ33dVfGJ8TK', NULL, NULL, NULL, 'user', 'signatures/38OXHkQe3lr4JTYznkNH8VrvsCuuMbR4rdjzg3GY.png', '01700000000', 'Manager', NULL, '2026-06-23 08:16:56', '2026-06-23 08:16:56'),
(53, 'Md Ismayel Sarker', 'ismayel@crystalcomputers.com.bd', NULL, '$2y$12$JERa2KNhV/zw3qV3L7gBuehfshK5l5ueJId8xy/XaownwFtQatnOK', NULL, NULL, NULL, 'user', 'signatures/6cf94zajW5eXSBkP34jPLo7JS6HVS1nrp6I5YOMh.png', '01335189586', 'Executive', NULL, '2026-06-23 11:09:29', '2026-06-25 04:34:27'),
(54, 'Sk Al Akib', 'akib@crystalcomputers.com.bd', NULL, '$2y$12$5JRBRIGu3vQZkes4BBEZwu96/e07jpiWqS2/hHPNLuKLfznU81lBK', NULL, NULL, NULL, 'user', 'signatures/QoixgqvyAdjSEwE9NKZlDfIMHCmMxpn1rbDFwuCD.png', '01332803466', 'Asst. Manager, Corporate Communication', NULL, '2026-06-23 13:31:06', '2026-06-25 07:49:35'),
(55, 'Shakib', 'shakib@crystalcomputers.com.bd', NULL, '$2y$12$juahKymLH6fUGCG4vjyTF..PSo0dzGYfqXT1k.JJJb9x1abPqscY.', NULL, NULL, NULL, 'user', 'signatures/M4GdMiNsYDXWJ1uz2ZzIRGYWzG227IIlbGsS9ahC.png', '01806974183', 'Jr.Executive', 'u0ovl6kOCblBAnlkc4Su0YeGtNoLw0Aq0X68LDIM9tRrTLGNmSOnthoUhVTw', '2026-06-25 04:20:38', '2026-06-25 04:48:53'),
(56, 'Eyalid Hasan Shawon', 'shawon@crystalcomputers.com.bd', NULL, '$2y$12$6y7rTqjx0/41RYveFbcJJeMWyzoZe2LgmDktZuqNhNQ.tO7t/2sJi', NULL, NULL, NULL, 'user', 'signatures/ZGC0z63DpHQi7kuosucxwcSmDMTs05FyjpUkrXeQ.png', '01335189589', 'Jr. Executive', NULL, '2026-06-25 04:23:02', '2026-06-25 05:18:34');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Indexes for table `companies`
--
ALTER TABLE `companies`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `companies_name_unique` (`name`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `customers_company_id_foreign` (`company_id`),
  ADD KEY `customers_assigned_to_index` (`assigned_to`),
  ADD KEY `customers_status_index` (`status`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `follow_ups`
--
ALTER TABLE `follow_ups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `follow_ups_customer_id_foreign` (`customer_id`),
  ADD KEY `follow_ups_requirement_id_foreign` (`requirement_id`),
  ADD KEY `follow_ups_user_id_follow_up_date_index` (`user_id`,`follow_up_date`),
  ADD KEY `follow_ups_status_index` (`status`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `meetings`
--
ALTER TABLE `meetings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `meetings_customer_id_foreign` (`customer_id`),
  ADD KEY `meetings_requirement_id_foreign` (`requirement_id`),
  ADD KEY `meetings_user_id_scheduled_at_index` (`user_id`,`scheduled_at`),
  ADD KEY `meetings_meeting_type_index` (`meeting_type`),
  ADD KEY `meetings_status_index` (`status`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_unit_id_foreign` (`unit_id`),
  ADD KEY `products_name_index` (`name`),
  ADD KEY `products_category_index` (`category`),
  ADD KEY `products_supplier_name_index` (`supplier_name`);

--
-- Indexes for table `requirements`
--
ALTER TABLE `requirements`
  ADD PRIMARY KEY (`id`),
  ADD KEY `requirements_send_qutation_to_foreign` (`send_qutation_to`),
  ADD KEY `requirements_qutation_send_by_foreign` (`qutation_send_by`),
  ADD KEY `requirements_customer_id_index` (`customer_id`),
  ADD KEY `requirements_user_id_foreign` (`user_id`);

--
-- Indexes for table `requirement_accessories`
--
ALTER TABLE `requirement_accessories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `requirement_accessories_requirement_id_foreign` (`requirement_id`),
  ADD KEY `requirement_accessories_unit_id_foreign` (`unit_id`);

--
-- Indexes for table `requirement_installations`
--
ALTER TABLE `requirement_installations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `requirement_installations_requirement_id_foreign` (`requirement_id`),
  ADD KEY `requirement_installations_unit_id_foreign` (`unit_id`);

--
-- Indexes for table `requirement_items`
--
ALTER TABLE `requirement_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `requirement_items_requirement_id_foreign` (`requirement_id`),
  ADD KEY `requirement_items_product_id_foreign` (`product_id`);

--
-- Indexes for table `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sales_requirement_id_foreign` (`requirement_id`),
  ADD KEY `sales_customer_id_foreign` (`customer_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `settings_key_unique` (`key`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `units_title_unique` (`title`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `companies`
--
ALTER TABLE `companies`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=144;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `follow_ups`
--
ALTER TABLE `follow_ups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `meetings`
--
ALTER TABLE `meetings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT for table `requirements`
--
ALTER TABLE `requirements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- AUTO_INCREMENT for table `requirement_accessories`
--
ALTER TABLE `requirement_accessories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `requirement_installations`
--
ALTER TABLE `requirement_installations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `requirement_items`
--
ALTER TABLE `requirement_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=241;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `customers`
--
ALTER TABLE `customers`
  ADD CONSTRAINT `customers_assigned_to_foreign` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `customers_company_id_foreign` FOREIGN KEY (`company_id`) REFERENCES `companies` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `follow_ups`
--
ALTER TABLE `follow_ups`
  ADD CONSTRAINT `follow_ups_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `follow_ups_requirement_id_foreign` FOREIGN KEY (`requirement_id`) REFERENCES `requirements` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `follow_ups_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `meetings`
--
ALTER TABLE `meetings`
  ADD CONSTRAINT `meetings_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `meetings_requirement_id_foreign` FOREIGN KEY (`requirement_id`) REFERENCES `requirements` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `meetings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_unit_id_foreign` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `requirements`
--
ALTER TABLE `requirements`
  ADD CONSTRAINT `requirements_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `requirements_qutation_send_by_foreign` FOREIGN KEY (`qutation_send_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `requirements_send_qutation_to_foreign` FOREIGN KEY (`send_qutation_to`) REFERENCES `customers` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `requirements_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `requirement_accessories`
--
ALTER TABLE `requirement_accessories`
  ADD CONSTRAINT `requirement_accessories_requirement_id_foreign` FOREIGN KEY (`requirement_id`) REFERENCES `requirements` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `requirement_accessories_unit_id_foreign` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `requirement_installations`
--
ALTER TABLE `requirement_installations`
  ADD CONSTRAINT `requirement_installations_requirement_id_foreign` FOREIGN KEY (`requirement_id`) REFERENCES `requirements` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `requirement_installations_unit_id_foreign` FOREIGN KEY (`unit_id`) REFERENCES `units` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `requirement_items`
--
ALTER TABLE `requirement_items`
  ADD CONSTRAINT `requirement_items_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `requirement_items_requirement_id_foreign` FOREIGN KEY (`requirement_id`) REFERENCES `requirements` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `sales_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `sales_requirement_id_foreign` FOREIGN KEY (`requirement_id`) REFERENCES `requirements` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
