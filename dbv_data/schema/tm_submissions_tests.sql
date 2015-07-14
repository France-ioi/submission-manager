CREATE TABLE `tm_submissions_tests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idSubmission` int(11) NOT NULL DEFAULT '0',
  `idTest` int(11) NOT NULL DEFAULT '0',
  `iScore` int(11) NOT NULL DEFAULT '0',
  `iTimeMs` int(11) NOT NULL DEFAULT '0',
  `iErrorCode` int(11) NOT NULL DEFAULT '0',
  `sOutput` mediumtext NOT NULL,
  `sExpectedOutput` mediumtext NOT NULL,
  `iVersion` int(11) NOT NULL DEFAULT '0',
  `idSubmissionSubtask` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `synchro` (`iVersion`),
  KEY `idSubmission` (`idSubmission`),
  KEY `idTest` (`idTest`),
  KEY `idTest_2` (`idTest`),
  CONSTRAINT `tm_submissions_tests_ibfk_1` FOREIGN KEY (`idTest`) REFERENCES `tm_tasks_tests` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8