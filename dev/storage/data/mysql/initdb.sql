-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: mysql
-- Generation Time: Nov 24, 2025 at 10:32 PM
-- Server version: 9.1.0
-- PHP Version: 8.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `main`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
                            `account_id` int UNSIGNED NOT NULL,
                            `user_id` int UNSIGNED DEFAULT NULL,
                            `admin_note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
                            `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`account_id`, `user_id`, `admin_note`, `created_at`) VALUES
    (1, 1, 'Admin', '2024-12-05 09:16:20');

-- --------------------------------------------------------

--
-- Table structure for table `account_invitation_tokens`
--

CREATE TABLE `account_invitation_tokens` (
                                             `owner_id` int UNSIGNED NOT NULL COMMENT 'PK = ACCOUNT_ID',
                                             `invited_id` int UNSIGNED DEFAULT NULL COMMENT 'PK = ACCOUNT_ID',
                                             `token` char(24) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '????-????-????-????-????',
                                             `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                                             `used_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `files`
--

CREATE TABLE `files` (
                         `file_id` int UNSIGNED NOT NULL,
                         `owner_id` int UNSIGNED DEFAULT NULL COMMENT 'FK = user_id',
                         `uuid` binary(16) NOT NULL,
                         `name` varchar(64) DEFAULT NULL,
                         `category` enum('FILE','AUDIO','VIDEO','IMAGE') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'FILE',
                         `type` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                         `size` int UNSIGNED NOT NULL DEFAULT '0' COMMENT 'File Size in Bytes',
                         `checksum` binary(20) NOT NULL,
                         `is_public` tinyint(1) NOT NULL COMMENT 'Defines if this file is accesable to everyone on the this world',
                         `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `files`
--

INSERT INTO `files` (`file_id`, `owner_id`, `uuid`, `name`, `category`, `type`, `size`, `checksum`, `is_public`, `created_at`) VALUES
    (1, NULL, 0x49e91a61155d11f09ccbfe35cc3926f9, 'test', 'IMAGE', 'png', 42, 0xe9bd6d762d4448a8da6915f8cd5d25b76c618d69, 0, '2025-04-09 16:13:13');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
                               `permission_id` int UNSIGNED NOT NULL,
                               `node` varchar(128) NOT NULL,
                               `description` varchar(255) DEFAULT NULL,
                               `prestige_level` enum('CRITICAL','HIGH','MODERATE','LOW') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'LOW' COMMENT 'Defines if this permission is a threat to the whole application ',
                               `default_value` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `permissions`
--

INSERT INTO `permissions` (`permission_id`, `node`, `description`, `prestige_level`, `default_value`) VALUES
                                                                                                          (1, 'admin.role.delete', 'Can Delete Existing Roles', 'CRITICAL', NULL),
                                                                                                          (3, 'admin.role.create', 'Can Create New Roles', 'CRITICAL', NULL),
                                                                                                          (4, 'admin.role.edit', 'Can Edit Existing Roles', 'CRITICAL', NULL),
                                                                                                          (5, 'feature.referral.own.enabled', 'Enables the referrals owned by this account', 'MODERATE', NULL),
                                                                                                          (6, 'feature.referral.own.create', 'Is allowed to create an infinite amount of referrals', 'LOW', NULL),
                                                                                                          (7, 'feature.referral.own.create.limit', 'Is only allowed to create X amount of referrals ', 'LOW', 5),
                                                                                                          (8, 'feature.referral.own.delete', 'Is allowed to delete your own referrals ', 'LOW', NULL),
                                                                                                          (9, 'feature.referral.own.edit', 'Is allowed to edit your own referrals ', 'LOW', NULL),
                                                                                                          (10, 'feature.referral.other.see', 'Is allowed to see referrals owned by other accounts', 'MODERATE', NULL),
                                                                                                          (11, 'feature.referral.other.delete', 'Is allowed to delete referrals owned by other accounts ', 'HIGH', NULL),
                                                                                                          (12, 'feature.referral.other.edit', 'Is allowed to edit referrals owned by other accounts', 'HIGH', NULL),
                                                                                                          (13, 'admin', 'Includes every admin permission', 'CRITICAL', NULL),
                                                                                                          (14, 'admin.role', 'Includes every admin.role permission', 'CRITICAL', NULL),
                                                                                                          (15, 'feature', 'Includes every feature permission', 'HIGH', NULL),
                                                                                                          (16, 'feature.referral', 'Includes every permission', 'HIGH', NULL),
                                                                                                          (17, 'feature.referral.own', 'Includes every feature.referral.own permission', 'LOW', NULL),
                                                                                                          (18, 'feature.referral.other', 'Includes every feature.referral.other permission', 'HIGH', NULL),
                                                                                                          (20, 'admin.role.edit.disable', 'Can disable a Role', 'CRITICAL', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `referrals`
--

CREATE TABLE `referrals` (
                             `referral_id` int UNSIGNED NOT NULL,
                             `owner_id` int UNSIGNED NOT NULL COMMENT 'FK = user_id',
                             `code` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                             `url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                             `label` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
                             `disabled` bit(1) NOT NULL DEFAULT b'0',
                             `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                             `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `referral_click_metric`
--

CREATE TABLE `referral_click_metric` (
                                         `click_id` int UNSIGNED NOT NULL,
                                         `referral_id` int UNSIGNED NOT NULL,
                                         `ip_address` tinyblob,
                                         `clicked_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
                         `role_id` int UNSIGNED NOT NULL,
                         `name` varchar(32) NOT NULL,
                         `description` varchar(255) DEFAULT NULL,
                         `color` binary(3) NOT NULL DEFAULT '\0\0\0',
                         `access_level` smallint UNSIGNED NOT NULL,
                         `applies_to_everyone` tinyint(1) NOT NULL DEFAULT '0',
                         `deletable` tinyint(1) NOT NULL DEFAULT '1',
                         `editable` tinyint(1) NOT NULL DEFAULT '1',
                         `disabled` tinyint(1) NOT NULL DEFAULT '0',
                         `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`role_id`, `name`, `description`, `color`, `access_level`, `applies_to_everyone`, `deletable`, `editable`, `disabled`, `created_at`, `updated_at`) VALUES
                                                                                                                                                                            (1, 'owner', 'Owner of the entire website', 0xaa0000, 0, 0, 0, 0, 0, '2025-04-04 22:12:52', '2025-04-04 22:12:52'),
                                                                                                                                                                            (2, 'administrator', 'Administrator of the website', 0xcd28a0, 1, 0, 1, 1, 0, '2025-04-04 22:17:17', '2025-04-04 22:17:17'),
                                                                                                                                                                            (3, 'moderator', 'Moderator of the website', 0x5dc035, 50, 0, 1, 1, 0, '2025-04-04 22:17:17', '2025-04-04 22:17:17'),
                                                                                                                                                                            (4, 'everyone', 'Every logged in person on the website', 0xa2a2a2, 420, 1, 1, 1, 0, '2025-04-04 22:18:07', '2025-04-04 22:18:07');

-- --------------------------------------------------------

--
-- Table structure for table `role_permission_map`
--

CREATE TABLE `role_permission_map` (
                                       `role_id` int UNSIGNED NOT NULL,
                                       `permission_id` int UNSIGNED NOT NULL,
                                       `allow_all_sub_permissions` tinyint(1) NOT NULL DEFAULT '0' COMMENT 'Defines if the sub permissions of this permission are also affected',
                                       `value` int DEFAULT NULL COMMENT 'Some random integer value used for limiting something (Is only used, when "is_blacklisted" is set to false)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `role_permission_map`
--

INSERT INTO `role_permission_map` (`role_id`, `permission_id`, `allow_all_sub_permissions`, `value`) VALUES
                                                                                                         (1, 13, 1, NULL),
                                                                                                         (2, 1, 0, NULL),
                                                                                                         (4, 15, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
                         `user_id` int UNSIGNED NOT NULL,
                         `username` varchar(16) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                         `email` varchar(320) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                         `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                         `totp_secret_key` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
                         `email_verified` bit(1) NOT NULL DEFAULT b'0',
                         `disabled` bit(1) NOT NULL DEFAULT b'0',
                         `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
                         `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `username`, `email`, `password`, `totp_secret_key`, `email_verified`, `disabled`, `created_at`, `updated_at`) VALUES
    (1, 'nebalus', 'contact@nebalus.dev', '$2y$10$9xaR/88aZteW49ExqqveWe6O./RkNfrAj3tSNGPCc/keJsT95EcEu', 'S61WXXWZU5J6QT0H4CX4B02X2HET0LYW', b'0', b'0', '2024-02-28 21:28:40', '2024-08-03 23:07:10');

-- --------------------------------------------------------

--
-- Table structure for table `user_role_map`
--

CREATE TABLE `user_role_map` (
                                 `user_id` int UNSIGNED NOT NULL,
                                 `role_id` int UNSIGNED NOT NULL,
                                 `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_role_map`
--

INSERT INTO `user_role_map` (`user_id`, `role_id`, `created_at`) VALUES
    (1, 1, '2025-04-04 22:13:27');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
    ADD PRIMARY KEY (`account_id`),
    ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `account_invitation_tokens`
--
ALTER TABLE `account_invitation_tokens`
    ADD PRIMARY KEY (`token`),
    ADD UNIQUE KEY `invited_user_id` (`invited_id`),
    ADD KEY `owner_user_id` (`owner_id`);

--
-- Indexes for table `files`
--
ALTER TABLE `files`
    ADD PRIMARY KEY (`file_id`),
    ADD KEY `owner_id` (`owner_id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
    ADD PRIMARY KEY (`permission_id`),
    ADD UNIQUE KEY `unique_node` (`node`);

--
-- Indexes for table `referrals`
--
ALTER TABLE `referrals`
    ADD PRIMARY KEY (`referral_id`),
    ADD UNIQUE KEY `refcode` (`code`) USING BTREE,
    ADD KEY `user_id` (`owner_id`);

--
-- Indexes for table `referral_click_metric`
--
ALTER TABLE `referral_click_metric`
    ADD PRIMARY KEY (`click_id`),
    ADD KEY `referral_id` (`referral_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
    ADD PRIMARY KEY (`role_id`),
    ADD UNIQUE KEY `unique_access_level` (`access_level`);

--
-- Indexes for table `role_permission_map`
--
ALTER TABLE `role_permission_map`
    ADD UNIQUE KEY `privilege_map` (`role_id`,`permission_id`) USING BTREE,
    ADD KEY `privilege_id` (`permission_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`user_id`),
    ADD UNIQUE KEY `email` (`email`),
    ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `user_role_map`
--
ALTER TABLE `user_role_map`
    ADD UNIQUE KEY `role_map` (`user_id`,`role_id`),
    ADD KEY `user_id` (`user_id`),
    ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
    MODIFY `account_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `files`
--
ALTER TABLE `files`
    MODIFY `file_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
    MODIFY `permission_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `referrals`
--
ALTER TABLE `referrals`
    MODIFY `referral_id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `referral_click_metric`
--
ALTER TABLE `referral_click_metric`
    MODIFY `click_id` int UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
    MODIFY `role_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
    MODIFY `user_id` int UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `accounts`
--
ALTER TABLE `accounts`
    ADD CONSTRAINT `accounts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE RESTRICT;

--
-- Constraints for table `account_invitation_tokens`
--
ALTER TABLE `account_invitation_tokens`
    ADD CONSTRAINT `account_invitation_tokens_ibfk_2` FOREIGN KEY (`invited_id`) REFERENCES `accounts` (`account_id`) ON UPDATE RESTRICT,
    ADD CONSTRAINT `account_invitation_tokens_ibfk_3` FOREIGN KEY (`owner_id`) REFERENCES `accounts` (`account_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `files`
--
ALTER TABLE `files`
    ADD CONSTRAINT `files_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `referrals`
--
ALTER TABLE `referrals`
    ADD CONSTRAINT `referrals_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `referral_click_metric`
--
ALTER TABLE `referral_click_metric`
    ADD CONSTRAINT `referral_click_metric_ibfk_1` FOREIGN KEY (`referral_id`) REFERENCES `referrals` (`referral_id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `role_permission_map`
--
ALTER TABLE `role_permission_map`
    ADD CONSTRAINT `role_permission_map_ibfk_1` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`permission_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
    ADD CONSTRAINT `role_permission_map_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Constraints for table `user_role_map`
--
ALTER TABLE `user_role_map`
    ADD CONSTRAINT `user_role_map_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE RESTRICT,
    ADD CONSTRAINT `user_role_map_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;