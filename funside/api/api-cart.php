<?php
	require_once("../bootstrap.php");
	$result=[];
	if($_POST["action"]=="getProducts") {
		$result = $dbh->getProductsInCart($_SESSION["username"]);
	} else if ($_POST["action"] == "addProducts") {
		if(!isUserLoggedIn()) {
			$result["title"] = "ERRORE: utente non loggato";
			$result["message"] = "Occorre eseguire il login per aggiungere prodotti al carrello";
		} else if (!isUserClient()) {
			$result["title"] = "ERRORE: utente loggato come admin";
			$result["message"] = "Occorre eseguire il login come cliente per aggiungere prodotti al carrello";
		} else {
			$result = $dbh->addProductToCart($_POST["id"], $_SESSION["username"], $_POST["quantity"] );
			if($result["success"] == true) {
				$result["title"] = "Successo!";
				$result["message"] = "Prodotto aggiunto correttamente al carrello";
			} else {
				$result["title"] = "Errore!";
				$result["message"] = "Prodotto gia presente carrello o non disponibile in ". $_POST["quantity"]. " pezzi.";
			}
		}
	} else if($_POST["action"] == "removeProd") {
		$dbh->removeProductFromCart($_POST["id"], $_SESSION["username"]);
	}
	header("Content-type: application/json");
	echo json_encode($result);
?>