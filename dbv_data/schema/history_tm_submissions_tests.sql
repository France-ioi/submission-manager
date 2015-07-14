CREATE TABLE `history_tm_submissions_tests` (
  `historyID` bigint(20) NOT NULL AUTO_INCREMENT,
  `id` int(11) NOT NULL,
  `idSubmission` int(11) NOT NULL DEFAULT '0',
  `idTest` int(11) NOT NULL DEFAULT '0',
  `iScore` int(11) NOT NULL DEFAULT '0',
  `iTimeMs` int(11) NOT NULL DEFAULT '0',
  `iErrorCode` int(11) NOT NULL DEFAULT '0',
  `sOutput` mediumtext NOT NULL,
  `sExpectedOutput` mediumtext NOT NULL,
  `iVersion` int(11) NOT NULL DEFAULT '0',
  `iNextVersion` int(11) NOT NULL,
  PRIMARY KEY (`historyID`),
  KEY `synchro` (`iVersion`),
  KEY `idSubmission` (`idSubmission`),
  KEY `idTest` (`idTest`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8