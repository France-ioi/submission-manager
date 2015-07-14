CREATE TABLE `history_tm_submissions_subtasks` (
  `historyID` int(11) NOT NULL AUTO_INCREMENT,
  `id` int(11) NOT NULL,
  `iSuccess` int(11) NOT NULL,
  `iScore` int(11) NOT NULL,
  `idSubtask` int(11) NOT NULL,
  `idSubmission` int(11) NOT NULL,
  `iVersion` int(11) NOT NULL,
  `iNextVersion` int(11) NOT NULL,
  PRIMARY KEY (`historyID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1