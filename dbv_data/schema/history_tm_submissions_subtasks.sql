CREATE TABLE `history_tm_submissions_subtasks` (
  `historyID` bigint(20) NOT NULL AUTO_INCREMENT,
  `ID` bigint(20) NOT NULL,
  `iSuccess` int(11) NOT NULL,
  `iScore` int(11) NOT NULL,
  `idSubtask` bigint(20) NOT NULL,
  `idSubmission` bigint(20) NOT NULL,
  `iVersion` int(11) NOT NULL,
  `iNextVersion` int(11),
  `bDeleted` tinyint(1) NOT NULL,
  PRIMARY KEY (`historyID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1
