<?php
require_once('../bootstrap.php');

$result["modified"] = true;

$required_fields = ["nameproduct", "priceproduct", "descriptionproduct", "brandproduct", "typeproduct"];

foreach ($required_fields as $field) {
    if (isset($_POST[$field]) && !empty(($_POST[$field]))) {
        $result["modified"] = $dbh->updateProductById($_SESSION["idproduct"], $field, $_POST[$field]);
    }
}

echo json_encode($result);
exit;




/*


$name = trim($_POST["nameproduct"]);
$price = filter_var($_POST["priceproduct"], FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
$description = trim($_POST["descriptionproduct"]);
$brand = trim($_POST["brandproduct"]);
$type = trim($_POST["typeproduct"]);

if (!is_numeric($price) || $price <= 0) {
    $result["message"] = "Prezzo non valido";
    echo json_encode($result);
    exit;
}

// Handle the image upload


// The name of the uploaded file

// Insert the product into the database
$modificationSuccess = $dbh->updateProductById($_GET["idproduct"], $name, $price, $description, $type, $brand);

if ($modificationSuccess) {
    $result["modified"] = true;
    $result["message"] = "Prodotto inserito con successo";
} else {
    $result["message"] = "Errore durante l'inserimento del prodotto";
}

// Return the response in JSON format
header('Content-Type: application/json');
echo json_encode($result);
?>

*/