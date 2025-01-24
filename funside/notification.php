<?php
require_once 'bootstrap.php';
if (!isUserLoggedIn()) {
    setMessage("Esegui il login per visualizzare le tue notifiche");
    header("Location: login.php");
}
$templateParams["title"] = "FunSide - Notification center";
$templateParams["name"] = "template/notification.php";
$templateParams["js"] = array("js/notification.js");
require 'template/base.php';
?>