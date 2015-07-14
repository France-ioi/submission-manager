CREATE TABLE `tm_grader_checks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `sDescription` mediumtext NOT NULL COMMENT 'TODO',
  `idTask` int(11) DEFAULT NULL COMMENT 'TODO',
  `sLangProg` varchar(15) NOT NULL COMMENT 'TODO',
  `sSource` mediumtext NOT NULL COMMENT 'TODO',
  `sTestData` mediumtext NOT NULL COMMENT 'TODO',
  `iVersion` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `synchro` (`iVersion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8