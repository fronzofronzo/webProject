<?php
	require_once("../bootstrap.php");
	$result="";
	if($_POST["action"]==1) {
		$categories = $dbh->getRandomProductTypes(6);

		for($i=0; $i<count($categories); $i++) {
			$categories[$i]["image"] = UPLOAD_DIR.$categories[$i]["image"];
		}
		$result = $categories;
	}

	
	header("Content-type: application/json");
	echo json_encode($result);
?>