var submission = angular.module('submission', ['ui.bootstrap', 'ngRoute']);

submission.directive('animation', function()
{
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
         
         var hasLoadedSimulation = new Array();
         hasLoadedSimulation[$scope.idtest] = false;
         console.error($scope.commands);
         $scope.commands = $.parseJSON($scope.commands);
         var selector = '#anim' + $scope.idtest + '';
         
         
         $scope.$on("clickOnTest", function (event, args) 
         {
            if (args[0] == $scope.idtest && !hasLoadedSimulation[$scope.idtest])
            {
               hasLoadedSimulation[$scope.idtest] = true;
               /*setTimeout( function() {
               //$.getScript('animations/raphael-min.js', function() {
                  //$.getScript('animations/animation.js', function () {
                    // $.getScript('animations/anim_example.js', function() {
                        simulationInstance(selector, animationFeatures(selector), $scope.commands);
                     //});
                  //});
               //});
            
            
               }, 1);*/
               if (typeof anumationFeatures !== 'undefined') {
                  simulationInstance(selector, animationFeatures(selector), $scope.commands);
               }
               $('.restart').trigger('click');
            }
         });
         

         
         
      },
      templateUrl: 'animations/anim.html'
   };
});

function addScript (str)
{
   $('head').append('<script type="text/javascript">' + str + '</script>');
}

