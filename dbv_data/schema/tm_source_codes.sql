CREATE TABLE `tm_source_codes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idUser` int(11) NOT NULL,
  `idTask` int(11) NOT NULL,
  `sDate` datetime NOT NULL,
  `sLangProg` varchar(30) DEFAULT NULL,
  `sName` varchar(250) NOT NULL,
  `sSource` mediumtext NOT NULL,
  `bEditable` tinyint(4) NOT NULL,
  `iVersion` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `UserTask` (`idUser`,`idTask`),
  KEY `sLanguage` (`sLangProg`),
  KEY `idTask` (`idTask`),
  KEY `synchro` (`iVersion`),
  KEY `sLangProg` (`sLangProg`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8