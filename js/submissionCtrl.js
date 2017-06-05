angular.module('submission-manager', []);

angular.module('submission-manager').directive('animation', function()
{
   'use strict';
   return {
      restrict: 'EA',
      //replace: true,
      //transclude: true,
      scope: {
         idtest: '=',
         commands: '='
      },
      link: function ($scope, $elem, attrs)
      {
         var hasLoadedSimulation = [];
         hasLoadedSimulation[$scope.idtest] = false;
         try {
            $scope.commands = $.parseJSON($scope.commands);
         } catch(e) {
            console.error('can\'t parse '+$scope.commands);
         }
         var selector = '#anim' + $scope.idtest + '';
         $scope.$on("clickOnTest", function (event, args)
         {
            if (args[0] == $scope.idtest && !hasLoadedSimulation[$scope.idtest])
            {
               hasLoadedSimulation[$scope.idtest] = true;
               if (typeof taskSettings !== 'undefined' && typeof taskSettings.animationFeatures !== 'undefined') {
                  if (fioiVideoPlayers.hasOwnProperty('successPlayer') && fioiVideoPlayers['successPlayer'].isPlaying) {
                     simulationToVideo(fioiVideoPlayers['successPlayer'], 0, selector, taskSettings.animationFeatures(selector), $scope.commands);
                  } else if (fioiVideoPlayers.hasOwnProperty('failurePlayer') && fioiVideoPlayers['failurePlayer'].isPlaying) {
                     simulationToVideo(fioiVideoPlayers['failurePlayer'], 0, selector, taskSettings.animationFeatures(selector), $scope.commands);
                  } else {
                     simulationInstance(selector, taskSettings.animationFeatures(selector), $scope.commands);
                     $('.restart').trigger('click');
                  }
               }
            }
         });
      },
      templateUrl: 'submission-manager/anim.html'
   };
});

// TODO: use eval
function addScript (str)
{
   $('head').append('<script type="text/javascript">' + str + '</script>');
}

