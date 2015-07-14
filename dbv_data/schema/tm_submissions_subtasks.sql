CREATE TABLE `tm_submissions_subtasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `iSuccess` int(11) NOT NULL,
  `iScore` int(11) NOT NULL,
  `idSubtask` int(11) NOT NULL,
  `idSubmission` int(11) NOT NULL,
  `iVersion` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1