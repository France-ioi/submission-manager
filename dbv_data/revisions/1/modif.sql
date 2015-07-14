CREATE TABLE IF NOT EXISTS `tm_tasks_subtasks` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `idTask` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `comments` text NOT NULL,
  `iPointsMax` int(11) NOT NULL,
  `weighting` int(11) NOT NULL,
  `iVersion` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;


ALTER TABLE `tm_submissions_tests` ADD `idSubmissionSubtask` INT NULL DEFAULT NULL ; 
ALTER TABLE `tm_submissions_tests` ADD `sExpectedOutput` MEDIUMTEXT NULL ; 

CREATE TABLE IF NOT EXISTS `tm_submissions_subtasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iSuccess` int(11) NOT NULL,
  `iScore` int(11) NOT NULL,
  `idSubtask` int(11) NOT NULL,
  `idSubmission` int(11) NOT NULL,
  `iVersion` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=9 ;

ALTER TABLE `tm_tasks_tests` ADD `idSubtask` INT NULL DEFAULT NULL ; 

CREATE TABLE IF NOT EXISTS `synchro_version` (
  `iVersion` int(11) NOT NULL,
  `iLastServerVersion` int(11) NOT NULL,
  `iLastClientVersion` int(11) NOT NULL,
  KEY `iVersion` (`iVersion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `synchro_version` (`iVersion`, `iLastServerVersion`, `iLastClientVersion`) VALUES (0, 0, 0);

CREATE TABLE IF NOT EXISTS `history_tm_source_codes` (
  `historyID` bigint(20) NOT NULL AUTO_INCREMENT,
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idTask` int(11) NOT NULL,
  `sDate` datetime NOT NULL,
  `sLangProg` varchar(30) DEFAULT NULL,
  `sName` varchar(250) NOT NULL,
  `sSource` mediumtext NOT NULL,
  `bEditable` tinyint(4) NOT NULL,
  `iVersion` int(11) NOT NULL,
  `iNextVersion` int(11) DEFAULT NULL,
  `bDeleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`historyID`),
  KEY `recordID` (`id`),
  KEY `iVersion` (`iVersion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `history_tm_submissions` (
  `historyID` bigint(20) NOT NULL AUTO_INCREMENT,
  `id` int(11) NOT NULL,
  `idUser` int(11) NOT NULL,
  `idTask` int(11) NOT NULL COMMENT 'Problem''s ID',
  `sDate` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `idSourceCode` int(11) DEFAULT NULL,
  `bManualCorrection` tinyint(4) NOT NULL DEFAULT '0',
  `iSuccess` tinyint(4) NOT NULL DEFAULT '0',
  `nbTestsTotal` int(11) NOT NULL DEFAULT '0',
  `nbTestsPassed` int(11) NOT NULL DEFAULT '0',
  `iScore` int(11) NOT NULL DEFAULT '0',
  `bCompilError` tinyint(4) NOT NULL DEFAULT '0',
  `sCompilMsg` mediumtext NOT NULL,
  `sErrorMsg` mediumtext NOT NULL,
  `sFirstUserOutput` mediumtext NOT NULL,
  `sFirstExpectedOutput` mediumtext NOT NULL,
  `sManualScoreDiffComment` varchar(255) NOT NULL,
  `bEvaluated` tinyint(4) NOT NULL DEFAULT '0',
  `sMode` enum('Submitted','LimitedTime','Contest') NOT NULL DEFAULT 'Submitted',
  `iChecksum` int(11) NOT NULL DEFAULT '0',
  `idPlatform` int(11) NOT NULL,
  `iVersion` int(11) NOT NULL,
  `iNextVersion` int(11) DEFAULT NULL,
  `bDeleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`historyID`),
  KEY `recordID` (`id`),
  KEY `iVersion` (`iVersion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


CREATE TABLE IF NOT EXISTS `history_tm_tasks_tests` (
  `historyID` bigint(20) NOT NULL AUTO_INCREMENT,
  `id` int(11) NOT NULL,
  `idTask` int(11) NOT NULL,
  `sGroupType` enum('Example','User','Evaluation') DEFAULT NULL,
  `idUser` int(11) DEFAULT NULL,
  `iRank` int(11) NOT NULL DEFAULT '0',
  `sName` varchar(30) NOT NULL,
  `sInput3` mediumtext NOT NULL,
  `sInput` mediumtext NOT NULL,
  `sOutput` mediumtext NOT NULL,
  `sOutput3` mediumtext NOT NULL,
  `idSubtask` int(11) DEFAULT NULL,
  `iVersion` int(11) NOT NULL,
  `iNextVersion` int(11) DEFAULT NULL,
  `bDeleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`historyID`),
  KEY `recordID` (`id`),
  KEY `iVersion` (`iVersion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `history_tm_submissions_tests` (
  `historyID` bigint(20) NOT NULL AUTO_INCREMENT,
  `id` int(11) NOT NULL,
  `idSubmission` int(11) NOT NULL DEFAULT '0',
  `idTest` int(11) NOT NULL DEFAULT '0',
  `iScore` int(11) NOT NULL DEFAULT '0',
  `iTimeMs` int(11) NOT NULL DEFAULT '0',
  `iErrorCode` int(11) NOT NULL DEFAULT '0',
  `sOutput` mediumtext NOT NULL,
  `sExpectedOutput` MEDIUMTEXT NULL,
  `idSubmissionSubtask` INT NULL DEFAULT NULL,
  `iVersion` int(11) NOT NULL,
  `iNextVersion` int(11) DEFAULT NULL,
  `bDeleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`historyID`),
  KEY `recordID` (`id`),
  KEY `iVersion` (`iVersion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `history_tm_tasks_subtasks` (
  `historyID` bigint(20) NOT NULL AUTO_INCREMENT,
  `ID` int(11) NOT NULL,
  `idTask` int(11) NOT NULL COMMENT 'Problem''s ID',
  `name` varchar(255) NOT NULL,
  `comments` text NOT NULL,
  `iPointsMax` int(11) NOT NULL,
  `weighting` int(11) NOT NULL,
  `iVersion` int(11) NOT NULL,
  `iNextVersion` int(11) NOT NULL,
  `bDeleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`historyID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `history_tm_submissions_subtasks` (
  `historyID` int(11) NOT NULL AUTO_INCREMENT,
  `id` int(11) NOT NULL,
  `iSuccess` int(11) NOT NULL,
  `iScore` int(11) NOT NULL,
  `idSubtask` int(11) NOT NULL,
  `idSubmission` int(11) NOT NULL,
  `iVersion` int(11) NOT NULL,
  `iNextVersion` int(11) NOT NULL,
  `bDeleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`historyID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;



ALTER TABLE  `history_tm_tasks` ADD  `historyID` INT NULL AUTO_INCREMENT PRIMARY KEY , ADD  `iNextVersion` INT NOT NULL , ADD  `bDeleted` BOOLEAN NOT NULL;