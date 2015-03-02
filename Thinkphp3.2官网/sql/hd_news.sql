/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2014-08-25 19:55:49
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `hd_news`
-- ----------------------------
DROP TABLE IF EXISTS `hd_news`;
CREATE TABLE `hd_news` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `time` varchar(100) DEFAULT NULL,
  `href` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hd_news
-- ----------------------------
INSERT INTO `hd_news` VALUES ('1', '中国的大电竞时代正在开启', '2011/03/27', 'http://tech.sina.com.cn/zl/post/detail/i/2014-08-05/pid_8458327.htm');
INSERT INTO `hd_news` VALUES ('2', ' 为什么HTC会一而再地业绩下滑', '2010/12/22', 'http://tech.sina.com.cn/zl/post/detail/it/2014-08-06/pid_8458435.htm');
INSERT INTO `hd_news` VALUES ('5', '传苹果公司9月9日召开iPhone发布会', '2014/08/06 ', 'http://tech.sina.com.cn/t/apple/2014-08-06/05059537798.shtml');
INSERT INTO `hd_news` VALUES ('7', '微软裁员新招：积极离职者奖诺基亚手机', '2014/08/07', 'http://tech.sina.com.cn/it/2014-08-06/01489537049.shtml');
INSERT INTO `hd_news` VALUES ('8', '苹果三星同意和解专利纠纷：美国除外', '2014/08/07', 'http://tech.sina.com.cn/t/2014-08-06/10399538445.shtml');
INSERT INTO `hd_news` VALUES ('9', '2欧洲万人提起诉讼 告Facebook侵害隐私权', '2014/08/09 ', 'http://tech.sina.com.cn/i/2014-08-06/10329538440.shtml');
INSERT INTO `hd_news` VALUES ('10', '联想推新款K920手机售价暂未公布', '2014/08/09', 'http://tech.sina.com.cn/t/2014-08-06/09579538386.shtml');
