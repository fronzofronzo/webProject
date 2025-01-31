<?php
require_once 'bootstrap.php';

$templateParams["name"] = "template/product-view.php";
$templateParams["js"] = array("js/product.js");

if(isset($_GET["id"])) {
	$product = $dbh->getProductByID($_GET["id"]);
	$templateParams["title"] = "Funside - ".$product["name"];
}

require 'template/base.php';
?>