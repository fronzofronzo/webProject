<?php
require_once('../bootstrap.php');

$result["insert"] = false;

$required_fields = ["name", "price", "desc", "brand", "type"];

foreach ($required_fields as $field) {
    if (!isset($_POST[$field]) || empty(($_POST[$field]))) {
        $result["message"] = "Campo '$field' mancante o vuoto";
        echo json_encode($result);
        exit;
    }
}

$name = trim($_POST["name"]);
$price = filter_var($_POST["price"], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
$description = trim($_POST["desc"]);
$brand = trim($_POST["brand"]);
$type = trim($_POST["type"]);

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

// Puoi continuare a gestire l'upload dell'immagine come fai normalmente


$image = $_FILES["image"]; // Correctly get the uploaded image file

if (!is_numeric($price) || $price <= 0) {
    $result["message"] = "Prezzo non valido";
    echo json_encode($result);
    exit;
}

// Handle the image upload
list($uploadSuccess, $uploadMessage) = uploadImage("." . UPLOAD_DIR, $image);

if (!$uploadSuccess) {
    $result["message"] = $uploadMessage;
    echo json_encode($result);
    exit;
}

$imageName = $uploadMessage; // The name of the uploaded file

// Insert the product into the database
$insertSuccess = $dbh->insertProduct($name, $price, $description, $type, $brand, $imageName);

if ($insertSuccess) {
    $result["insert"] = true;
    $result["message"] = "Prodotto inserito con successo";
} else {
    $result["message"] = "Errore durante l'inserimento del prodotto";
}

// Return the response in JSON format
header('Content-Type: application/json');
echo json_encode($result);
?>
