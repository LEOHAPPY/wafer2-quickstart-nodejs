
DROP TABLE IF EXISTS `person`;
CREATE TABLE `person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `height` varchar(255) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `hometown` varchar(255) DEFAULT NULL,
  `career` varchar(255) DEFAULT NULL,
  `workplace` varchar(255) DEFAULT NULL,
  `degreeLevel` varchar(255) DEFAULT NULL,
  `brothers` varchar(255) DEFAULT NULL,
  `selfIntro` longtext,
  `selfWish` longtext,
  `wechatID` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) CHARACTER SET = utf8mb4 ENGINE=InnoDB AUTO_INCREMENT=100

INSERT INTO `person` (`userName`, `gender`, `height`, `birthday`, `hometown`, `career`, `workplace`, `degreeLevel`, `brothers`, `selfIntro`, `selfWish`, `wechatID`) VALUES ('leo', '男', '173', '1993-06-19', '["湖南省","长沙市","岳麓区"]', '程序员', '新加坡', '硕士', '老三', '小姐请问有没有卖半岛铁盒', '有啊，你从前面上去左转第二排就有了', 'lc613055')
