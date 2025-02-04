<?php
require_once 'bootstrap.php';

$templateParams["name"] = "template/form-mod-product.php";
$templateParams["js"] = array("js/form-mod-product.js");
$templateParams["title"] = "Funside - Modifica prodotto";

if (isset($_GET["idproduct"])) {
    $_SESSION["idproduct"] = $_GET["idproduct"];
}

require 'template/base.php';
?>