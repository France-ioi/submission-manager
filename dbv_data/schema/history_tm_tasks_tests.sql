CREATE TABLE `history_tm_tasks_tests` (
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
  `iVersion` int(11) NOT NULL DEFAULT '0',
  `idSubtask` int(11) NOT NULL DEFAULT '-1',
  `iNextVersion` int(11) NOT NULL,
  PRIMARY KEY (`historyID`),
  UNIQUE KEY `TaskGroupUserRank` (`idTask`,`sGroupType`,`idUser`,`iRank`),
  KEY `TestName` (`sName`),
  KEY `synchro` (`iVersion`),
  KEY `TaskGroup` (`idTask`,`sGroupType`),
  KEY `TaskGroupUser` (`idTask`,`sGroupType`,`idUser`),
  KEY `idUser` (`idUser`),
  KEY `idTask` (`idTask`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8