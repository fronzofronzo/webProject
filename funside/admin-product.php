<?php
require_once 'bootstrap.php';

$mod = isset($_GET["mod"]) ? intval($_GET["mod"]) : 0;

switch ($mod) {
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
    case 3:
        $templateParams["title"] = "FunSide - Cancella prodotto";
    $templateParams["name"] = "template/delete-product.php";
    $templateParams["js"] = array("js/delete-product.js");
        break;
    case 4:
        $templateParams["title"] = "FunSide - Visualizza prodotti";
        $templateParams["name"] = "template/view-product.php";
        $templateParams["js"] = array("js/view-product.js");
        break;
    default:
        break;
}
require 'template/base.php';
?>
