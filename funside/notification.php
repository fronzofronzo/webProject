<?php
require_once 'bootstrap.php';

$templateParams["title"] = "FunSide - Notification center";

if (!isUserLoggedIn()) {
    header("Location: login.php");
}

$templateParams["js"] = array("js/notification.js");

require 'template/base.php';
?>