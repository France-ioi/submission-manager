var submissionManager = {
   errorCode: {},
	initConstants: function($scope)
   {
      // Returned by the evaluation servers
      this.errorCode.ERROR_NoError = 0;
      this.errorCode.ERROR_WrongAnswer = 1;
      this.errorCode.ERROR_AbortError = 6;
      this.errorCode.ERROR_BusError = 7;
      this.errorCode.ERROR_FloatingPointException = 8;
      this.errorCode.ERROR_SegFault = 11;
      this.errorCode.ERROR_TimeLimitExceeded = 137;

      // Use locally
      this.errorCode.ERROR_TimeLimitExceededBis = 9;
      this.errorCode.ERROR_WrongAnswerBis = 2;
      this.errorCode.ERROR_ExecutionError = 3;
      this.errorCode.ERROR_WrongAnswerCheck = 4;

      // Not used anymore
      this.errorCode.ERROR_StaticMemoryExceeded = 10;
      this.errorCode.ERROR_BusError35 = 35;
      this.errorCode.ERROR_SegFault139 = 139;
      
      // Not used in DB, only here
      this.errorCode.ERROR_RelativeScore = 150;
      
      // Returned by the evaluation servers
      $scope.ERROR_NoError = 0;
      $scope.ERROR_WrongAnswer = 1;
      $scope.ERROR_AbortError = 6;
      $scope.ERROR_BusError = 7;
      $scope.ERROR_FloatingPointException = 8;
      $scope.ERROR_SegFault = 11;
      $scope.ERROR_TimeLimitExceeded = 137;

      // Use locally
      $scope.ERROR_TimeLimitExceededBis = 9;
      $scope.ERROR_WrongAnswerBis = 2;
      $scope.ERROR_ExecutionError = 3;
      $scope.ERROR_WrongAnswerCheck = 4;

      // Not used anymore
      $scope.ERROR_StaticMemoryExceeded = 10;
      $scope.ERROR_BusError35 = 35;
      $scope.ERROR_SegFault139 = 139;
      
      // Not used in DB, only here
      $scope.ERROR_RelativeScore = 150;
   },
   
   countSubtasksSucceeded : function(submission)
   {
      var nbSubtasksSucceeded = 0;
      for (var curSubtask = 0; curSubtask < submission.submissionSubtasks.length; curSubtask++)
      {
         if (submission.submissionSubtasks[curSubtask].iSuccess == 1)
         {
            nbSubtasksSucceeded++;
         }
      }
      
      return nbSubtasksSucceeded;
   },
   
   getDataTest : function(iErrorCode)
   {
      switch (iErrorCode)
      {
         case this.errorCode.ERROR_NoError:
            return {
               status: 'ok',
               classToApply: 'succeed_test',
               classImage: 'glyphicon glyphicon-ok image_succeed_test',
            };
            break;
         case this.errorCode.ERROR_WrongAnswer:
         case this.errorCode.ERROR_WrongAnswerBis:
            return {
               status: 'error',
               classToApply: 'error_test',
               classImage: 'glyphicon glyphicon-remove image_error_test',
            };
            break;
         case this.errorCode.ERROR_WrongAnswerCheck:
            return {
               status: 'errorNoLog',
               classToApply: 'error_test',
               classImage: 'glyphicon glyphicon-remove image_error_test',
            };
            break;
         case this.errorCode.ERROR_AbortError:
            return {
               status: 'abort',
               classToApply: 'crash_test',
               classImage: 'glyphicon glyphicon-fire image_crash_test',
               };
            break;
         case this.errorCode.ERROR_BusError:
         case this.errorCode.ERROR_BusError35:
            return {
               status: 'busError',
               classToApply: 'crash_test',
               classImage: 'glyphicon glyphicon-fire image_crash_test',
               };
            break;
         case this.errorCode.ERROR_FloatingPointException:
            return {
               status: 'floatingPointException',
               classToApply: 'crash_test',
               classImage: 'glyphicon glyphicon-fire image_crash_test',
               };
            break;
         /* Seg fault <=> memory problem */
         case this.errorCode.ERROR_SegFault: 
         case this.errorCode.ERROR_StaticMemoryExceeded:
         case this.errorCode.ERROR_SegFault139:
            return {
               status: 'memory',
               classToApply: 'crash_test',
               classImage: 'glyphicon glyphicon-fire image_crash_test',
               };
            break;
         case this.errorCode.ERROR_TimeLimitExceeded:
         case this.errorCode.ERROR_TimeLimitExceededBis:
            return {
               status: 'timeout',
               classToApply: 'timeout_test',
               classImage: 'glyphicon glyphicon-time image_timeout_test',
            };
            break;
         case this.errorCode.ERROR_RelativeScore:
            return {
               status: 'relative',
               classToApply: 'relative_test',
               classImage: 'glyphicon glyphicon-ok image_relative_test',
            };
            break;
      }
   },
   
   getStatusTest: function(iErrorCode)
   {
      return submissionManager.getDataTest(iErrorCode).status;
   },
   
   getClassTest: function(iErrorCode)
   {
      return submissionManager.getDataTest(iErrorCode).classToApply;
   },
   
   getClassImageTest: function(iErrorCode)
   {
      //alert(submissionManager.getDataTest(iErrorCode).classImage);
      return submissionManager.getDataTest(iErrorCode).classImage;
   }



};