angular.module('submission-manager').controller('submissionController', ['$scope', '$sce', '$rootScope', function($scope, $sce, $rootScope)
{
   $scope.submissionManager = submissionManager;
   $scope.submissionManager.initConstants($scope);

//   $scope.loading = true;

//   $scope.hasAskedSubmission = false;
//   $scope.idShown = -1;

//   $scope.submission = new Array();
//   $scope.submission.subtasks = new Array();
   $scope.showSubmission = true;
   $scope.showDetailsTests = false; // Used when there are no subtasks.
   $scope.hasLoadedAnim = false;
   $scope.hasAnimation = (typeof taskSettings !== 'undefined' && typeof taskSettings.animationFeatures !== 'undefined');

   SyncQueue.addSyncEndListeners("submissionController.apply", function () {
      if ($scope.submission)
      {
         var idShown = $scope.initDetailsTests($scope.submission);
         if (idShown !== -1)
         {
            $scope.idShown = idShown;
         }
         $scope.configureLogsError($scope.submission.tests);
      }
      $scope.loading = false;

      if ($scope.idShown != -1 && $scope.submission)
      {
         if ($scope.submission.task_sScriptAnimation)
         {
            $scope.$broadcast("clickOnTest", [$scope.idShown]);
         }
      }
   });

   $scope.displayError = function (index)
   {
      if ($scope.idTestToLog == -1 || $scope.idTestToLog == index)
      {
         $scope.idTestToLog = index;
         return true;
      }
      else
      {
         return false;
      }
   };

   $scope.nl2br = function (str) {
      return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2');
   };

   $scope.toTrust = function(str)
   {
      return $sce.trustAsHtml(str);
   };

   $scope.countTestsSucceeded = function(curSubtask)
   {
      var nbTestsSucceeded = 0;
      for (var iTest = 0; iTest < curSubtask.submissionTests.length; iTest++)
      {
         if (curSubtask.submissionTests[iTest].iErrorCode == $scope.ERROR_NoError)
         {
            nbTestsSucceeded++;
         }
      }
      return nbTestsSucceeded;
   };

   $scope.initDetailsTests = function(submission)
   {
      var idApplied = -1;
      var hasFoundAnError,iTest,curTest;

      if($rootScope.curSubmissionLang) {
         submission.sourceLang = $rootScope.curSubmissionLang;
      } else if(submission.sourceCode && submission.sourceCode.params && submission.sourceCode.params.sLangProg) {
         submission.sourceLang = submission.sourceCode.params.sLangProg;
      } else {
         submission.sourceLang = '';
      }

      if(typeof taskSettings !== 'undefined' && typeof taskSettings.evaluationCallback !== 'undefined') {
         taskSettings.evaluationCallback(submission);
      }

      // If there are subtasks in this problem
      if (submission.submissionSubtasks && submission.submissionSubtasks.length > 0)
      {
         var subtasks = submission.submissionSubtasks;
         hasFoundAnError = false;
         for (var curSubtask = 0; curSubtask < subtasks.length; curSubtask++)
         {
            var subtask = subtasks[curSubtask];

            if (!subtask.cached) // If it is undefined, we set it.
            {
               subtask.cached = [];
               subtask.cached.showDetailsTests = false;

               for (iTest = 0; iTest < subtask.submissionTests.length; iTest++) // Nevertheless, if we find a test that has an error, we automatically display it
               {
                  curTest = subtask.submissionTests[iTest];
                  curTest.cached = [];
                  if (submissionManager.getStatusTest(curTest.iErrorCode) != 'ok' && !hasFoundAnError) // We'll automatically display both the subtask and the test
                  {
                     subtask.cached.showDetailsTests = true;
                     curTest.cached.isShown = true;
                     hasFoundAnError = true;
                     idApplied = curTest.ID;
                  }
                  else
                  {
                     curTest.cached.isShown = false;
                  }
               }
            }
            else // Already set
            {
               hasFoundAnError = true;
            }
         }

         if (!hasFoundAnError) // No error => we display both the first subtask and the first test
         {
            subtasks[0].cached.showDetailsTests = true;
            if (subtasks[0].submissionTests.length > 0) // We make sure that some tests exist
            {
               subtasks[0].submissionTests[0].cached.isShown = true;
               idApplied = subtasks[0].submissionTests[0].ID;
            }
         }
      }
      // If there are no subtasks

      if ($scope.submission.submissionSubtasks.length === 0 && $scope.submission.tests.length > 0)
      {
         hasFoundAnError = false;

         for (iTest = 0; iTest < submission.tests.length; iTest++)
         {
            curTest = submission.tests[iTest];
            if (!curTest.cached) // We set it
            {
               curTest.cached = {};
               if (submissionManager.getStatusTest(curTest.iErrorCode) != 'ok' && !hasFoundAnError)
               {
                  curTest.cached.isShown = true;
                  hasFoundAnError = true;
                  idApplied = curTest.ID;
               }
               else
               {
                  curTest.cached.isShown = false;
               }
            }
            else // Otherwise, it is already set.
            {
               hasFoundAnError = true;
            }
         }

         if (!hasFoundAnError)
         {
            submission.tests[0].cached.isShown = true;
            idApplied = submission.tests[0].ID;
         }
      }

      return idApplied;
   };

   $scope.configureLogsError = function(tests)
   {
      for (var iTest = 0; iTest < tests.length; iTest++)
      {
         var dataITest = tests[iTest];
         if (submissionManager.getStatusTest(dataITest.iErrorCode) == 'error' || submissionManager.getStatusTest(dataITest.iErrorCode) == 'errorNoLog')
         {
            $scope.displayError(dataITest.ID);
         }
      }
   };

   function getDiffHtmlFromLines(src, dst) {
      // No longer used
      if (src == '') return '';
      if (dst == '') return '<span class="errorInLog">'+src+'</span>';
      var indexStart = -1;
      var indexStop = -1;
      var i, idest;
      for (i = 0; i < src.length; i++) {
         if (i >= dst.length) {
            return src;
         }
         if (src[i] != dst[i]) {
            indexStart = i;
            break;
         }
      }
      if (indexStart == -1) {
         return src;
      }
      for (i = src.length-1; i >= 0; i--) {
         idest = i + dst.length - src.length;
         if (idest < 0 || src[i] != dst[idest]) {
            indexStop = i;
            break;
         }
      }
      if (indexStop == -1) {
         indexStop = src.length-1;
      }
      if (indexStop < indexStart) {
         console.error('ho ho...');
         return src;
      }
      var res = src.substring(0,indexStart);
      res += '<span class="errorInLog">';
      res += src.substring(indexStart, indexStop+1);
      res += '</span>';
      res += src.substring(indexStop+1);
      return res;
   }

   // The following function defines the behavior for the default log format. See
   // the documentation of taskgrader for more information.
   function getDiffHtmlFromLog(log) {
      if (!log) {
         return '';
      }
      resSol = '';
      resExp = '';
      if (log.excerptRow > 1) {
         resSol += '...\n';
         resExp += '...\n';
      }
      var iRow;
      var realdiffRow = log.diffRow - log.excerptRow;
      var rowsSol = log.displayedSolutionOutput.split('\n');
      var rowsExp = log.displayedExpectedOutput.split('\n');

      // Rows before the diff
      for (iRow = 0; iRow < realdiffRow; iRow++) {
         resSol += rowsSol[iRow]+'\n';
         resExp += rowsExp[iRow]+'\n';
      }

      // Row with the diff
      var diffRowSol = realdiffRow < rowsSol.length ? rowsSol[realdiffRow] : '';
      var diffCol = log.diffCol-1
      // Highlight only the first different character
      if (diffCol < diffRowSol.length) {
         resSol += diffRowSol.substring(0, diffCol);
         resSol += '<span class="errorInLog">';
         resSol += diffRowSol.substring(diffCol, diffCol+1);
         resSol += '</span>';
         resSol += diffRowSol.substring(diffCol+1);
      } else {
         // There is no character in the solution on that position, we add a space
         resSol += diffRowSol;
         resSol += '<span class="errorInLog">&nbsp;</span>';
      }
      resSol += '\n';
      resExp += realdiffRow < rowsExp.length ? (rowsExp[realdiffRow]+'\n') : '';

      // Rows after the diff
      for (iRow = realdiffRow+1; iRow < rowsSol.length; iRow++) {
         resSol += iRow < rowsSol.length ? (rowsSol[iRow]+'\n') : '';
      }
      for (iRow = realdiffRow+1; iRow < rowsExp.length; iRow++) {
         resExp += iRow < rowsExp.length ? (rowsExp[iRow]+'\n') : '';
      }

      if (log.truncatedAfter) {
         resSol += '... ';
         resExp += '... ';
      }
      res =  'Votre programme a affiché :<br>\n';
      res += '<pre>'+resSol+'</pre>';
      res += 'alors que la réponse attendue était :<br>\n';
      res += '<pre>'+resExp+'</pre>';
      res += 'Pour vous aider, le premier caractère différent est mis sur fond rouge.<br><br>Vérifiez bien que vous affichez exactement ce qui est demandé et rien de plus. Vérifiez aussi les retours à la ligne.';
      return res;
   }

   $scope.getLog = function(curTest) {
      var evalFun = curTest.submission.task.displayChecker;
      if (evalFun) {
         return evalFun(curTest);
      }
      var sLog = curTest.sLog;
      try {
         var sLogParsed = JSON.parse(sLog);
      } catch (e) {
         function htmlEntities(str) {
            return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
         }
         return 'Réponse de l\'évaluation :<pre>'+htmlEntities(sLog)+'</pre>';
      }
      return getDiffHtmlFromLog(sLogParsed);
   };

   $scope.round = function(val)
   {
      return Math.round(val);
   };

   $scope.floor = function(val)
   {
      return Math.floor(val);
   };

   $scope.minzero = function(val)
   {
      return (val < 0 ? '0.00' : val);
   };

   $scope.firstCharDiff = function(inputStr, expectedStr)
   {
      var result = "";
      var hasFoundError = false;
      for (var pos = 0; pos < inputStr.length; pos++)
      {
         if (inputStr[pos] == expectedStr[pos] || hasFoundError)
         {
            result += inputStr[pos];
         }
         else
         {
            result += "<span class=\"charDiff\">" + inputStr[pos] + "</span>";
            hasFoundError = true;
         }
      }
      return result;
   };

   $scope.formatDate = function(date) // Not used
   {
      var months = [];
      months.Jan = "01";
      months.Feb = "02";
      months.Mar = "03";
      months.Apr = "04";
      months.May = "05";
      months.Jun = "06";
      months.Jul = "07";
      months.Aug = "08";
      months.Sep = "09";
      months.Oct = "10";
      months.Nov = "11";
      months.Dec = "12";

      date = date.toString();
      date = date.split(' ');

      var dayData = date[4].split(':');

      var str = date[2] + "/" + months[date[1]] + "/" + date[3] + " à " + dayData[0] + ':' + dayData[1];
      return str;
   };

   $scope.getImageAbsoluteUrl = function(idTask, md5, imageName)
   {
      return 'http://data.france-ioi.org/' + idTask + '/' + md5 + '/' + imageName;
   };

   $scope.toLog = function (str) // Debug function - to remove later
   {
      console.log(str);
   };

   $scope.clickTest = function(idTest)
   {
      var arg = [idTest];
      $scope.$broadcast("clickOnTest", arg);
   };
}]);
