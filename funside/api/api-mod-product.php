<?php
require_once('../bootstrap.php');

header('Content-Type: application/json');

// Controllo se i parametri sono settati
if (!isset($_SESSION["idproduct"], $_POST["field"], $_POST["val"])) {
    echo json_encode(["error" => "Dati mancanti"]);
    exit;
}

// Controllo se i parametri sono vuoti
if (empty($_SESSION["idproduct"]) || empty($_POST["field"]) || empty($_POST["val"])) {
    echo json_encode(["error" => "Dati vuoti non ammessi"]);
    exit;
}

$idproduct = trim($_SESSION["idproduct"]);
$field = trim($_POST["field"]);
$val = trim($_POST["val"]);

// Eseguo l'aggiornamento
$result["modified"] = $dbh->updateProductById($idproduct, $field, $val);

echo json_encode($result);
?>
