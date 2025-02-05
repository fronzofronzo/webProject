<?php
require_once('../bootstrap.php');

header('Content-Type: application/json');

if (isset($_POST["field"]) && $_POST["field"] == "imageproduct") {

    if (!isset($_FILES["image"])) {
        $result["message"] = "Nessun file immagine caricato.";
        echo json_encode($result);
        exit;
    }
    $image = $_FILES["image"];
    if ($image["error"] !== UPLOAD_ERR_OK) {
        $result["message"] = "Errore nell'upload dell'immagine. Codice errore: " . $image["error"];
        echo json_encode($result);
        exit;
    }
    list($uploadSuccess, $uploadMessage) = uploadImage("." . UPLOAD_DIR, $image);

    if (!$uploadSuccess) {
        $result["message"] = $uploadMessage;
        echo json_encode($result);
        exit;
    }
    $imageName = $uploadMessage;
    
$idproduct = trim($_SESSION["idproduct"]);
$field = trim($_POST["field"]);
    $result["modified"] = $dbh->updateProductById($idproduct, $field, $imageName);

    echo json_encode($result);
    exit;
}

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