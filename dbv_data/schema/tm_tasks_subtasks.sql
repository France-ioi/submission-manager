CREATE TABLE `tm_tasks_subtasks` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `idTask` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `comments` text NOT NULL,
  `iPointsMax` int(11) NOT NULL,
  `weighting` int(11) NOT NULL,
  `iVersion` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1