-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 07 فبراير 2021 الساعة 17:06
-- إصدار الخادم: 10.4.11-MariaDB
-- PHP Version: 7.4.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `happyhome`
--

-- --------------------------------------------------------

--
-- بنية الجدول `about`
--

CREATE TABLE `about` (
  `about_id` int(11) NOT NULL,
  `title` varchar(225) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- إرجاع أو استيراد بيانات الجدول `about`
--

INSERT INTO `about` (`about_id`, `title`, `description`) VALUES
(1, 'رسالة الجمعية ', 'جمعية نسوية غير ربحية رائدة  في المجال الاجتماعي والثقافي والتمكين الاقتصادي في محافظة الخليل تقدم خدمات توعوية تثقيفية وتدريبية للنساء والأطفال بشكل خاص والأسرة الفلسطينية بشكل عام من خلال برامج ومشاريع وأنشطة متميزة ينفذها '),
(3, 'لمحة عن الجمعية ', 'تأسست جمعية البيوت السعيدة للثقافة والتنمية في مدينة الخليل في العام 2005م، بمبادرة نسائية تعي وتتفهّم قضايا الأطفال والشباب والأسرة في المجتمع الفلسطيني، ساهمت في تحقيق مستوى أفضل في بناء البرامج وإدارة المبادرات المرتبطة بأ'),
(34, 'رؤية الجمعية ', 'جمعية ريادية في تمكين الأسرة اجتماعياً وثقافياً واقتصادياً في محافظة الخليل.');

-- --------------------------------------------------------

--
-- بنية الجدول `activity`
--

CREATE TABLE `activity` (
  `act_id` int(11) NOT NULL,
  `act_name` varchar(222) NOT NULL,
  `act_place` varchar(222) NOT NULL,
  `act_type` varchar(222) NOT NULL,
  `act_date` date NOT NULL,
  `act_image` longblob NOT NULL,
  `description` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- إرجاع أو استيراد بيانات الجدول `activity`
--

INSERT INTO `activity` (`act_id`, `act_name`, `act_place`, `act_type`, `act_date`, `act_image`, `description`) VALUES
(476, 'نشاط البالونات الصغيرة ', 'undefined', 'undefined', '0000-00-00', 0x756e646566696e6564, 'undefined'),
(482, 'جمعية البيوت السعيدة', 'روضة الياسمين الخاصة ', 'ترفيهي', '2021-01-20', 0x756e646566696e6564, ';fdruuyijkmnnk\njhtukyhnbfvkyhg\nkhkjyukuhbnmjgk\n\n'),
(483, 'جمعية البيوت السعيدة', 'روضة الياسمين الخاصة ', 'ترفيهي', '2021-01-20', 0x756e646566696e6564, ';fdruuyijkmnnk\njhtukyhnbfvkyhg\nkhkjyukuhbnmjgk\n\n');

-- --------------------------------------------------------

--
-- بنية الجدول `camp`
--

CREATE TABLE `camp` (
  `camp_id` int(11) NOT NULL,
  `camp_name` varchar(222) NOT NULL,
  `season` varchar(222) NOT NULL,
  `start_date` date NOT NULL,
  `last_date` date NOT NULL,
  `target_group` varchar(222) NOT NULL,
  `description` varchar(5000) NOT NULL,
  `camp_image` longblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- إرجاع أو استيراد بيانات الجدول `camp`
--

INSERT INTO `camp` (`camp_id`, `camp_name`, `season`, `start_date`, `last_date`, `target_group`, `description`, `camp_image`) VALUES
(36, 'جمعية البيوت السعيدة', 'شتوي ', '2021-01-12', '2021-01-13', 'addcoures', '-	المخيمات الصيفية والشتوية: يتم تنفيذ المخيمات خلال العطلة الصيفية والعطلة الشتوية ويتم خلال هذه المخيمات تنفيذ العديد من الانشطة التثقيفية والتنموية والترفيهية للاطفال من كلا الجنسين من خلال كادر من المشرفات المتخصصات.', 0x433a66616b6570617468686168742e6a7067),
(37, 'ريترن', 'صيفي ', '2021-01-12', '2021-01-01', 'happy', 'جمعية ابيوت السعيدة جمعية ابيوت العيدةجمعية ابيوت السعيدةجمعية ابيوت السعيدةجمعية ابيوت السعيدةجمعية ابيوت السعيدة', '');

-- --------------------------------------------------------

--
-- بنية الجدول `contact`
--

CREATE TABLE `contact` (
  `visitor_id` int(10) NOT NULL,
  `username` varchar(222) NOT NULL,
  `email` varchar(222) NOT NULL,
  `phone_no` int(11) NOT NULL,
  `vmassage` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- إرجاع أو استيراد بيانات الجدول `contact`
--

INSERT INTO `contact` (`visitor_id`, `username`, `email`, `phone_no`, `vmassage`) VALUES
(43, 'balqees', 'halqees@gmail.com', 987, 'h.yyvhylgtcfgv,gyjbv.hhgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggj'),
(44, 'ali', 'halqs@gmail.com', 990876578, 'hjgkyujhv,gfyhj\nkjkhykfjtcghfyhj\n');

-- --------------------------------------------------------

--
-- بنية الجدول `course`
--

CREATE TABLE `course` (
  `coures_id` int(11) NOT NULL,
  `coures_name` varchar(222) NOT NULL,
  `start_date` date NOT NULL,
  `last_date` date NOT NULL,
  `description` varchar(222) NOT NULL,
  `coures_image` longblob NOT NULL,
  `program_id` int(11) DEFAULT NULL,
  `target_group` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- إرجاع أو استيراد بيانات الجدول `course`
--

INSERT INTO `course` (`coures_id`, `coures_name`, `start_date`, `last_date`, `description`, `coures_image`, `program_id`, `target_group`) VALUES
(33, 'دورة البرمجة ', '2020-12-01', '2021-01-01', '	الدورات المختلفة التي تهدف إلى تزويد الأطفال بمهارات ومعارف متنوعة مثل الشطرنج والبرمجة والخط العربي وغيرها من المهارات.', 0x756e646566696e6564, NULL, 'من عمر 12 إلى 16 عام '),
(35, 'دورة تحفيظ القران الكريم ', '2020-09-09', '2020-12-30', '•	الدورات المختلفة التي تهدف إلى تزويد الأطفال بمهارات ومعارف متنوعة مثل الشطرنج والبرمجة والخط العربي وغيرها من المهارات.', 0x756e646566696e6564, NULL, 'الاطفال من عمر 7الى 12'),
(36, 'دورة توعية حول صحة الأم والطفل ', '2020-09-29', '2020-12-15', 'جمعية ابيوت السعيدة جمعية ابيوت السعيدةجمعية ابيوت السعيدةجمعية ابيوت السعيدةجمعية ابيوت السعيدةجمعية ابيوت السعيدةجمعية ابيوت السعيدةجمعية ابيوت السعيدة', 0x756e646566696e6564, NULL, 'الامهات والاطفال دون سن الثالثة ');

-- --------------------------------------------------------

--
-- بنية الجدول `itemtype`
--

CREATE TABLE `itemtype` (
  `id` int(11) NOT NULL,
  `type_name` varchar(50) DEFAULT NULL,
  `type_image` varchar(222) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- إرجاع أو استيراد بيانات الجدول `itemtype`
--

INSERT INTO `itemtype` (`id`, `type_name`, `type_image`) VALUES
(0, 'معجنات ', 'undefined'),
(1, 'أكلات قديمة ', 'اااااااا'),
(3, 'حلويات', 'C:fakepathfff.jpg'),
(45, 'اكلات شعبية', 'undefined'),
(86, 'عصائر', 'undefined'),
(864, 'السلطات ', 'undefined');

-- --------------------------------------------------------

--
-- بنية الجدول `meeting`
--

CREATE TABLE `meeting` (
  `meeting_id` int(11) NOT NULL,
  `meeting_name` varchar(222) NOT NULL,
  `meeting_place` varchar(222) NOT NULL,
  `meeting_type` varchar(222) NOT NULL,
  `meeting_date` date NOT NULL,
  `program_name` varchar(222) NOT NULL,
  `meeting_image` longblob NOT NULL,
  `description` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- إرجاع أو استيراد بيانات الجدول `meeting`
--

INSERT INTO `meeting` (`meeting_id`, `meeting_name`, `meeting_place`, `meeting_type`, `meeting_date`, `program_name`, `meeting_image`, `description`) VALUES
(1, 'برنامج الإرشاد الأسري', 'happy', 'ثقافي ', '2020-06-10', 'برنامج الإرشاد الأسري', 0x756e646566696e6564, 'جمعية ابيوت السعيدة جمعية ابيوت السعيدةجمعية ابيوت السعيدةجمعية ابيوت السعيدةجمعية ابيوت السعيدةجمعية ابيوت السعيدةجمعية ابيوت السعيدةجمعية ابيوت السعيدة'),
(17, 'ffffff', 'happy', 'ترفيهي ', '2020-12-28', 'البرنامج الإقتصادي ', 0x433a66616b65706174686669666c2e706e67, 'هذا البرنامج يستهدف العديد من فئات المجتمع من خلال تقديم ملتقيات عدة هادفة بهدف المساهمة في تنشئة جيل واعٍ يحمل الكثير من المبادئ والاخلاق.'),
(18, 'ffffff', 'happy', 'ترفيهي ', '2020-12-28', 'البرنامج الإقتصادي ', 0x433a66616b65706174686669666c2e706e67, 'هذا البرنامج يستهدف العديد من فئات المجتمع من خلال تقديم ملتقيات عدة هادفة بهدف المساهمة في تنشئة جيل واعٍ يحمل الكثير من المبادئ والاخلاق.');

-- --------------------------------------------------------

--
-- بنية الجدول `menuitem`
--

CREATE TABLE `menuitem` (
  `item_id` int(11) NOT NULL,
  `item_name` varchar(222) NOT NULL,
  `itemType_id` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- إرجاع أو استيراد بيانات الجدول `menuitem`
--

INSERT INTO `menuitem` (`item_id`, `item_name`, `itemType_id`, `price`) VALUES
(1, 'هريسة', 0, 10),
(2, 'كنافة ', 0, 34),
(3, 'عصير برتقال ', 0, 6),
(4, 'سلطة ملفوف ', 0, 13),
(5, 'ورق عنب ', 0, 45),
(7, 'شيشبرك ', 1, 31),
(8, 'ورق عنب ', 45, 34);

-- --------------------------------------------------------

--
-- بنية الجدول `news`
--

CREATE TABLE `news` (
  `news_id` int(11) NOT NULL,
  `news_title` varchar(222) NOT NULL,
  `date` date NOT NULL,
  `description` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- إرجاع أو استيراد بيانات الجدول `news`
--

INSERT INTO `news` (`news_id`, `news_title`, `date`, `description`) VALUES
(16, 'جمعية البيوت السعيدة تكرم المشتركين بملتقى خطوة ', '2021-01-08', 'جمعية البيوت السعيدة تكرم المشتركين بملتقى خطوة  وهو ماتقى يستهدف طلاب الثانوية العامة ');

-- --------------------------------------------------------

--
-- بنية الجدول `program`
--

CREATE TABLE `program` (
  `program_id` int(11) NOT NULL,
  `pname` varchar(222) NOT NULL,
  `description` varchar(5000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- إرجاع أو استيراد بيانات الجدول `program`
--

INSERT INTO `program` (`program_id`, `pname`, `description`) VALUES
(1, 'برنامج التمكين اللإقتصادي ', '	مشروع مطبخ البيوت السعيدة تم انشاءه عام 2006 بهدف توفير فرص عمل للنساء في مدينة الخليل وتوفير اطباق تقليدية بيتية بطريقة صحية، يعمل في المطبخ حالياً 25 موظفة وينتج كافة الأطباق البيتية والحلويات الشرقية والغربية بشكل يومي'),
(14, 'برنامج تنمية وتثقيف الاطفال', '•	الدورات المختلفة التي تهدف إلى تزويد الأطفال بمهارات ومعارف متنوعة مثل الشطرنج والبرمجة والخط العربي وغيرها من المهارات.'),
(15, 'برنامج بناء القدرات', 'هذا البرنامج يستهدف العديد من فئات المجتمع من خلال تقديم ملتقيات عدة هادفة بهدف المساهمة في تنشئة جيل واعٍ يحمل الكثير من المبادئ والاخلاق.'),
(16, 'برنامج الإرشاد الأسري', 'جمعية ابيوت السعيدة جمعية ابيوت السعيدةجمعية ابيوت السعيدةجمعية ابيوت السعيدةجمعية ابيوت السعيدةجمعية ابيوت السعيدةجمعية ابيوت السعيدةجمعية ابيوت السعيدة');

-- --------------------------------------------------------

--
-- بنية الجدول `sitmanger`
--

CREATE TABLE `sitmanger` (
  `sitManger_id` int(11) NOT NULL,
  `mangerName` varchar(222) NOT NULL,
  `password` varchar(222) NOT NULL,
  `is_manger` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- إرجاع أو استيراد بيانات الجدول `sitmanger`
--

INSERT INTO `sitmanger` (`sitManger_id`, `mangerName`, `password`, `is_manger`) VALUES
(1, 'ali', '123', 0);

-- --------------------------------------------------------

--
-- بنية الجدول `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `username` varchar(222) NOT NULL,
  `email` varchar(222) NOT NULL,
  `phone_no` int(11) NOT NULL,
  `registration_type` varchar(222) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `about`
--
ALTER TABLE `about`
  ADD PRIMARY KEY (`about_id`);

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`act_id`);

--
-- Indexes for table `camp`
--
ALTER TABLE `camp`
  ADD PRIMARY KEY (`camp_id`);

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`visitor_id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`coures_id`),
  ADD KEY `program_id` (`program_id`),
  ADD KEY `program_id_2` (`program_id`);

--
-- Indexes for table `itemtype`
--
ALTER TABLE `itemtype`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `meeting`
--
ALTER TABLE `meeting`
  ADD PRIMARY KEY (`meeting_id`);

--
-- Indexes for table `menuitem`
--
ALTER TABLE `menuitem`
  ADD PRIMARY KEY (`item_id`);

--
-- Indexes for table `news`
--
ALTER TABLE `news`
  ADD PRIMARY KEY (`news_id`);

--
-- Indexes for table `program`
--
ALTER TABLE `program`
  ADD PRIMARY KEY (`program_id`),
  ADD UNIQUE KEY `program_id` (`program_id`);

--
-- Indexes for table `sitmanger`
--
ALTER TABLE `sitmanger`
  ADD PRIMARY KEY (`sitManger_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `about`
--
ALTER TABLE `about`
  MODIFY `about_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `act_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=484;

--
-- AUTO_INCREMENT for table `camp`
--
ALTER TABLE `camp`
  MODIFY `camp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `visitor_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `coures_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `meeting`
--
ALTER TABLE `meeting`
  MODIFY `meeting_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `menuitem`
--
ALTER TABLE `menuitem`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `news`
--
ALTER TABLE `news`
  MODIFY `news_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `program`
--
ALTER TABLE `program`
  MODIFY `program_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `sitmanger`
--
ALTER TABLE `sitmanger`
  MODIFY `sitManger_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
