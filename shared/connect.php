<?php

require_once 'LoggedPDO.php';

function getConfig() {
   $configContent = file_get_contents("../config.json");
   $config = json_decode($configContent);
   return $config;
}

function connect($config) {
   try {
      $pdo_options[PDO::ATTR_ERRMODE] = PDO::ERRMODE_EXCEPTION;
      $pdo_options[PDO::MYSQL_ATTR_INIT_COMMAND] = "SET NAMES utf8";
      $connexionString = "mysql:host=".$config->db->host.";dbname=".$config->db->database;
      if ($config->db->logged) {
         $db = new LoggedPDO($connexionString, $config->db->user, $config->db->password, $pdo_options);
      } else {
         $db = new PDO($connexionString, $config->db->user, $config->db->password, $pdo_options);
      }
   } catch (Exception $e) {
      die("Erreur : " . $e->getMessage());
   }
   return $db;
}

$config = getConfig();
$db = connect($config);

?>