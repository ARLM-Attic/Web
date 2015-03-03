/*
Navicat MySQL Data Transfer

Source Server         : test
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : yii

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2015-03-03 13:23:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `yii_article`
-- ----------------------------
DROP TABLE IF EXISTS `yii_article`;
CREATE TABLE `yii_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fatherid` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `content` text NOT NULL,
  `author` varchar(50) NOT NULL,
  `time` varchar(30) NOT NULL,
  `hit` int(11) NOT NULL,
  `info` varchar(200) NOT NULL,
  `thumb` varchar(100) NOT NULL,
  `state` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `articlr` (`fatherid`),
  CONSTRAINT `articlr` FOREIGN KEY (`fatherid`) REFERENCES `yii_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of yii_article
-- ----------------------------
INSERT INTO `yii_article` VALUES ('9', '2', '嘎嘎', '<p>刚好回家<br/></p>', 'admin', '2014-09-10  16:09:15', '0', '烦烦烦噶', 'img_14103379952948.png', 'true');
INSERT INTO `yii_article` VALUES ('12', '3', '444', '<p>4444<br/></p>', 'admin', '2014-12-13  16:12:55', '0', '444', 'img_14184586756787.png', 'true');
