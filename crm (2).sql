-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 22, 2026 at 08:22 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `crm`
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
('crystal-vision-solutions-cache-275856c4e11a2f33a742574a64e01f49', 'i:1;', 1782024015),
('crystal-vision-solutions-cache-275856c4e11a2f33a742574a64e01f49:timer', 'i:1782024015;', 1782024015),
('crystal-vision-solutions-cache-59e0368d2b893b2970b3042e5d445df7', 'i:1;', 1782025958),
('crystal-vision-solutions-cache-59e0368d2b893b2970b3042e5d445df7:timer', 'i:1782025958;', 1782025958),
('crystal-vision-solutions-cache-dc44958e29ffba8b810d21377ae366b5', 'i:1;', 1782109028),
('crystal-vision-solutions-cache-dc44958e29ffba8b810d21377ae366b5:timer', 'i:1782109028;', 1782109028),
('crystal-vision-solutions-cache-settings.all', 'O:29:\"Illuminate\\Support\\Collection\":2:{s:8:\"\0*\0items\";a:20:{s:8:\"app_name\";s:24:\"Crystal Vision Solutions\";s:5:\"email\";s:28:\"crystalsolutionsbd@gmail.com\";s:5:\"phone\";s:12:\"01730-495650\";s:7:\"address\";s:64:\"Tower 71, Level-8, Near ECB Circle, Dhaka Cantonment, Dhaka-1206\";s:11:\"website_url\";s:34:\"http://www.crystalcomputers.com.bd\";s:15:\"branding_slogan\";s:42:\"LEADING ICT AND SECURITY SERVICES PROVIDER\";s:21:\"branding_services_bar\";s:132:\"Server | Server Spare Parts | Networking Equipment\'s | Security Equipment\'s | Sound Equipment\'s | Smart Device | Interactive Display\";s:16:\"support_whatsapp\";s:12:\"01911-561554\";s:13:\"office_name_1\";s:20:\"Elephant Road Branch\";s:16:\"office_address_1\";s:71:\"Tabas Building (Level-5), 53/2 New Elephant Road\nDhaka-1205, Bangladesh\";s:13:\"office_name_2\";s:16:\"Corporate Office\";s:16:\"office_address_2\";s:102:\"Tower 71 (Level-8, C-9), 516/3 South Manikdi, Near ECB Circle\nDhaka Cantonment, Dhaka-1206, Bangladesh\";s:13:\"office_name_3\";s:14:\"Service Centre\";s:16:\"office_address_3\";s:71:\"Tabas Building (Level-5), 53/2 New Elephant Road\nDhaka-1205, Bangladesh\";s:19:\"footer_contact_info\";s:94:\"E-mail: info@crystalcomputers.com.bd, Hunting: 09666733744, Mobile: 01730-495650, 01730-495651\";s:22:\"pdf_sender_office_info\";s:99:\"<strong>Corporate Office:</strong> Tower 71, Level-8, Near ECB Circle, Dhaka Cantonment, Dhaka-1206\";s:18:\"paginated_quantity\";s:2:\"10\";s:11:\"default_vat\";s:1:\"0\";s:11:\"default_ait\";s:1:\"0\";s:21:\"quotation_thanks_text\";N;}s:28:\"\0*\0escapeWhenCastingToString\";b:0;}', 2097311239);

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
(1, 'Jenkins, Johnston and Little', 'schmitt.stacey@example.net', '1-316-898-5115', 'http://sipes.net/', '5944 Carlo Circles\nLake Samantamouth, MT 54565', '2025-06-21 04:17:27', '2025-06-21 04:17:27'),
(2, 'Hackett-Ankunding', 'aufderhar.jettie@example.net', '1-574-717-4065', 'https://www.ryan.net/animi-et-et-eum-consectetur-tempora-sunt', '98810 Trinity Well\nPort Benjamin, ME 96989', '2026-06-16 04:17:27', '2026-06-16 04:17:27'),
(3, 'Kerluke, Shields and O\'Connell', 'ken.beatty@example.com', '+1-743-848-9607', 'http://cummerata.com/', '61386 Rogahn Drive\nKurtside, NM 50352-7485', '2026-05-01 04:17:27', '2026-05-01 04:17:27'),
(4, 'O\'Keefe Group', 'qhirthe@example.org', '(303) 859-7248', 'http://www.carter.com/', '58589 Cormier Streets Suite 594\nSouth Clementine, NM 17303-9466', '2025-06-29 04:17:27', '2025-06-29 04:17:27'),
(5, 'Kris, Pfeffer and Schaden', 'ledner.emmet@example.com', '1-412-680-8064', 'http://www.rodriguez.com/', '44976 Ebony Fort\nPort Elnaport, IL 82930', '2026-04-22 04:17:27', '2026-04-22 04:17:27'),
(6, 'Borer, Schowalter and Russel', 'lklein@example.com', '(574) 384-8909', 'https://www.harvey.com/similique-velit-nulla-deleniti-adipisci', '9871 Romaguera Mall\nEast Bertrandshire, ID 89973-8255', '2026-06-19 04:17:27', '2026-06-19 04:17:27'),
(7, 'Berge LLC', 'batz.camren@example.com', '+1 (650) 856-8984', 'http://kessler.org/ipsam-est-aperiam-maiores-dolorem-et-sunt-fuga', '47145 Samara Divide Apt. 877\nWest Hugh, MO 08883', '2026-04-22 04:17:27', '2026-04-22 04:17:27'),
(8, 'Kuvalis, Cassin and Strosin', 'priscilla.conroy@example.net', '331.463.7439', 'https://ward.com/voluptatum-nihil-eos-consectetur.html', '3531 Schoen Passage\nLavonneborough, TN 89085-5914', '2026-06-19 04:17:27', '2026-06-19 04:17:27'),
(9, 'Boyle-Schuster', 'cortiz@example.com', '631.565.5987', 'http://www.bashirian.com/quo-facere-et-ad-eveniet-veniam-aliquid-qui.html', '60239 Domingo Run Suite 680\nEast Connie, MD 64290-1445', '2026-04-30 04:17:27', '2026-04-30 04:17:27'),
(10, 'Haag PLC', 'progahn@example.org', '386.755.3528', 'https://rempel.com/quod-rerum-voluptas-dolorem-nostrum-esse-qui-mollitia-consequuntur.html', '87057 Marilie Harbor\nSmithammouth, VT 78283-5106', '2025-07-07 04:17:27', '2025-07-07 04:17:27'),
(11, 'VonRueden Ltd', 'vbode@example.com', '(207) 743-1835', 'http://www.keebler.info/vitae-inventore-iste-fugiat-sed-placeat', '545 Della Port\nSouth Alanisstad, AR 77245', '2026-04-29 04:17:27', '2026-04-29 04:17:27'),
(12, 'Raynor-Stokes', 'erdman.claire@example.org', '1-351-825-9590', 'http://gerhold.org/assumenda-nihil-ut-dolor-nihil-ut-accusamus-ducimus.html', '21418 Conn Ville\nNew Imani, NM 03048', '2026-06-18 04:17:27', '2026-06-18 04:17:27'),
(13, 'Von, Kertzmann and Murray', 'murray.anais@example.org', '+1-214-239-0637', 'http://www.littel.com/et-vel-eaque-excepturi-maxime-non.html', '225 Erdman Stream\nSouth Herminamouth, PA 45624-6702', '2025-07-03 04:17:27', '2025-07-03 04:17:27'),
(14, 'Watsica-Kunde', 'glover.moses@example.net', '1-360-217-6262', 'https://swift.biz/harum-blanditiis-quos-adipisci-omnis-quibusdam-unde-voluptatem-placeat.html', '844 Alessia Light Apt. 196\nQuitzonchester, TN 92957', '2026-06-14 04:17:27', '2026-06-14 04:17:27'),
(15, 'Feeney, Abshire and Sipes', 'arjun.pagac@example.net', '+1 (559) 973-9462', 'http://www.brown.com/sint-qui-voluptas-velit-quis-harum-sunt.html', '415 Runte Hollow\nThelmastad, AK 63169', '2026-06-17 04:17:27', '2026-06-17 04:17:27'),
(16, 'Bruen Group', 'ursula68@example.net', '1-678-292-1486', 'http://www.mccullough.org/', '4673 Woodrow Union\nStanfordborough, AL 74198-1841', '2025-06-24 04:17:27', '2025-06-24 04:17:27'),
(17, 'Kuhn Inc', 'erdman.annie@example.com', '1-781-472-1038', 'http://feil.info/', '27146 Roderick Knolls Suite 972\nNorth Hellen, PA 51050-7288', '2026-06-15 04:17:27', '2026-06-15 04:17:27'),
(18, 'Hansen-Cassin', 'chance39@example.com', '+1 (262) 916-1919', 'http://schimmel.info/sed-et-mollitia-voluptate-aspernatur-ad-dignissimos-dolore-et', '716 Gorczany Landing Suite 534\nWest Rosiemouth, TX 28994', '2026-04-23 04:17:27', '2026-04-23 04:17:27'),
(19, 'McClure Inc', 'drempel@example.com', '+1-352-915-1998', 'http://steuber.org/', '2789 Jeff Rue Apt. 763\nGoyetteton, DC 53564-7932', '2026-04-21 04:17:27', '2026-04-21 04:17:27'),
(20, 'King Ltd', 'gusikowski.tressa@example.com', '248.816.6060', 'http://www.buckridge.com/qui-quaerat-qui-sit', '11136 Celestine Port Suite 252\nWest Deron, NH 49673', '2026-04-21 04:17:27', '2026-04-21 04:17:27'),
(21, 'Purdy-Bode', 'henry44@example.org', '+1 (385) 282-3793', 'http://nitzsche.info/ut-dolor-dolorem-nesciunt-autem-nam-doloremque', '533 Schmidt Stream\nLabadieview, MN 54993', '2026-06-14 04:17:27', '2026-06-14 04:17:27'),
(22, 'Haley and Sons', 'rosemary47@example.org', '+1-562-852-9665', 'http://hermann.com/autem-dolore-asperiores-sed-nemo-facere-et-quia', '76109 Ollie Mill Apt. 494\nFranciscaview, ID 47402', '2026-04-27 04:17:27', '2026-04-27 04:17:27'),
(23, 'Wunsch PLC', 'eleazar.feeney@example.com', '504-696-1252', 'http://mann.biz/id-voluptatem-eveniet-autem-velit-voluptates-non-consectetur.html', '175 Cole Path\nPort Kelsi, TX 31550-2467', '2025-06-20 04:17:27', '2025-06-20 04:17:27'),
(24, 'Legros, Nolan and Johnson', 'pgulgowski@example.com', '+1-302-402-7106', 'http://www.emard.com/enim-quis-qui-incidunt', '6246 Durward Plains\nDelphiamouth, UT 84716', '2025-07-01 04:17:27', '2025-07-01 04:17:27'),
(25, 'Schmitt Group', 'meta.walter@example.net', '+1-854-279-8785', 'http://witting.com/dignissimos-quisquam-facere-quae-ea-omnis-id', '804 Kenyatta Shores\nEast Autumn, IL 75100', '2026-04-28 04:17:27', '2026-04-28 04:17:27'),
(26, 'Hackett-Deckow', 'jeremy32@example.org', '707-664-1840', 'http://weimann.com/molestiae-deserunt-vero-non-voluptates-sit-alias-doloribus-distinctio', '38057 Wiegand Drive Apt. 261\nNew Hectorchester, KY 87384-8049', '2026-04-21 04:17:27', '2026-04-21 04:17:27'),
(27, 'Rohan, Swaniawski and Morissette', 'hshanahan@example.com', '(678) 378-3088', 'http://farrell.com/neque-possimus-laudantium-mollitia-unde-rerum-eveniet', '24946 Johns Ranch\nMcKenziemouth, WA 86131-3839', '2026-06-19 04:17:27', '2026-06-19 04:17:27'),
(28, 'Price-Bauch', 'carlee.haley@example.net', '+1-704-289-6187', 'http://www.herzog.com/nemo-aut-quia-repellat-minus-veritatis-ducimus-id-voluptatem', '2891 Tessie Extensions Suite 518\nEmeliebury, ND 68533', '2026-05-02 04:17:27', '2026-05-02 04:17:27'),
(29, 'Mayert Inc', 'oschaefer@example.com', '680-584-2999', 'http://lebsack.com/', '185 Windler Trace Suite 323\nGleichnerfort, RI 68409', '2026-04-22 04:17:27', '2026-04-22 04:17:27'),
(30, 'Zemlak Ltd', 'whomenick@example.com', '+1.272.812.4148', 'http://bode.com/', '612 Cronin Views\nKennedyland, AL 10318', '2026-06-15 04:17:27', '2026-06-15 04:17:27'),
(31, 'Bergnaum Ltd', 'vada.wiegand@example.com', '405.231.5223', 'http://www.towne.org/sit-blanditiis-deleniti-voluptas', '586 Elsa Walk\nSouth Modesto, OR 66375', '2026-05-04 04:17:27', '2026-05-04 04:17:27'),
(32, 'Stiedemann PLC', 'sienna.okeefe@example.com', '(248) 619-7853', 'http://barton.com/et-enim-dolores-quis-sint-ut', '481 Wisozk Wall Apt. 578\nAufderharton, MS 88957', '2026-04-27 04:17:27', '2026-04-27 04:17:27'),
(33, 'Littel Ltd', 'edgardo.oconnell@example.net', '813.313.5737', 'http://www.kemmer.com/voluptatem-quis-cum-veniam-at-expedita-earum-explicabo.html', '19897 Frami Crescent\nJasminburgh, CO 32802', '2025-07-08 04:17:27', '2025-07-08 04:17:27'),
(34, 'Murray PLC', 'powlowski.reginald@example.org', '+1-651-791-2870', 'http://www.emard.com/magnam-exercitationem-quas-rerum-omnis-non-magni', '5783 Saul Gateway Apt. 454\nEast Estefania, ID 77703', '2026-06-17 04:17:27', '2026-06-17 04:17:27'),
(35, 'Krajcik, Kuphal and Toy', 'fwintheiser@example.org', '281.582.2618', 'http://www.haley.com/at-veniam-aut-at-quidem', '666 Johns Circles Suite 035\nLake Reggie, GA 90439-8655', '2026-06-19 04:17:27', '2026-06-19 04:17:27'),
(36, 'Borer-Runolfsdottir', 'marquardt.aliza@example.net', '1-223-975-1620', 'http://www.lockman.com/unde-harum-sint-id-itaque-dolores-impedit.html', '31308 Luigi Course Suite 268\nNew Katelinberg, UT 31281', '2026-04-23 04:17:27', '2026-04-23 04:17:27'),
(37, 'Trantow Ltd', 'bmosciski@example.net', '972-773-1523', 'http://donnelly.com/dolor-deleniti-voluptas-distinctio-deserunt-natus-aut', '710 McDermott Ridges\nLeonelfurt, HI 23096-3421', '2026-06-19 04:17:27', '2026-06-19 04:17:27'),
(38, 'Carroll, Hand and Rolfson', 'madelyn75@example.net', '+1-989-785-2266', 'http://prohaska.com/', '70127 Verdie Crest Apt. 889\nLednerhaven, IN 86462', '2026-05-01 04:17:27', '2026-05-01 04:17:27'),
(39, 'Howell-Lesch', 'jarred.hammes@example.net', '(959) 308-5074', 'https://olson.com/eum-praesentium-consequatur-aut-sunt-aut-officia.html', '596 Pollich Common\nOttilieport, MD 32855', '2026-05-05 04:17:27', '2026-05-05 04:17:27'),
(40, 'Sipes, Buckridge and Block', 'margot.jones@example.org', '916.820.5309', 'http://willms.com/', '532 Jake Landing\nFerminport, ME 86617', '2026-06-15 04:17:27', '2026-06-15 04:17:27'),
(41, 'Feeney, Weissnat and Adams', 'donny.gulgowski@example.net', '850.543.2996', 'http://www.spinka.com/dolor-quae-at-quibusdam-eveniet', '61469 Georgianna Extensions Suite 123\nLake Elliotttown, AL 60733', '2026-04-26 04:17:27', '2026-04-26 04:17:27'),
(42, 'Gaylord-Heidenreich', 'bednar.leonard@example.com', '+17409245220', 'https://murazik.com/officia-similique-quo-qui-eos-magni-eveniet.html', '697 Swift Square\nNew Braulio, NJ 23190-5094', '2025-06-27 04:17:27', '2025-06-27 04:17:27'),
(43, 'Langworth PLC', 'ibartell@example.com', '+1-281-730-7143', 'https://www.kautzer.com/reiciendis-dolorem-doloremque-ex-consectetur-ab', '5185 Welch Rest\nNew Anastaciochester, IL 43813-6105', '2025-07-12 04:17:27', '2025-07-12 04:17:27'),
(44, 'Rowe, Bednar and Schumm', 'emard.loyal@example.org', '386.828.7082', 'http://altenwerth.biz/est-nulla-ducimus-qui-pariatur-ut', '4320 Reichert Common\nNew Oscar, PA 71892', '2026-04-22 04:17:27', '2026-04-22 04:17:27'),
(45, 'Sanford-Medhurst', 'qglover@example.com', '+1 (336) 255-9778', 'http://williamson.net/facilis-delectus-nobis-qui-sunt-sint.html', '42914 Brown Circles\nJillianfort, AK 65293', '2026-04-25 04:17:27', '2026-04-25 04:17:27'),
(46, 'Rohan, Abernathy and Bradtke', 'morissette.florence@example.org', '+1 (620) 410-9307', 'https://crist.com/est-debitis-ut-est-ullam-porro-sed-facere-unde.html', '9501 Victoria Forks\nMitchellville, NY 24602-1669', '2025-07-18 04:17:27', '2025-07-18 04:17:27'),
(47, 'Reynolds, Von and McLaughlin', 'verona.cruickshank@example.org', '+1 (913) 543-1251', 'http://frami.com/aut-quia-repudiandae-omnis-voluptatem-ipsam-aliquam-dolorem', '173 Kshlerin Pine Apt. 566\nLincolnshire, AZ 40979', '2026-06-19 04:17:27', '2026-06-19 04:17:27'),
(48, 'Nader Group', 'julia13@example.net', '+1-828-510-4481', 'http://www.renner.org/', '52402 Kiehn Meadows Suite 285\nEstebanmouth, AL 51668-0569', '2025-07-12 04:17:27', '2025-07-12 04:17:27'),
(49, 'Marvin-Ernser', 'kattie43@example.org', '(229) 630-1246', 'http://wolf.com/delectus-eaque-dignissimos-aliquam-adipisci-consequatur-non-eum.html', '879 Hudson Orchard Apt. 912\nLake Kathleenland, CA 95118-6172', '2025-06-25 04:17:27', '2025-06-25 04:17:27'),
(50, 'Johnston Inc', 'larson.braeden@example.com', '+1-812-451-9318', 'http://www.turcotte.biz/consequatur-nam-amet-qui-excepturi-non-minus-animi', '3939 Witting Courts Apt. 593\nPort Annetteburgh, WV 59894-2798', '2026-04-30 04:17:27', '2026-04-30 04:17:27');

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
(1, 'Margaretta Stoltenberg Sr.', 'Loan Interviewer', 7, 'iva.lind@example.net', NULL, 43, 'personal', '[\"+1 (305) 652-8359\",\"+1 (323) 796-8915\"]', '[\"3602 Fisher Fords Apt. 471\\nLake Allie, SC 68828-3016\",\"426 Turner Road Apt. 830\\nWest Odessa, DE 53733\"]', 'Commodi architecto modi suscipit itaque officiis.', 'inactive', '2026-04-20 04:17:28', '2026-04-20 04:17:28'),
(2, 'Jazmyne Volkman I', 'Agricultural Science Technician', 8, 'oconnell.amir@example.com', NULL, 40, 'corporate', '[\"1-214-695-5780\",\"(669) 728-5044\"]', '[\"6132 Bogisich Common\\nNorth Nichole, NE 03065\",\"265 Emmie Gateway Suite 592\\nWest Sterlingfurt, IA 81369-0623\"]', 'Aspernatur quam et quia.', 'active', '2025-07-15 04:17:28', '2025-07-15 04:17:28'),
(3, 'Erick Daniel Sr.', 'Religious Worker', 48, 'rocio41@example.com', NULL, 5, 'reseller', '[\"1-509-682-9663\",\"925.496.8580\"]', '[\"9407 Brakus Knolls\\nEmmaleemouth, AR 18378-9487\",\"517 Stefan Island Suite 585\\nTravonberg, AZ 24016-1217\"]', 'Amet est error dolores libero consequatur.', 'inactive', '2025-06-30 04:17:28', '2025-06-30 04:17:28'),
(4, 'Jaylen Pagac', 'Tire Changer', 42, 'bartoletti.chad@example.net', NULL, 41, 'reseller', '[\"332.407.5590\",\"1-240-722-5604\"]', '[\"356 Mann Rest\\nWest Jaydechester, MN 26619-2672\",\"8388 Pearline Grove\\nPaucekfort, AK 60694-7659\"]', 'Ea in voluptatibus quisquam reprehenderit rem.', 'inactive', '2026-06-14 04:17:28', '2026-06-14 04:17:28'),
(5, 'Prof. Hank Koch', 'Welder-Fitter', 13, 'kuhlman.kayli@example.org', NULL, 40, 'reseller', '[\"402.222.2064\",\"+1 (443) 502-0208\"]', '[\"8917 Ambrose Lock Apt. 774\\nBergstromborough, WA 44380-1582\",\"3732 Graham Stravenue\\nErnietown, MT 40069-4508\"]', 'Dolores adipisci quae aliquam dolore totam et.', 'inactive', '2026-06-20 04:17:28', '2026-06-20 04:17:28'),
(6, 'Lelah Zieme I', 'Extruding and Drawing Machine Operator', 1, 'swift.brook@example.net', NULL, 36, 'personal', '[\"309-708-2790\",\"657.989.8492\"]', '[\"7822 Gleichner Brooks Apt. 911\\nWestbury, DE 90508-1703\",\"25783 Margaret Forges Suite 889\\nEast Gladys, WI 30988\"]', 'Perferendis reprehenderit quia aut in sit.', 'active', '2026-06-16 04:17:28', '2026-06-16 04:17:28'),
(7, 'Emmet Schulist', 'Food Scientists and Technologist', 47, 'russ.wuckert@example.net', NULL, 3, 'reseller', '[\"1-832-509-3638\",\"417-822-1342\"]', '[\"37094 Damon Vista\\nNew Max, IA 71759\",\"66393 Margarette Groves Apt. 658\\nWest Rhettmouth, CO 44959\"]', 'Architecto nostrum quo a et.', 'inactive', '2026-04-23 04:17:28', '2026-04-23 04:17:28'),
(8, 'Serena Kessler', 'Electrical Engineering Technician', 10, 'eva.kertzmann@example.org', NULL, 14, 'reseller', '[\"(320) 819-5818\",\"+1-501-977-5800\"]', '[\"955 Luis Key Apt. 352\\nSouth Tobinshire, VA 88146\",\"904 Walker Throughway\\nWest Tavares, OH 01658\"]', 'In et aut quaerat soluta perspiciatis rerum.', 'inactive', '2026-06-14 04:17:28', '2026-06-14 04:17:28'),
(9, 'Kendrick Frami', 'Prosthodontist', 35, 'rowe.emmanuelle@example.net', NULL, 33, 'corporate', '[\"+19512598720\",\"267-729-7812\"]', '[\"2348 Keith Fields Apt. 010\\nPort Alexanemouth, DC 70148-7471\",\"934 Wisoky Forge Suite 835\\nTownefurt, NY 13450\"]', 'Qui dignissimos quo et voluptas aut qui.', 'active', '2026-04-23 04:17:28', '2026-04-23 04:17:28'),
(10, 'Mabelle Kshlerin', 'Physicist', 1, 'fabiola.schoen@example.com', NULL, 30, 'corporate', '[\"870.501.9370\",\"551.412.0568\"]', '[\"47593 Schuppe Knolls\\nTommiebury, GA 03228\",\"613 Baumbach Circles Apt. 067\\nWest Johnathonborough, WI 64313\"]', 'Ut sit placeat quis veniam iste maiores.', 'inactive', '2026-06-14 04:17:28', '2026-06-14 04:17:28'),
(11, 'Amari Hettinger', 'Music Director', 19, 'schuster.katelin@example.net', NULL, 25, 'reseller', '[\"1-607-305-6813\",\"760-926-1377\"]', '[\"19222 Kilback Plains\\nSouth Nataliaton, IN 14886-8712\",\"39635 Bailey Locks Apt. 543\\nWest Rosetta, NE 35215\"]', 'Asperiores et hic id voluptatem ut reprehenderit.', 'active', '2026-06-14 04:17:28', '2026-06-14 04:17:28'),
(12, 'Mr. Forrest Reilly DVM', 'Animal Control Worker', 31, 'crunolfsdottir@example.org', NULL, 4, 'reseller', '[\"(540) 287-4375\",\"+1.567.629.4298\"]', '[\"3291 Zulauf Forks Apt. 155\\nSouth Enochhaven, DC 34570\",\"5946 Nettie Hills\\nBartonchester, NH 83096\"]', 'Necessitatibus nostrum aut quam corporis corporis sint iure.', 'inactive', '2025-06-28 04:17:29', '2025-06-28 04:17:29'),
(13, 'Koby Boyle', 'Crane and Tower Operator', 31, 'margaretta41@example.org', NULL, 21, 'corporate', '[\"+1 (434) 893-0035\",\"(617) 717-7839\"]', '[\"55360 Dare Trail Apt. 622\\nO\'Reillyport, IN 65657-9930\",\"69466 Ernest Camp\\nNorth Mckayla, MD 42010-9302\"]', 'Voluptas autem a quis ut est doloribus.', 'active', '2025-07-07 04:17:29', '2025-07-07 04:17:29'),
(14, 'Doyle Schuppe', 'Kindergarten Teacher', 6, 'howe.terrill@example.net', NULL, 12, 'personal', '[\"+1-585-450-0592\",\"(469) 480-4004\"]', '[\"723 Haylee Islands Apt. 860\\nLake Titomouth, TX 34609-3328\",\"66476 Janet Ranch\\nSouth Brisa, MA 83613\"]', 'Eaque est rerum accusamus laborum asperiores consectetur.', 'active', '2026-04-28 04:17:29', '2026-04-28 04:17:29'),
(15, 'Julian Bernhard', 'Wind Instrument Repairer', 16, 'ebruen@example.com', NULL, 28, 'corporate', '[\"1-380-562-0174\",\"1-458-257-6831\"]', '[\"1157 Hyman Lodge\\nWatersside, IL 17418-2594\",\"93209 Kerluke Stravenue\\nMariannaside, SD 08560\"]', 'Omnis et minus aut sint.', 'inactive', '2025-07-08 04:17:29', '2025-07-08 04:17:29'),
(16, 'Michale Lesch', 'Title Abstractor', 46, 'dbauch@example.com', NULL, 48, 'reseller', '[\"732.303.1151\",\"+1 (409) 216-4272\"]', '[\"300 Fredrick Forge\\nBriceborough, NY 72501-3721\",\"4878 Gaylord Flats\\nNorth Kendraburgh, NJ 02829-3884\"]', 'Illo autem quo et et esse aut sint.', 'inactive', '2025-07-01 04:17:29', '2025-07-01 04:17:29'),
(17, 'Miss Leanne Stark', 'Office Machine Operator', 21, 'zane.powlowski@example.net', NULL, 27, 'personal', '[\"+19063858033\",\"1-925-240-2116\"]', '[\"100 Rutherford Park Suite 166\\nVeronicamouth, ID 45179\",\"59353 Milan Manors\\nPort Parker, MT 82377\"]', 'Occaecati nemo odit aut esse laborum.', 'active', '2026-05-03 04:17:29', '2026-05-03 04:17:29'),
(18, 'Ms. Elsie Bahringer', 'Brazer', 4, 'yundt.krystel@example.net', NULL, 13, 'personal', '[\"+1 (618) 356-4420\",\"+1.754.315.1706\"]', '[\"9162 Jamey Crescent\\nWest Paulatown, RI 95811-8012\",\"966 Legros Walks\\nRyleighside, WY 68310-4893\"]', 'Ducimus expedita dignissimos accusamus occaecati.', 'active', '2026-06-17 04:17:29', '2026-06-17 04:17:29'),
(19, 'Patsy O\'Reilly', 'Cashier', 1, 'xdibbert@example.org', NULL, 33, 'reseller', '[\"+1 (951) 675-8733\",\"986-963-6393\"]', '[\"96742 Conroy Lights\\nSanfordberg, NV 22974-3089\",\"860 Samson Avenue Suite 748\\nJosiannemouth, DC 82025\"]', 'Adipisci nesciunt velit vero optio voluptate repellat porro.', 'inactive', '2025-07-12 04:17:29', '2025-07-12 04:17:29'),
(20, 'Mohammad Greenholt', 'Elementary School Teacher', 2, 'marguerite92@example.org', NULL, 17, 'corporate', '[\"985.702.7948\",\"1-917-884-0956\"]', '[\"18041 Kaylah Overpass\\nHyattland, NM 11199-5904\",\"950 Sipes Ridge Apt. 173\\nKrajcikchester, WA 15358-8847\"]', 'Earum ut et maxime eaque et.', 'inactive', '2026-04-23 04:17:29', '2026-04-23 04:17:29'),
(21, 'Bette Koss', 'Welding Machine Operator', 7, 'yost.meredith@example.org', NULL, 11, 'corporate', '[\"+13039268943\",\"215-959-0090\"]', '[\"66531 Braxton Wall Apt. 419\\nSyblemouth, TX 38346-4279\",\"9966 Keebler Club\\nKingfurt, TN 73720\"]', 'In nisi aut asperiores deleniti.', 'inactive', '2026-05-05 04:17:29', '2026-05-05 04:17:29'),
(22, 'Hellen Douglas DDS', 'Electronic Equipment Assembler', 46, 'renner.aurelio@example.net', NULL, 6, 'corporate', '[\"+1-458-806-1919\",\"+19717666082\"]', '[\"9786 Curtis Trafficway Apt. 504\\nWest Allene, LA 98048\",\"752 Stephan Junctions Apt. 645\\nWest Vincent, MD 71409-6634\"]', 'Nam et maxime nesciunt nisi magni.', 'inactive', '2026-05-04 04:17:29', '2026-05-04 04:17:29'),
(23, 'Miss Brandy Glover', 'Elementary and Secondary School Administrators', 42, 'ana58@example.org', NULL, 22, 'reseller', '[\"(234) 944-3178\",\"352-526-7075\"]', '[\"495 Thiel Port Suite 776\\nPort Elodyton, MD 53168\",\"138 Fiona Mount\\nLake Haylie, DC 07845-0273\"]', 'Ullam et quo quia earum.', 'active', '2026-04-23 04:17:29', '2026-04-23 04:17:29'),
(24, 'Prof. Kadin Schiller Jr.', 'Forming Machine Operator', 11, 'kovacek.johnny@example.net', NULL, 30, 'personal', '[\"+16077866612\",\"608.795.6231\"]', '[\"81356 Flatley Forest\\nNew Alden, WI 60596\",\"59489 Jackson Manors\\nNathanielhaven, MD 37606-1389\"]', 'Asperiores accusantium sunt dignissimos nesciunt.', 'active', '2025-07-14 04:17:29', '2025-07-14 04:17:29'),
(25, 'Luna Batz', 'Rail Car Repairer', 29, 'anderson.hank@example.net', NULL, 18, 'reseller', '[\"(854) 512-0478\",\"470-623-9276\"]', '[\"9489 Nicolas Ford Suite 727\\nChaunceyburgh, WV 99210\",\"838 Amya Street Suite 531\\nWest Ned, KS 07816-5486\"]', 'Nostrum amet veniam rerum recusandae.', 'active', '2026-04-24 04:17:29', '2026-04-24 04:17:29'),
(26, 'Jerel Orn', 'Agricultural Sciences Teacher', 10, 'murazik.harry@example.org', NULL, 34, 'reseller', '[\"575-261-0752\",\"949.891.6270\"]', '[\"76927 Virgie Route Suite 864\\nNorth Otto, RI 86883\",\"2580 Lockman Lakes\\nChristopview, ME 30671-0084\"]', 'Nisi repudiandae et saepe excepturi tenetur quia reprehenderit.', 'active', '2026-05-05 04:17:29', '2026-05-05 04:17:29'),
(27, 'Dr. Aiyana Boyer', 'Desktop Publisher', 24, 'isidro.kling@example.org', NULL, 46, 'corporate', '[\"+1.989.231.6757\",\"1-283-215-5492\"]', '[\"464 Wisoky Common Suite 980\\nPort Brigitte, AK 53447\",\"92809 Kautzer Freeway\\nOraside, NY 41676-0265\"]', 'Eligendi atque et dolores itaque adipisci voluptate.', 'inactive', '2025-07-01 04:17:29', '2025-07-01 04:17:29'),
(28, 'Madge Carter DDS', 'Control Valve Installer', 31, 'randi.hamill@example.net', NULL, 14, 'reseller', '[\"(980) 332-6818\",\"+1-640-702-7864\"]', '[\"725 Kuvalis Locks\\nLednermouth, RI 60646\",\"8697 Hazel Drive Suite 811\\nRobertshaven, DC 19251\"]', 'Quas aperiam ratione qui praesentium et.', 'inactive', '2025-07-15 04:17:29', '2025-07-15 04:17:29'),
(29, 'Dr. Lelia Lindgren PhD', 'Diagnostic Medical Sonographer', 39, 'gglover@example.org', NULL, 32, 'personal', '[\"(315) 627-8383\",\"+14139722828\"]', '[\"76152 Velda Plains Suite 366\\nNorth Corrineville, ND 59583-9071\",\"411 Destany Club\\nRosendofort, LA 95653-4164\"]', 'Debitis est aut provident itaque sint occaecati.', 'inactive', '2026-06-17 04:17:29', '2026-06-17 04:17:29'),
(30, 'Prof. Jakob Kautzer', 'Automotive Technician', 33, 'judge.littel@example.net', NULL, 12, 'corporate', '[\"619-834-9086\",\"+1-631-944-0194\"]', '[\"394 Schinner Dam\\nEast Shad, MO 96325-6451\",\"630 Arno Route\\nSouth Abagail, IL 31677\"]', 'Ea porro voluptatem quae aut incidunt rerum repellat.', 'inactive', '2026-06-14 04:17:29', '2026-06-14 04:17:29'),
(31, 'Ebony Lemke DDS', 'Compensation and Benefits Manager', 44, 'brady.konopelski@example.org', NULL, 21, 'reseller', '[\"1-636-247-5127\",\"+1 (740) 750-8159\"]', '[\"26320 Crystel Cliffs\\nNorth Lawsonberg, NJ 60235-6632\",\"374 Gerhold Unions Apt. 949\\nPort Garnetshire, MN 43620\"]', 'Cum quibusdam optio sapiente.', 'active', '2026-06-16 04:17:29', '2026-06-16 04:17:29'),
(32, 'Prof. Mckayla Koch', 'Interpreter OR Translator', 10, 'sammie.zboncak@example.org', NULL, 23, 'corporate', '[\"386-313-9616\",\"+1.346.915.0344\"]', '[\"36957 Weber Passage Suite 454\\nMrazchester, GA 46752\",\"223 Elenora Orchard Suite 175\\nEast Amosfort, DE 99662\"]', 'Dolorem eius aut ad consequatur quisquam facilis.', 'inactive', '2026-06-17 04:17:29', '2026-06-17 04:17:29'),
(33, 'Dr. Holly Howe', 'Food Science Technician', 33, 'colin.vonrueden@example.net', NULL, 16, 'personal', '[\"1-313-696-7692\",\"+17474702574\"]', '[\"28235 Beau Park Apt. 810\\nAuerburgh, AR 66205\",\"401 VonRueden Flat Suite 562\\nNorth Reva, ID 73783-6412\"]', 'Et quod quasi voluptates rerum dolorem.', 'active', '2025-07-10 04:17:29', '2025-07-10 04:17:29'),
(34, 'Rylee Green DDS', 'Structural Metal Fabricator', 22, 'vhaag@example.org', NULL, 41, 'corporate', '[\"(563) 892-3183\",\"(910) 848-8620\"]', '[\"2036 Johnathon Trail\\nLake Jerel, CA 39223-4647\",\"80013 Noble Landing\\nSwiftville, GA 90376-4667\"]', 'Molestiae nulla quaerat ducimus sint ab nihil voluptatum.', 'active', '2026-04-28 04:17:29', '2026-04-28 04:17:29'),
(35, 'Mireille Goodwin DDS', 'Administrative Services Manager', 27, 'xritchie@example.org', NULL, 15, 'personal', '[\"(856) 358-5822\",\"+19474146991\"]', '[\"472 Kathleen Ridges\\nKalihaven, SC 22825-3222\",\"54308 Kassulke Fords\\nSouth Zolafort, AL 93781-0439\"]', 'Itaque similique delectus dolores culpa libero est pariatur.', 'inactive', '2025-06-24 04:17:29', '2025-06-24 04:17:29'),
(36, 'Merle Robel', 'Physician Assistant', 6, 'duncan09@example.com', NULL, 40, 'personal', '[\"225-996-2202\",\"(925) 958-1849\"]', '[\"219 Moore Loaf\\nPort Damaris, CO 74649\",\"68149 Chance Street Suite 360\\nMitchellville, UT 66493\"]', 'Ipsum iste eos ad consectetur sed.', 'inactive', '2025-06-29 04:17:29', '2025-06-29 04:17:29'),
(37, 'Miss Reba O\'Kon DVM', 'Railroad Switch Operator', 35, 'pwindler@example.com', NULL, 20, 'personal', '[\"1-929-358-5847\",\"+1-804-670-1091\"]', '[\"847 Ian Mountain Apt. 017\\nLake Miguel, AR 14556\",\"416 Hamill Prairie\\nConnburgh, TX 60362\"]', 'Et soluta perferendis doloribus numquam accusamus reiciendis fuga.', 'inactive', '2026-06-15 04:17:29', '2026-06-15 04:17:29'),
(38, 'Fern Bauch Jr.', 'Housekeeping Supervisor', 36, 'langworth.duncan@example.org', NULL, 23, 'reseller', '[\"+1 (570) 324-4701\",\"1-740-849-4530\"]', '[\"326 Paula Pass\\nKossburgh, OK 04230\",\"99005 Hill Pines Apt. 676\\nLake Sarina, IN 75590\"]', 'Ut quia laborum odit vel et.', 'inactive', '2025-07-18 04:17:29', '2025-07-18 04:17:29'),
(39, 'Herbert Barrows', 'Farm and Home Management Advisor', 11, 'zboncak.jarrod@example.org', NULL, 22, 'reseller', '[\"(770) 904-6186\",\"1-205-740-8912\"]', '[\"124 Blanca Square\\nLake Hailiebury, NY 37007\",\"413 Considine Ranch\\nSchummfort, CT 86403-9036\"]', 'Quo labore dolorum quidem placeat.', 'active', '2026-06-15 04:17:29', '2026-06-15 04:17:29'),
(40, 'Kody Kohler', 'Tank Car', 22, 'ylittel@example.com', NULL, 34, 'reseller', '[\"(386) 358-8151\",\"1-747-826-0112\"]', '[\"2421 Macy Crescent\\nNew Joesph, CO 84258\",\"70239 Deckow Springs\\nFurmanstad, FL 67881-5827\"]', 'Non beatae eos quidem omnis quaerat.', 'active', '2025-07-08 04:17:29', '2025-07-08 04:17:29'),
(41, 'Jamison Mante', 'Internist', 34, 'lkuhic@example.net', NULL, 26, 'reseller', '[\"+1.713.788.5054\",\"+1 (316) 481-4567\"]', '[\"939 Upton Rapid Suite 734\\nPalmatown, CT 99904\",\"5521 Ullrich Trafficway Suite 754\\nNorth Javon, DE 28822\"]', 'Rerum quo saepe reiciendis.', 'inactive', '2026-04-24 04:17:29', '2026-04-24 04:17:29'),
(42, 'Darrin Homenick', 'Chemical Engineer', 47, 'trunolfsdottir@example.com', NULL, 33, 'personal', '[\"+1.702.567.4999\",\"+13185800946\"]', '[\"8199 Quinn Lodge Apt. 556\\nEast Giastad, CO 40839-8155\",\"96344 Kuhlman Walk\\nTillmanview, KY 27967\"]', 'Nemo occaecati est molestias aut ea.', 'inactive', '2026-05-05 04:17:29', '2026-05-05 04:17:29'),
(43, 'Hertha Kuhic', 'Foundry Mold and Coremaker', 49, 'waufderhar@example.org', NULL, 50, 'reseller', '[\"1-708-325-5838\",\"+1-231-302-5100\"]', '[\"8455 Derrick Court\\nGuiseppeborough, ID 68205-2078\",\"9284 Boehm Views Suite 822\\nPort Ferne, MN 25613-2107\"]', 'Optio voluptatem libero deserunt et nesciunt.', 'inactive', '2025-06-22 04:17:29', '2025-06-22 04:17:29'),
(44, 'Prof. London Goyette I', 'Engineering Teacher', 37, 'feil.vinnie@example.net', NULL, 43, 'reseller', '[\"1-626-748-0511\",\"+1.617.986.6098\"]', '[\"260 Cristopher Rest Apt. 485\\nNorth Alicestad, MD 26152-9406\",\"249 Mia Center\\nSouth Camylleville, KS 34266\"]', 'Accusantium ad inventore saepe.', 'inactive', '2026-04-30 04:17:29', '2026-04-30 04:17:29'),
(45, 'Osborne Tromp', 'ccc', 4, 'bonita73@example.net', NULL, 27, 'personal', '[\"223-270-7155\",\"+13372011806\"]', '[\"55527 Rebekah Stream Suite 236\\nSouth Jillian, TX 52041\",\"88135 Austen Rapids Suite 074\\nClarabelleburgh, AK 89069\"]', 'Possimus qui vel id vitae.', 'inactive', '2026-06-18 04:17:29', '2026-06-18 04:17:29'),
(46, 'Marlene Jacobson III', 'Printing Machine Operator', 46, 'frankie.sawayn@example.com', NULL, 7, 'reseller', '[\"(574) 498-4181\",\"618.916.2155\"]', '[\"991 Lehner Avenue\\nNorth Vaughnside, NE 94641\",\"9688 Samanta Street Suite 797\\nNew Blancheville, AK 27914-9597\"]', 'Commodi hic est explicabo et vel.', 'inactive', '2026-04-25 04:17:29', '2026-04-25 04:17:29'),
(47, 'Edwin Mohr', 'Set and Exhibit Designer', 25, 'tcasper@example.net', NULL, 7, 'corporate', '[\"947.915.3313\",\"224-215-1002\"]', '[\"661 Windler Coves\\nQuitzonville, MS 34614-9865\",\"548 Emelia Mill Suite 924\\nNew Nyasia, ME 94400-4957\"]', 'Officia eveniet magni facilis harum sunt sit.', 'active', '2025-06-26 04:17:29', '2025-06-26 04:17:29'),
(48, 'Krystina Shanahan', 'Railroad Conductors', 36, 'domenico79@example.com', NULL, 26, 'reseller', '[\"(650) 293-2920\",\"1-781-594-0491\"]', '[\"420 Marlee Club\\nEast Lucas, KY 27544\",\"6842 Jolie Plaza\\nGerholdburgh, LA 92530-5891\"]', 'Saepe sed quia dolorem voluptatum voluptate tempora.', 'inactive', '2025-06-30 04:17:29', '2025-06-30 04:17:29'),
(49, 'Mr. Nicola Maggio MD', 'Captain', 9, 'johnson.arden@example.net', NULL, 33, 'personal', '[\"+1 (434) 339-3006\",\"+13213940488\"]', '[\"779 Bernhard Keys\\nLomabury, PA 96025\",\"446 Lucinda Junction Apt. 299\\nLangworthborough, WY 88627\"]', 'Reiciendis aliquam laudantium eius libero recusandae dicta similique.', 'active', '2026-06-18 04:17:29', '2026-06-18 04:17:29'),
(50, 'Elias Senger', 'Heaters', 44, 'forest.johnson@example.org', NULL, 25, 'corporate', '[\"+1 (872) 489-3960\",\"661.435.0262\"]', '[\"844 Schuster Flats\\nNorth Arturo, HI 80069-2198\",\"3204 Mortimer Drive Suite 433\\nEast Jamel, NJ 06191\"]', 'Corporis quasi autem qui alias ab.', 'inactive', '2025-07-20 04:17:29', '2025-07-20 04:17:29');

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
  `costing_price` decimal(12,2) NOT NULL DEFAULT 0.00,
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
(24, 'sdfg', NULL, 'sdfg', 50, 8000.00, 5000.00, NULL, 4, NULL, '2026-06-22 00:18:26', '2026-06-22 00:18:26');

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
('ccfpcmkph1WrAAwMkL8o8jGOBKZAtXojhs8MwpzO', 40, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiZFdiUzUyOXVGREJENjlPNlVoZVJtSk9xbjIzTG9tVzJQV0hvYmo3OSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9zYWxlcyI7czo1OiJyb3V0ZSI7czoxMToic2FsZXMuaW5kZXgiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aTo0MDt9', 1782025449),
('IaKgjeaOuIwEwJtNJEOZ0WHlIFj71rFIP3bM9oSr', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoidEd4ZEdBN3NlZGI4N0ZPRjVBbWN5TDg3YTNweXoyRmI5VlV0czJ1OSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1782108951),
('kPMXM3HbXQzuyD7KiNbKfyZRckJrkREGofdTK34v', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiNXFpU0VkQ3pwRTl2OVdRbU96OEpzZEhTejdnWmwwenUyZXU2OG54WCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6Mzc6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9wcm9kdWN0cy8xL2VkaXQiO3M6NToicm91dGUiO3M6MTM6InByb2R1Y3RzLmVkaXQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=', 1782109106),
('SacKLUg58WxCtzUg40L4AOFx079d1qkb6fqCuMEb', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoieXVQZmE2RGRKM1NubTNWMzhHRHJiR3lHemJiSlY1blV2ZEJ3eGZLdyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7czo0OiJob21lIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1782108952),
('u3KMyMtZgnPSo63uxc7SBhikXKpRcrM6goDHi36U', 40, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36 Edg/149.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoidWt4WUY5ZmRQZGdyRlhkMTN1NTJjQ25INDdVd1JrQmpKZUl5S3dYVSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6NDA7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzQ6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9yZXF1aXJlbWVudHMiO3M6NToicm91dGUiO3M6MTg6InJlcXVpcmVtZW50cy5pbmRleCI7fX0=', 1782032150),
('xA02kS1hfv3WGKGwe6ecVKXRA49tJLHR0e4FjA82', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiRTh0eGlJQkM1MllMQW13bU8xaDFySllwRklwSFlTaWw3b2g4NDJTdyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzY6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9yZXF1aXJlbWVudHMvMiI7czo1OiJyb3V0ZSI7czoxNzoicmVxdWlyZW1lbnRzLnNob3ciO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=', 1782032507);

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
(8, 'support_whatsapp', '01911-561554', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(9, 'office_name_1', 'Elephant Road Branch', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(10, 'office_address_1', 'Tabas Building (Level-5), 53/2 New Elephant Road\nDhaka-1205, Bangladesh', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(11, 'office_name_2', 'Corporate Office', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(12, 'office_address_2', 'Tower 71 (Level-8, C-9), 516/3 South Manikdi, Near ECB Circle\nDhaka Cantonment, Dhaka-1206, Bangladesh', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(13, 'office_name_3', 'Service Centre', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(14, 'office_address_3', 'Tabas Building (Level-5), 53/2 New Elephant Road\nDhaka-1205, Bangladesh', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(15, 'footer_contact_info', 'E-mail: info@crystalcomputers.com.bd, Hunting: 09666733744, Mobile: 01730-495650, 01730-495651', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(16, 'pdf_sender_office_info', '<strong>Corporate Office:</strong> Tower 71, Level-8, Near ECB Circle, Dhaka Cantonment, Dhaka-1206', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(17, 'paginated_quantity', '10', '2026-06-20 04:17:27', '2026-06-20 04:17:27'),
(18, 'default_vat', '0', '2026-06-20 04:26:22', '2026-06-20 04:27:19'),
(19, 'default_ait', '0', '2026-06-20 04:26:22', '2026-06-20 04:27:19'),
(20, 'quotation_thanks_text', NULL, '2026-06-20 04:26:22', '2026-06-20 04:26:22');

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
(11, 'Feet', 'Ft', '2026-06-20 04:17:27', '2026-06-20 04:17:27');

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
(1, 'Super Admin', 'admin@example.com', '2026-06-20 04:17:28', '$2y$12$hXqxb.1KmaM3Vbgtyo.JMuH4l14YwI8D7nH4VU9RwgkWzyR1YADfO', NULL, NULL, NULL, 'super_admin', NULL, NULL, NULL, NULL, '2026-06-20 04:17:28', '2026-06-20 04:17:28'),
(2, 'Prof. Loyal Hammes', 'eduardo.kulas@example.com', '2026-06-16 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'GnUhkSSyQ9', '2026-06-16 04:17:28', '2026-06-16 04:17:28'),
(3, 'Mr. Ethel Smitham II', 'makenna83@example.com', '2026-05-03 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'TPDkmlbijH', '2026-05-03 04:17:28', '2026-05-03 04:17:28'),
(4, 'Elody Hills', 'osborne.walter@example.com', '2026-05-05 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'a01lvwyms7', '2026-05-05 04:17:28', '2026-05-05 04:17:28'),
(5, 'Lacey Hand Jr.', 'vkoelpin@example.org', '2026-06-20 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'g0QjErdkRc', '2026-06-20 04:17:28', '2026-06-20 04:17:28'),
(6, 'Prof. Zora Hayes', 'huels.meredith@example.net', '2026-06-18 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'u7hbKKUM88', '2026-06-18 04:17:28', '2026-06-18 04:17:28'),
(7, 'Duane Johns', 'shields.leon@example.net', '2026-04-28 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'uTluBDhl0QooTSVqKJoloOyDzpxcQ8KSlOzKlZVwudYHAdvmdvad9mYsmzhk', '2026-04-28 04:17:28', '2026-04-28 04:17:28'),
(8, 'Johnson Weber V', 'adam.turner@example.net', '2025-07-07 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'xbMDamBg55', '2025-07-07 04:17:28', '2025-07-07 04:17:28'),
(9, 'Tiara Dicki DDS', 'rkonopelski@example.org', '2026-06-15 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'UsDiveynYy', '2026-06-15 04:17:28', '2026-06-15 04:17:28'),
(10, 'Roxanne Frami', 'reynold25@example.org', '2026-04-29 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'l17spng4f8', '2026-04-29 04:17:28', '2026-04-29 04:17:28'),
(11, 'Ava Feeney', 'zdare@example.net', '2025-06-30 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'PHbnCFT0w4', '2025-06-30 04:17:28', '2025-06-30 04:17:28'),
(12, 'Alice Runolfsdottir', 'fay.rowena@example.org', '2025-06-27 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'DjuqyHxq4m', '2025-06-27 04:17:28', '2025-06-27 04:17:28'),
(13, 'Dr. Nathaniel Schaden II', 'qkautzer@example.com', '2026-06-16 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'vWTyFc07DR', '2026-06-16 04:17:28', '2026-06-16 04:17:28'),
(14, 'Miss Reanna Smith II', 'qkunde@example.org', '2025-07-16 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'gt8sBJjLPh', '2025-07-16 04:17:28', '2025-07-16 04:17:28'),
(15, 'Mr. Cleo Wiegand MD', 'bauch.camron@example.net', '2026-06-15 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'IJm68IKnNm', '2026-06-15 04:17:28', '2026-06-15 04:17:28'),
(16, 'Prof. Hector Roberts I', 'yolanda.adams@example.org', '2026-06-16 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'avpjEWBZgk', '2026-06-16 04:17:28', '2026-06-16 04:17:28'),
(17, 'Dr. Jerod Huels', 'cole.adell@example.net', '2026-06-16 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'qEOU7Q9UDh', '2026-06-16 04:17:28', '2026-06-16 04:17:28'),
(18, 'Kacie Kling', 'corwin.kenyatta@example.net', '2026-06-14 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'omB8ahhhHl', '2026-06-14 04:17:28', '2026-06-14 04:17:28'),
(19, 'Mrs. Annabell Littel I', 'fkihn@example.com', '2025-07-06 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'XgX236ntZu', '2025-07-06 04:17:28', '2025-07-06 04:17:28'),
(20, 'Olaf Block', 'verlie43@example.org', '2025-07-05 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, '7t3BF0h6lv', '2025-07-05 04:17:28', '2025-07-05 04:17:28'),
(21, 'Felipe Gutkowski', 'makenzie41@example.org', '2025-06-22 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'HiUOgedXQ7', '2025-06-22 04:17:28', '2025-06-22 04:17:28'),
(22, 'Gerda Brakus', 'sandra.schamberger@example.com', '2025-06-22 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'SkAR6DNIbD', '2025-06-22 04:17:28', '2025-06-22 04:17:28'),
(23, 'Della D\'Amore', 'virgil.kilback@example.com', '2025-07-09 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'kQsSF4unj1', '2025-07-09 04:17:28', '2025-07-09 04:17:28'),
(24, 'Donna Bahringer', 'milford55@example.org', '2026-05-01 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, '8OIxvt6RwW', '2026-05-01 04:17:28', '2026-05-01 04:17:28'),
(25, 'Derick Abernathy Sr.', 'nhamill@example.net', '2026-05-01 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'KeX7mF0rLe', '2026-05-01 04:17:28', '2026-05-01 04:17:28'),
(26, 'Mrs. Trycia Marquardt', 'ashlee01@example.com', '2026-06-19 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'uW5NIMbeY6', '2026-06-19 04:17:28', '2026-06-19 04:17:28'),
(27, 'Ms. Reanna Corwin', 'vcrist@example.com', '2026-06-20 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'B5ovWanrgD', '2026-06-20 04:17:28', '2026-06-20 04:17:28'),
(28, 'Devyn Von', 'bleffler@example.com', '2025-07-06 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'sX7PdmVr5W', '2025-07-06 04:17:28', '2025-07-06 04:17:28'),
(29, 'Edward Boehm', 'moore.andrew@example.com', '2026-06-19 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'tfqyXGFV7z', '2026-06-19 04:17:28', '2026-06-19 04:17:28'),
(30, 'Dr. Arnaldo Jenkins', 'abigayle.yost@example.org', '2026-04-29 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'baqenCUs3h', '2026-04-29 04:17:28', '2026-04-29 04:17:28'),
(31, 'Miss Gwen Nienow', 'kelsie57@example.org', '2025-07-15 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'IaSniT37n3', '2025-07-15 04:17:28', '2025-07-15 04:17:28'),
(32, 'Agustina Harvey', 'ibrakus@example.com', '2026-06-17 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'E0sZJw3NGz', '2026-06-17 04:17:28', '2026-06-17 04:17:28'),
(33, 'Kaylee Ondricka', 'morton.walsh@example.com', '2026-06-16 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, '9SXGqcZGsz', '2026-06-16 04:17:28', '2026-06-16 04:17:28'),
(34, 'Maximillia Hegmann', 'volkman.junior@example.net', '2026-06-18 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'a30a8s59Pp', '2026-06-18 04:17:28', '2026-06-18 04:17:28'),
(35, 'Lavada Steuber III', 'mschultz@example.org', '2025-06-28 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'FGgzGafD7m', '2025-06-28 04:17:28', '2025-06-28 04:17:28'),
(36, 'Dr. Fabian Gulgowski III', 'finn.turner@example.net', '2025-07-14 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'FZC32cFQdo', '2025-07-14 04:17:28', '2025-07-14 04:17:28'),
(37, 'Margarett Hegmann', 'crystel.jacobi@example.com', '2025-06-22 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'lCXhiqCbRN', '2025-06-22 04:17:28', '2025-06-22 04:17:28'),
(38, 'Prof. Tyree Anderson', 'kullrich@example.net', '2025-07-18 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'f0dPrFruUn', '2025-07-18 04:17:28', '2025-07-18 04:17:28'),
(39, 'Meda Roberts III', 'ashton71@example.com', '2025-07-16 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, '904fTdXSne', '2025-07-16 04:17:28', '2025-07-16 04:17:28'),
(40, 'Mossie Kuvalis', 'lonnie99@example.org', '2025-06-30 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'VugQL9HMmT', '2025-06-30 04:17:28', '2025-06-30 04:17:28'),
(41, 'Alexandria Green PhD', 'brakus.makenzie@example.com', '2026-06-14 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'KdojsFp7Gm', '2026-06-14 04:17:28', '2026-06-14 04:17:28'),
(42, 'Prof. Stevie Becker DDS', 'crist.fredy@example.net', '2026-04-22 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, '7Z0mHpB1Bx', '2026-04-22 04:17:28', '2026-04-22 04:17:28'),
(43, 'Selmer Kautzer', 'lou.heaney@example.org', '2026-06-18 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'SRzeLg26pj', '2026-06-18 04:17:28', '2026-06-18 04:17:28'),
(44, 'Augustus O\'Keefe', 'nikolaus.mafalda@example.org', '2025-07-15 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'hNceTvD3PK', '2025-07-15 04:17:28', '2025-07-15 04:17:28'),
(45, 'Damion Pacocha', 'pankunding@example.org', '2026-04-25 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'NWH3Fdldyv', '2026-04-25 04:17:28', '2026-04-25 04:17:28'),
(46, 'Dr. Kayli Hand PhD', 'dhuels@example.com', '2025-07-17 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'FvZHMiyPE2', '2025-07-17 04:17:28', '2025-07-17 04:17:28'),
(47, 'Mrs. Georgiana Sanford', 'csenger@example.net', '2025-07-06 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'B0qEXyLrXt', '2025-07-06 04:17:28', '2025-07-06 04:17:28'),
(48, 'Ryan Kovacek', 'gerry.watsica@example.org', '2026-04-23 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'Jr02ikHdFg', '2026-04-23 04:17:28', '2026-04-23 04:17:28'),
(49, 'Prof. Amie Rosenbaum', 'jamison54@example.net', '2026-06-20 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'oIMQD7ic7D', '2026-06-20 04:17:28', '2026-06-20 04:17:28'),
(50, 'Arthur Homenick DDS', 'ilakin@example.com', '2025-07-18 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'pvwAdbhgif', '2025-07-18 04:17:28', '2025-07-18 04:17:28'),
(51, 'Taurean Stark', 'pjenkins@example.net', '2025-06-20 04:17:28', '$2y$12$j9pJMiRbtISj/yp3Any1feuwCiVmq8mJNzHzAojI/CV.L6ZNpVmLC', NULL, NULL, NULL, 'user', NULL, NULL, NULL, 'zNfuAOqOBL', '2025-06-20 04:17:28', '2025-06-20 04:17:28');

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
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `follow_ups`
--
ALTER TABLE `follow_ups`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `meetings`
--
ALTER TABLE `meetings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `requirements`
--
ALTER TABLE `requirements`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `requirement_accessories`
--
ALTER TABLE `requirement_accessories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `requirement_installations`
--
ALTER TABLE `requirement_installations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `requirement_items`
--
ALTER TABLE `requirement_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sales`
--
ALTER TABLE `sales`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `settings`
--
ALTER TABLE `settings`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

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