submission.controller('submissionCtrl', ['$scope', '$sce', '$location', function($scope, $sce, $location)
{
	$scope.submissionManager = submissionManager;
   $scope.submissionManager.initConstants($scope);
   
   var urlDatas = $location.absUrl().split('?')[1];
   $scope.curSubmission = urlDatas.split('&')[0].split('=')[1];
   $scope.showSubmission = urlDatas.split('&')[1].split('=')[1];
   heightManager.urlFrom = urlDatas.split('&')[2].split('=')[1];
   
   $scope.showSubmission = ($scope.showSubmission == 'true') ? true : false; // To prevent errors between strings and booleans

   $scope.loading = true;

   heightManager.checkHeight($scope.curSubmission);

   $scope.hasAskedSubmission = false;
      
   $scope.idShown = -1;
   
   $scope.submission = new Array();
   $scope.submission.subtasks = new Array();
   $scope.showDetailsTests = false; // Used when there are no subtasks.
   $scope.hasLoadedAnim = false;
      
   ModelsManager.init(models);
   SyncQueue.init(ModelsManager);

   SyncQueue.params["idSubmission"] = $scope.curSubmission;
   
   SyncQueue.addSyncEndListeners("SubmissionCtrl.apply", function ()
   {
      if (!$scope.hasAskedSubmission)
      {
         return;
      }
      $scope.loading = true;
      $scope.idTestToLog = -1;
      $scope.submission = ModelsManager.getRecord('tm_submissions', $scope.curSubmission);
      
      
      
      if ($scope.submission != undefined) 
      {
         var idShown = $scope.initDetailsTests($scope.submission);
         if (idShown != -1)
         {
            $scope.idShown = idShown;
         }
         $scope.configureLogsError($scope.submission.tests);
                  
         if ($scope.submission.task_sScriptAnimation != '' && !$scope.hasLoadedAnimation)
         {
            $.getScript('animations/animation.js'); // TODO: load anyway?
            $scope.hasLoadedAnimation = true;
            addScript($scope.submission.task_sScriptAnimation); // TODO: use eval instead?
         }

      }
      
      console.log($scope.submission);
      
      $scope.loading = false;
      $scope.$apply();

      if ($scope.idShown != -1 && $scope.submission != undefined)
      {
         if ($scope.submission.task_sScriptAnimation != '')
         {
            $scope.$broadcast("clickOnTest", [$scope.idShown]);
         }
      }

   });
   SyncQueue.sync();
   setInterval(SyncQueue.planToSend, 5000);
   
   $scope.updateSubmission = function() { 
      $scope.hasLoadedAnimation = false;
      $scope.loading = true;    
      $scope.hasAskedSubmission = true;
      $scope.submission = undefined;// We remove all previous datas
      SyncQueue.params["idSubmission"] = $scope.curSubmission;
      SyncQueue.serverVersion = 0;
      SyncQueue.planToSend();
   }
   
   $scope.updateSubmission();

   $scope.aler = function(str)
   {
      alert(str);
   }
   
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
   }
   
   $scope.nl2br = function (str) {
      return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br>$2');
   }
   
   $scope.toTrust = function(str)
   {
      return $sce.trustAsHtml(str);
   }
   
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
   }
   
   $scope.initDetailsTests = function(submission)
   {
      var idApplied = -1;
      // If there are subtasks in this problem
      if (submission.submissionSubtasks.length > 0)
      {
         var subtasks = submission.submissionSubtasks;
         var hasFoundAnError = false;
         for (var curSubtask = 0; curSubtask < subtasks.length; curSubtask++)
         {
            var subtask = subtasks[curSubtask];
            
            if (subtask.cached == undefined) // If it is undefined, we set it.
            {
               subtask.cached = new Array();
               subtask.cached.showDetailsTests = false;
               
               for (var iTest = 0; iTest < subtask.submissionTests.length; iTest++) // Nevertheless, if we find a test that has an error, we automatically display it
               {
                  var curTest = subtask.submissionTests[iTest];
                  curTest.cached = new Array();
                  if (submissionManager.getStatusTest(curTest.iErrorCode) != 'ok' && !hasFoundAnError) // We'll automatically display both the subtask and the test
                  {
                     subtask.cached.showDetailsTests = true;
                     curTest.cached.isShown = true;
                     hasFoundAnError = true;
                     idApplied = curTest.id;
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
               idApplied = subtasks[0].submissionTests[0].id
            }
         }
      }
      // If there are no subtasks
      
      if ($scope.submission.submissionSubtasks.length == 0 && $scope.submission.tests.length > 0)
      {
         var hasFoundAnError = false;
         
         for (var iTest = 0; iTest < submission.tests.length; iTest++)
         {
            var curTest = submission.tests[iTest];
            if (curTest.cached == undefined) // We set it
            {
               curTest.cached = new Array();
               if (submissionManager.getStatusTest(curTest.iErrorCode) != 'ok' && !hasFoundAnError)
               {
                  curTest.cached.isShown = true;
                  hasFoundAnError = true;
                  idApplied = curTest.id;
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
            idApplied = submission.tests[0].id;
         }
      }
      
      return idApplied;
   }
   
   $scope.configureLogsError = function(tests)
   {
      for (var iTest = 0; iTest < tests.length; iTest++)
      {
         var dataITest = tests[iTest];
         if (submissionManager.getStatusTest(dataITest.iErrorCode) == 'error' || submissionManager.getStatusTest(dataITest.iErrorCode) == 'errorNoLog')
         {
            $scope.displayError(dataITest.ID);
         }
      }
   }
   
   $scope.round = function(val)
   {
      return Math.round(val);
   }
   
   $scope.floor = function(val)
   {
      return Math.floor(val);
   }
   
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
   }
   
   $scope.formatDate = function(date) // Not used
   {
      var months = new Array();
      months["Jan"] = "01";
      months["Feb"] = "02";
      months["Mar"] = "03";
      months["Apr"] = "04";
      months["May"] = "05";
      months["Jun"] = "06";
      months["Jul"] = "07";
      months["Aug"] = "08";
      months["Sep"] = "09";
      months["Oct"] = "10";
      months["Nov"] = "11";
      months["Dec"] = "12";
      
      date = date.toString();
      date = date.split(' ');
      
      var dayData = date[4].split(':');
      
      var str = date[2] + "/" + months[date[1]] + "/" + date[3] + " à " + dayData[0] + ':' + dayData[1];
      return str;
   }
   
   $scope.getImageAbsoluteUrl = function(idTask, md5, imageName)
   {
      return 'http://data.france-ioi.org/' + idTask + '/' + md5 + '/' + imageName;
   }
   
   $scope.toLog = function (str) // Debug function - to remove later
   {
      console.log(str);
   }
   
   $scope.clickTest = function(idTest)
   {
      var arg = [idTest];
      $scope.$broadcast("clickOnTest", arg);
   }
}]);
