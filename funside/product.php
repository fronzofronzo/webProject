<?php
require_once 'bootstrap.php';

//$templateParams["title"] = "Funside - Prodotti";
$templateParams["name"] = "template/product-view.php";
$templateParams["js"] = array("js/product.js");

if(isset($_GET["id"])) {
	$product = $dbh->getProductByID($_GET["id"]);
}

require 'template/base.php';
?>