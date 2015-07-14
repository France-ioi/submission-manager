<html lang="fr">
   <head>
      <title>Vue des résultats d'une soumission</title>
      <meta http-equiv="content-type" content="text/html;charset=utf-8" />
      <!--<meta http-equiv="pragma" content="no-cache" />
      <meta http-equiv="cache-control" content="no-cache">
      <meta http-equiv="Expires" content="-1">
      <script src="ext/angularjs/angular.min.js"></script>
      <script src="ext/angularjs/angular-route.min.js"></script>
      <script src="ext/jquery/jquery.min.js"></script>
      <script src="ext/bootstrap/ui-bootstrap_modified.js"></script> <!-- boostrap ui in angular -->
      <!--<script src="modelsManager/modelsManager.js"></script>
      <script src="shared/models.js"></script>
      <script src="shared/utils.js"></script>
      <script src="submissionCtrl.js"></script>
      <script src="sync/syncQueue.js"></script>-->
      <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
      <script type="text/javascript">window.jQuery || document.write('<script src="ext/jquery.min.js">\x3C/script>')</script>
      <script src="ext/jquery/jquery.ba-postmessage.min.js"></script>
      <link href="style.css" type="text/css" rel="stylesheet">
      <link href="ext/bootstrap/css/bootstrap.min.css" type="text/css" rel="stylesheet">
      <!--<link href="//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet"/>   -->
      <script src="js/get_height_submission.js"></script>
      <script src="config.js"></script>
      <script>
         var textStatus = "";
      </script>
   </head>
   
   <body>
   <div>
      <?php

	 echo '
	 <form method="get" action="">
		<label>Entrez l\'id de la soumission : </label> <input type="text" value="' . ((isset($_GET['idSubmission'])) ? intval($_GET['idSubmission']) : 0) . '" name="idSubmission" /> <input type="submit" value="Charger" />
	 </form>';

      if (isset($_GET['idSubmission']))
      {
         echo '
         <iframe id="submission' . intval($_GET['idSubmission']) . '" class="submission_iframe" scrolling="no" src="submission_template.html?curSubmission=' . intval($_GET['idSubmission']) . '&amp;showSubmission=false">
         </iframe>';
      }
      ?>

   </div>
   
   </body>
</html>
