/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2014-08-25 19:55:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `hd_headtitle`
-- ----------------------------
DROP TABLE IF EXISTS `hd_headtitle`;
CREATE TABLE `hd_headtitle` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '头部主标题id',
  `name` varchar(100) NOT NULL COMMENT '主标题名',
  `href` varchar(100) NOT NULL COMMENT '主标题链接',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hd_headtitle
-- ----------------------------
INSERT INTO `hd_headtitle` VALUES ('2', '公司简介', '/think/index.php/Home/Index/htmlhandler/id/2');
INSERT INTO `hd_headtitle` VALUES ('3', '新闻资讯', '/think/index.php/Home/Index/htmlhandler/id/3');
INSERT INTO `hd_headtitle` VALUES ('4', '产品展示', '/think/index.php/Home/Index/htmlhandler/id/4');
INSERT INTO `hd_headtitle` VALUES ('5', '商务合作', '/think/index.php/Home/Index/htmlhandler/id/5');
INSERT INTO `hd_headtitle` VALUES ('6', '招贤纳士', '/think/index.php/Home/Index/htmlhandler/id/6');
INSERT INTO `hd_headtitle` VALUES ('7', '品牌展示', '/think/index.php/Home/Index/htmlhandler/id/7');
