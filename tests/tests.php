<?php

include_once __DIR__.'/../shared/connect.php';
include_once __DIR__.'/../commonFramework/modelsManager/modelsTools.inc.php';

$db->exec("DELETE FROM tm_tasks WHERE sTextId = 'FranceIOI/Tests/test_1'");

$idTask = $config->testMode->idTask;
$idUser = $config->testMode->idUser;
$idPlatform = $config->testMode->idPlatform;

$db->exec('INSERT INTO `tm_tasks` (`ID`, `sTextId`, `sSupportedLangProg`, `sAuthor`, `sAuthorSolution`, `bShowLimits`, `bUserTests`, `bChecked`, `iEvalMode`, `bUsesLibrary`, `bUseLatex`, `iMinScoreForSuccessGlobal`, `bIsEvaluable`, `sTemplateName`, `iVersion`, `bBebras`, `sBebrasUrl`, `sScriptAnimation`) VALUES
('.$idTask.", 'FranceIOI/Tests/test_1', '*', '', '', 1, 1, 0, 0, 0, 0, 100, 1, '', 0, 0, NULL, '');");

$idSourceCode = getRandomID();

 $db->exec('INSERT INTO `tm_source_codes` (`ID`, `idUser`, `idPlatform`, `idTask`, `sDate`, `sParams`, `sName`, `sSource`, `bEditable`, `iVersion`) VALUES
   ('.$idSourceCode.', '.$idUser.', '.$idPlatform.', '.$idTask.", '2013-04-22 17:17:09', '{\"sLangProg\":\"C++\"}', '', '#include <iostream>\r\n#include <math.h>\r\nusing namespace std;\r\n\r\nint main()\r\n{\r\n    int aire;\r\n    cin >> aire;\r\n\r\n    cout << (pow(aire, 2)) * 23;\r\n}\r\n', 0, 0);");

$idSubmission = getRandomID();

$db->exec('INSERT INTO `tm_submissions` (`ID`, `idUser`, `idTask`, `sDate`, `idSourceCode`, `bManualCorrection`, `iSuccess`, `nbTestsTotal`, `nbTestsPassed`, `iScore`, `bCompilError`, `sCompilMsg`, `sErrorMsg`, `sFirstUserOutput`, `sFirstExpectedOutput`, `sManualScoreDiffComment`, `bEvaluated`, `sMode`, `iChecksum`, `iVersion`, `idPlatform`) VALUES
   ('.$idSubmission.', '.$idUser.', '.$idTask.", '2013-04-22 17:17:09', ".$idSourceCode.", 0, 0, 10, 2, 20, 0, 'Warning message', '', '\n9.86758e+06', '\n9867575\n', '', 1, 'Submitted', 0, 0, '.$idUser.');");

$idSubtask1 = getRandomID();
$db->exec('INSERT INTO `tm_tasks_subtasks` (`ID`, `idTask`, `name`, `comments`, `iPointsMax`, `weighting`, `iVersion`) VALUES
   ('.$idSubtask1.', '.$idTask.", 'subtask 1', 'Nothing special.', 30, 1, 0);");

$db->exec('INSERT IGNORE INTO `tm_tasks_tests` (`ID`, `idTask`, `idSubtask`, `idUser`, `idPlatform`, `sGroupType`, `sInput`, `sOutput`, `iVersion`) VALUES (1, '.$idTask.', '.$idSubtask1.", '.$idUser.', '.$idPlatform.', 'User', '2', '92', '0');");

$idSubtask2 = getRandomID();
$db->exec('INSERT INTO `tm_tasks_subtasks` (`ID`, `idTask`, `name`, `comments`, `iPointsMax`, `weighting`, `iVersion`) VALUES
   ('.$idSubtask2.', '.$idTask.", 'subtask 2', 'Nothing special.', 30, 1, 0);");

$idSubtask3 = getRandomID();
$db->exec('INSERT INTO `tm_tasks_subtasks` (`ID`, `idTask`, `name`, `comments`, `iPointsMax`, `weighting`, `iVersion`) VALUES
   ('.$idSubtask3.', '.$idTask.", 'subtask 3', 'Nothing special.', 40, 1, 0);");

$idSubSubtask1 = getRandomID();
$db->exec('INSERT INTO `tm_submissions_subtasks` (`ID`, `iSuccess`, `iScore`, `idSubtask`, `idSubmission`, `iVersion`) VALUES
   ('.$idSubSubtask1.', 1, 66, '.$idSubtask1.', '.$idSubmission.', 0);');
$idSubSubtask2 = getRandomID();
$db->exec('INSERT INTO `tm_submissions_subtasks` (`ID`, `iSuccess`, `iScore`, `idSubtask`, `idSubmission`, `iVersion`) VALUES
   ('.$idSubSubtask2.', 0, 0, '.$idSubtask2.', '.$idSubmission.', 0);');
$idSubSubtask3 = getRandomID();
$db->exec('INSERT INTO `tm_submissions_subtasks` (`ID`, `iSuccess`, `iScore`, `idSubtask`, `idSubmission`, `iVersion`) VALUES
   ('.$idSubSubtask3.', 0, 0, '.$idSubtask3.', '.$idSubmission.', 0);');

$db->exec('INSERT INTO `tm_submissions_tests` (`idSubmission`, `idTest`, `iScore`, `iTimeMs`, `iErrorCode`, `sOutput`, `sExpectedOutput`, `iVersion`, `idSubmissionSubtask`) VALUES
   ('.$idSubmission.", 1, 100, 0, 0, '', '', 0, ".$idSubSubtask1.'),
   ('.$idSubmission.", 1, 100, 4, 0, '', '', 0, ".$idSubSubtask1.'),
   ('.$idSubmission.", 1, 0, 4, 1, 'ABC', 'DEF', 0, ".$idSubSubtask1.'),
   ('.$idSubmission.", 1, 0, 4, 11, '', '', 0, ".$idSubSubtask2.'),
   ('.$idSubmission.", 1, 0, 4, 137, '', '', 0, ".$idSubSubtask2.'),
   ('.$idSubmission.", 1, 0, 4, 1, '', '', 0, ".$idSubSubtask2.'),
   ('.$idSubmission.", 1, 0, 4, 1, '', '', 0, ".$idSubSubtask3.'),
   ('.$idSubmission.", 1, 0, 4, 137, '', '', 0, ".$idSubSubtask3.'),
   ('.$idSubmission.", 1, 0, 4, 137, '', '', 0, ".$idSubSubtask3.'),
   ('.$idSubmission.", 1, 0, 4, 11, '', '', 0, ".$idSubSubtask3.'),
   ('.$idSubmission.", 1, 30, 760, 2, '', '', 0, ".$idSubSubtask1.');');

