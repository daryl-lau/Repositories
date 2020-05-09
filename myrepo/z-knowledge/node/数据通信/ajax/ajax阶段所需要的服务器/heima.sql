/*
Navicat MySQL Data Transfer

Source Server         : itcast
Source Server Version : 50524
Source Host           : localhost:3306
Source Database       : heima

Target Server Type    : MYSQL
Target Server Version : 50524
File Encoding         : 65001

Date: 2019-04-24 16:34:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- -----------------------------
-- Table structure for heros
-- -----------------------------
DROP TABLE IF EXISTS `heros`;
CREATE TABLE `heros` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `gender` char(5) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `isDelete` bit(1) DEFAULT b'0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of heros
-- ----------------------------
INSERT INTO `heros` VALUES ('1', 'jack', '男', '1.jpg', '\0');
INSERT INTO `heros` VALUES ('2', 'rose', '女', '4.jpg', '\0');
INSERT INTO `heros` VALUES ('3', 'lili', '女', '3.jpg', '\0');
INSERT INTO `heros` VALUES ('5', 'tom', '男', '2.jpg', '\0');

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_name` (`userName`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'jack1213', '111111', '13111111111111');
