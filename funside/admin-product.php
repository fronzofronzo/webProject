<?php
require_once 'bootstrap.php';

switch (isset($_GET["mod"])) {
    case 1:
        $templateParams["title"] = "FunSide - Inserisci nuovo prodotto";   
        $templateParams["name"] = "template/new-product.php";
        $templateParams["js"] = array("js/new-product.js");
        break;
    default:
        break;
}

require 'template/base.php';
?>