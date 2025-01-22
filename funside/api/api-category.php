<?php
	require_once("../bootstrap.php");
	$categories = $dbh->getRandomProductTypes(6);

	for($i=0; $i<count($categories); $i++) {
		$categories[$i]["image"] = UPLOAD_DIR.$categories[$i]["image"];
	}

	header("Content-type: application/json");
	echo json_encode($categories);
?>