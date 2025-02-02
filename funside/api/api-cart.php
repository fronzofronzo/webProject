<?php
	require_once("../bootstrap.php");
	$result=[];
	if($_POST["action"]=="getProducts") {
		$result = $dbh->getProductsInCart($_SESSION["username"]);
	} else if ($_POST["action"] == "addProducts") {
		if(!isUserLoggedIn()) {
			$result["title"] = "ERRORE: utente non loggato";
			$result["message"] = "Occorre eseguire il login per aggiungere prodotti al carrello";
		} else {
			$result = $dbh->addProductToCart($_POST["id"], $_SESSION["username"], $_POST["quantity"] );
			if($result["success"]) {
				$result["title"] = "Successo!";
				$result["message"] = "Prodotto aggiunto correttamente al carrello";
			} else {
				$result["title"] = "Errore!";
				$result["message"] = "Prodotto gia presente carrello";
			}
			
		}
	}
	header("Content-type: application/json");
	echo json_encode($result);
?>