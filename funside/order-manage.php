<?php
require_once 'bootstrap.php';

$templateParams["title"] = "Funside - Gestione ordini";
$templateParams["name"] = "template/order-manage-view.php";
$templateParams["js"] = array("js/order-manage.js");

require 'template/base.php';
?>