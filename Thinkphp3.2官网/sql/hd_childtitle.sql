/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2014-08-25 19:55:31
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `hd_childtitle`
-- ----------------------------
DROP TABLE IF EXISTS `hd_childtitle`;
CREATE TABLE `hd_childtitle` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '子标题id',
  `fatherid` int(11) NOT NULL COMMENT '外键关联父标题id',
  `name` varchar(100) NOT NULL COMMENT '子标题名',
  `href` varchar(100) NOT NULL COMMENT '子标题链接',
  `content` text,
  `position` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Title` (`fatherid`),
  CONSTRAINT `Title` FOREIGN KEY (`fatherid`) REFERENCES `hd_headtitle` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hd_childtitle
-- ----------------------------
INSERT INTO `hd_childtitle` VALUES ('2', '2', '飞磨风语', '/think/index.php/Home/Index/htmlhandler/id/2#b1', '我们以丰富人们的沟通和生活为愿景，运用信息与通信领域专业经验,<br>消除数字鸿沟，让人人享有宽带。为应对全球气候变化挑战，<br>华为通过领先的绿色解决方案，帮助客户及其他行业降低能源消耗和二氧化碳排放，创造最佳的社会、经济和环境效益。', '1');
INSERT INTO `hd_childtitle` VALUES ('3', '2', '发展历程', '/think/index.php/Home/Index/htmlhandler/id/2#b2', '华为于1987年成立于中国深圳。在20多年的时间里，华为全体员工付出艰苦卓越的努力，<br>以开放的姿态参与到全球化的经济竞合中，逐步发展成一家业务遍及全球170多个国家和地区的全球化公司。', '2');
INSERT INTO `hd_childtitle` VALUES ('4', '2', '组织结构', '/think/index.php/Home/Index/htmlhandler/id/2#b3', '华为是全球领先的信息与通信解决方案供应商。我们围绕客户的需求持续创新，与合作伙伴开放合作，<br>在电信网络、企业网络、消费者和云计算等领域构筑了端到端的解决方案优势。我们致力于为电信运营商、企业和消费者等提供有竞争力的 ICT 解决方案和服务，持续提升客户体验，<br>为客户创造最大价值。目前，华为的产品和解决方案已经应用于170 多个国家和地区，服务全球1/3的人口。<br>tttt<br>', '3');
INSERT INTO `hd_childtitle` VALUES ('5', '2', '企业文化', '/think/index.php/Home/Index/htmlhandler/id/2#b4', '我们有专业的行业培训人员，可以提供技术培训服务。<br>\r\n培训项目包括：<br>\r\n现代企业项目管理培训<br>\r\n终端应用项目管理培训<br>\r\n手机平台研发培训<br>\r\n终端产品架构培训<br>\r\nSymbian开发培训<br>\r\nWindows Phone开发培训<br>\r\niPhone开发培训<br>\r\nAndroid开发培训<br>\r\n手机建站（WAP）技术培训', '4');
INSERT INTO `hd_childtitle` VALUES ('6', '3', '行业新闻', '/think/index.php/Home/Index/htmlhandler/id/3#b1', '华为于1987年成立于中国深圳。1<span style=\"background-color: rgb(255, 153, 0);\"><br><b>以开放的姿态参与到全球化的经济竞合中，逐步发展成一家业务遍及全球170多个国家和地区的全球化公司。<br><br>抗法法规哈夫病<br></b></span>', '1');
INSERT INTO `hd_childtitle` VALUES ('7', '3', '飞磨新闻', '/think/index.php/Home/Index/htmlhandler/id/3#b2', '我们以丰富人们的沟通和生活为愿景，运用信息与通信领域专业经验,<br>消除数字鸿沟，让人人享有宽带。为应对全球气候变化挑战，<br>华为通过领先的绿色解决方案，帮助客户及其他行业降低能源消耗和二氧化碳排放，创造最佳的社会、经济和环境效益。', '2');
INSERT INTO `hd_childtitle` VALUES ('8', '4', '手游视频', '/think/index.php/Home/Index/htmlhandler/id/4#b1', '我们有专业的行业培训人员，可以提供技术培训服务。<br>\r\n培训项目包括：<br>\r\n现代企业项目管理培训<br>\r\n终端应用项目管理培训<br>\r\n手机平台研发培训<br>\r\n终端产品架构培训<br>\r\nSymbian开发培训<br>\r\nWindows Phone开发培训<br>\r\niPhone开发培训<br>\r\nAndroid开发培训<br>\r\n手机建站（WAP）技术培训', '1');
INSERT INTO `hd_childtitle` VALUES ('9', '4', '桌面游戏', '/think/index.php/Home/Index/htmlhandler/id/4#b2', '我们以丰富人们的沟通和生活为愿景，运用信息与通信领域专业经验,<br>消除数字鸿沟，让人人享有宽带。为应对全球气候变化挑战，<br>华为通过领先的绿色解决方案，帮助客户及其他行业降低能源消耗和二氧化碳排放，创造最佳的社会、经济和环境效益。', '2');
INSERT INTO `hd_childtitle` VALUES ('10', '4', '风客影音', '/think/index.php/Home/Index/htmlhandler/id/4#b3', '我们有专业的行业培训人员，可以提供技术培训服务。<br>\r\n培训项目包括：<br>\r\n现代企业项目管理培训<br>\r\n终端应用项目管理培训<br>\r\n手机平台研发培训<br>\r\n终端产品架构培训<br>\r\nSymbian开发培训<br>\r\nWindows Phone开发培训<br>\r\niPhone开发培训<br>\r\nAndroid开发培训<br>\r\n手机建站（WAP）技术培训', '3');
INSERT INTO `hd_childtitle` VALUES ('11', '5', '广告投放合作', '/think/index.php/Home/Index/htmlhandler/id/5#b1', '我们以丰富人们的沟通和生活为愿景，运用信息与通信领域专业经验,<br>消除数字鸿沟，让人人享有宽带。为应对全球气候变化挑战，<br>华为通过领先的绿色解决方案，帮助客户及其他行业降低能源消耗和二氧化碳排放，创造最佳的社会、经济和环境效益。', '1');
INSERT INTO `hd_childtitle` VALUES ('12', '5', '技术培训合作', '/think/index.php/Home/Index/htmlhandler/id/5#b2', '华为是全球领先的信息与通信解决方案供应商。我们围绕客户的需求持续创新，与合作伙伴开放合作，<br>在电信网络、企业网络、消费者和云计算等领域构筑了端到端的解决方案优势。我们致力于为电信运营商、企业和消费者等提供有竞争力的 ICT 解决方案和服务，持续提升客户体验，<br>为客户创造最大价值。目前，华为的产品和解决方案已经应用于170 多个国家和地区，服务全球1/3的人口。', '2');
INSERT INTO `hd_childtitle` VALUES ('13', '6', '人才理念', '/think/index.php/Home/Index/htmlhandler/id/6#b1', '我们以丰富人们的沟通和生活为愿景，运用信息与通信领域专业经验,<br>消除数字鸿沟，让人人享有宽带。为应对全球气候变化挑战，<br>华为通过领先的绿色解决方案，帮助客户及其他行业降低能源消耗和二氧化碳排放，创造最佳的社会、经济和环境效益。', '1');
INSERT INTO `hd_childtitle` VALUES ('15', '6', '联系我们', '/think/index.php/Home/Index/htmlhandler/id/6#b3', '我们有专业的行业培训人员，可以提供技术培训服务。<br>\r\n培训项目包括：<br>\r\n现代企业项目管理培训<br>\r\n终端应用项目管理培训<br>\r\n手机平台研发培训<br>\r\n终端产品架构培训<br>\r\nSymbian开发培训<br>\r\nWindows Phone开发培训<br>\r\niPhone开发培训<br>\r\nAndroid开发培训<br>\r\n手机建站（WAP）技术培训', '3');
INSERT INTO `hd_childtitle` VALUES ('16', '7', '风客系列', '/think/index.php/Home/Index/htmlhandler/id/7#b1', '我们以丰富人们的沟通和生活为愿景，运用信息与通信领域专业经验,<br>消除数字鸿沟，让人人享有宽带。为应对全球气候变化挑战，<br>华为通过领先的绿色解决方案，帮助客户及其他行业降低能源消耗和二氧化碳排放，创造最佳的社会、经济和环境效益。<br><br>qqq<br>', '1');
INSERT INTO `hd_childtitle` VALUES ('17', '7', '极客系列', '/think/index.php/Home/Index/htmlhandler/id/7#b2', '华为是全球领先的信息与通信解决方案供应商。我们围绕客户的需求持续创新，与合作伙伴开放合作，<br>在电信网络、企业网络、消费者和云计算等领域构筑了端到端的解决方案优势。我们致力于为电信运营商、企业和消费者等提供有竞争力的 ICT 解决方案和服务，持续提升客户体验，<br>为客户创造最大价值。目前，华为的产品和解决方案已经应用于170 多个国家和地区，服务全球1/3的人口。', '2');
