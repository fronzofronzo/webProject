<?php
require_once '../bootstrap.php';

$result = [];

if (isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'getaddress': 
            $result["address"] = $dbh->getAddressesFromUser($_SESSION["username"]);
            break;
        default: $result["error"];
    }
}

$result["address"] = $dbh->getAddressesFromUser($_SESSION["username"]);

header("Content-Type: application/json");
echo json_encode($result);
?>