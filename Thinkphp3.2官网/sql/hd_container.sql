/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50617
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50617
File Encoding         : 65001

Date: 2014-08-25 19:55:37
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `hd_container`
-- ----------------------------
DROP TABLE IF EXISTS `hd_container`;
CREATE TABLE `hd_container` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fatherid` int(11) NOT NULL,
  `imagepath` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text,
  `position` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `content` (`fatherid`),
  CONSTRAINT `content` FOREIGN KEY (`fatherid`) REFERENCES `hd_childtitle` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of hd_container
-- ----------------------------
INSERT INTO `hd_container` VALUES ('1', '2', null, null, '我们以丰富人们的沟通和生活为愿景，运用信息与通信领域专业经验,<br>消除数字鸿沟，让人人享有宽带。为应对全球气候变化挑战，<br>华为通过领先的绿色解决方案，帮助客户及其他行业降低能源消耗和二氧化碳排放，创造最佳的社会、经济和环境效益。', '1');
INSERT INTO `hd_container` VALUES ('2', '3', null, null, '华为于1987年成立于中国深圳。在20多年的时间里，华为全体员工付出艰苦卓越的努力，<br>以开放的姿态参与到全球化的经济竞合中，逐步发展成一家业务遍及全球170多个国家和地区的全球化公司。', '2');
INSERT INTO `hd_container` VALUES ('3', '4', null, null, '华为是全球领先的信息与通信解决方案供应商。我们围绕客户的需求持续创新，与合作伙伴开放合作，<br>在电信网络、企业网络、消费者和云计算等领域构筑了端到端的解决方案优势。我们致力于为电信运营商、企业和消费者等提供有竞争力的 ICT 解决方案和服务，持续提升客户体验，<br>为客户创造最大价值。目前，华为的产品和解决方案已经应用于170 多个国家和地区，服务全球1/3的人口。', '3');
INSERT INTO `hd_container` VALUES ('4', '5', null, null, '为客户服务是华为存在的唯一理由，客户需求是华为发展的原动力。我们坚持以客<br>户为中心，快速响应客户需求，持续为客户创造长期价值进而成就客户。为客户提<br>供有效服务，是我们工作的方向和价值评价的标尺，成就客户就是成就我们自己。', '4');
INSERT INTO `hd_container` VALUES ('5', '6', null, null, '我们是专业的手机终端、应用系统开发团队，我们提供最专业的软件开发服务。<br>\r\n手机系统包括：MTK、Symbian、Windows Phone、iPhone、Android、RIM等。<br>\r\n我们有最专业的项目管理人士、我们有最潮流的产品设计师、我们有最专业的开发人员、我们是一支不断创新、锐意进取而又极富责任感的团队。我们有专业的行业培训人员，可以提供技术培训服务。<br>\r\n培训项目包括：<br>\r\n现代企业项目管理培训<br>\r\n终端应用项目管理培训<br>\r\n手机平台研发培训<br>\r\n终端产品架构培训<br>\r\nSymbian开发培训<br>\r\nWindows Phone开发培训<br>\r\niPhone开发培训<br>\r\nAndroid开发培训<br>\r\n手机建站（WAP）技术培训\r\n', '1');
INSERT INTO `hd_container` VALUES ('6', '7', null, null, '我们是专业的手机终端、应用系统开发团队，我们提供最专业的软件开发服务。<br>\r\n手机系统包括：MTK、Symbian、Windows Phone、iPhone、Android、RIM等。<br>\r\n我们有最专业的项目管理人士、我们有最潮流的产品设计师、我们有最专业的开发人员、我们是一支不断创新、锐意进取而又极富责任感的团队。', '2');
INSERT INTO `hd_container` VALUES ('7', '8', null, null, '我们有专业的行业培训人员，可以提供技术培训服务。<br>\r\n培训项目包括：<br>\r\n现代企业项目管理培训<br>\r\n终端应用项目管理培训<br>\r\n手机平台研发培训<br>\r\n终端产品架构培训<br>\r\nSymbian开发培训<br>\r\nWindows Phone开发培训<br>\r\niPhone开发培训<br>\r\nAndroid开发培训<br>\r\n手机建站（WAP）技术培训\r\n', '1');
INSERT INTO `hd_container` VALUES ('8', '9', null, null, '为适应信息行业正在发生的革命性变化，华为围绕客户需求和<br>技术领先持续创新，与业界伙伴开放合作，聚焦构筑面向未来的信息<br>管道，持续为客户和全社会创造价值。基于这些价值主张，华为<br>致力于丰富人们的沟通和生活，提升工作效率。与此同时，我们力争成为电信运营商和企业客户的第一选择和最佳合作伙伴，<br>成为深受消费者喜爱的品牌。', '2');
INSERT INTO `hd_container` VALUES ('9', '10', null, null, '为适应信息行业正在发生的革命性变化，华为围绕客户需求和<br>技术领先持续创新，与业界伙伴开放合作，聚焦构筑面向未来的信息<br>管道，持续为客户和全社会创造价值。基于这些价值主张，华为<br>致力于丰富人们的沟通和生活，提升工作效率。与此同时，我们力争成为电信运营商和企业客户的第一选择和最佳合作伙伴，<br>成为深受消费者喜爱的品牌。', '3');
INSERT INTO `hd_container` VALUES ('10', '11', null, null, '我们以丰富人们的沟通和生活为愿景，运用信息与通信领域专业经验,<br>消除数字鸿沟，让人人享有宽带。为应对全球气候变化挑战，<br>华为通过领先的绿色解决方案，帮助客户及其他行业降低能源消耗和二氧化碳排放，创造最佳的社会、经济和环境效益。', '1');
INSERT INTO `hd_container` VALUES ('11', '12', null, null, '我们以丰富人们的沟通和生活为愿景，运用信息与通信领域专业经验,<br>消除数字鸿沟，让人人享有宽带。为应对全球气候变化挑战，<br>华为通过领先的绿色解决方案，帮助客户及其他行业降低能源消耗和二氧化碳排放，创造最佳的社会、经济和环境效益。', '2');
