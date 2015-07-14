var recentSubmissions = angular.module('recentSubmissions', ['ui.bootstrap']);
 
recentSubmissions.controller('recentSubmissionsCtrl', ['$scope', '$sce', function($scope, $sce) 
{
   $scope.hasAskedSubmission = true;
   $scope.loading = true;
   $scope.submissions = undefined;
   $scope.submissionManager = submissionManager;
   $scope.submissionManager.initConstants($scope);

   ModelsManager.init(models);
   SyncQueue.init(ModelsManager);

   //SyncQueue.params["idSubmission"] = 812507;
   SyncQueue.params["timeRecentSubmissions"] = true;
   SyncQueue.serverVersion = 0;
  
   SyncQueue.addSyncEndListeners("SubmissionCtrl.apply", function ()
   {
      $scope.loading = false;
      $scope.submissions = ModelsManager.getRecords("tm_submissions");
      console.log($scope.submissions);
      
      if ($scope.displayDetails == undefined)
      {
         $scope.displayDetails = new Array();
         for (idSubmission in $scope.submissions)
         {
            $scope.displayDetails[idSubmission] = false;
         }
      }
      
      $scope.$apply();
   });
   SyncQueue.sync();
   setInterval(SyncQueue.planToSend, 5000);	
   
   SyncQueue.planToSend();
   
   $scope.getUrl = function (idSubmission)
   {
      var url = 'submission_template.html?curSubmission=' + idSubmission + '&amp;showSubmission=true&amp;urlfrom=recent_submission.html';
      return $sce.trustAsResourceUrl(url);      
   }
	
}]);
