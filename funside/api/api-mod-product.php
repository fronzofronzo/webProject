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

if ($_POST["field"] == "priceproduct") {
    if (!is_numeric($_POST["val"])) {
        echo json_encode(["error" => "Dati vuoti non ammessi"]);
        exit;
    }
    $val = filter_var($_POST["val"], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
} else {
    $val = trim($_POST["val"]);
}

$idproduct = trim($_SESSION["idproduct"]);
$field = trim($_POST["field"]);

// Eseguo l'aggiornamento
$result["modified"] = $dbh->updateProductById($idproduct, $field, $val);

echo json_encode($result);
?>