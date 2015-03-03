/*
Navicat MySQL Data Transfer

Source Server         : test
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : yii

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2015-03-03 13:23:52
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `yii_category`
-- ----------------------------
DROP TABLE IF EXISTS `yii_category`;
CREATE TABLE `yii_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `createuser` varchar(100) DEFAULT NULL,
  `time` varchar(20) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of yii_category
-- ----------------------------
INSERT INTO `yii_category` VALUES ('2', '情感', 'admin', '2014-09-02 15:09:18', '抒发人性情感');
INSERT INTO `yii_category` VALUES ('3', '生活', 'admin', '2014-09-02 15:09:48', '发现生活之美，认识生活。');
INSERT INTO `yii_category` VALUES ('11', '奇人异事', 'admin', '2014-09-27 17:09:18', '方法反反复复反反复复');
