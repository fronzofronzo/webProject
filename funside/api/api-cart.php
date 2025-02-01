<?php
	require_once("../bootstrap.php");
	$result="";
	if($_POST["action"]=="getProducts") {
		$result = $dbh->getProductsInCart($_SESSION["username"]);
	}
	header("Content-type: application/json");
	echo json_encode($result);
?>