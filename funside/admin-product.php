<?php
require_once 'bootstrap.php';

switch (isset($_GET["mod"])) {
    case 1:
        $templateParams["title"] = "FunSide - Inserisci nuovo prodotto";
        $templateParams["name"] = "template/new-product.php";
        $templateParams["js"] = array("js/new-product.js");
        break;
    case 2:
        $templateParams["title"] = "FunSide - Modifica prodotto";
        $templateParams["name"] = "template/mod-product.php";
        $templateParams["js"] = array("js/mod-product.js");
        break;
    default:
        break;
}

require 'template/base.php';
?>