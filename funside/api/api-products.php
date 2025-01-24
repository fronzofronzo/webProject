<?php
require_once('../bootstrap.php');
$result = "";
if($_POST["action"] == 1) {
    $result = $dbh->getRandomProducts();
} else if($_POST["action"] == 2) {
    $result = $dbh->getBestSeller(6);
}

header('Content-Type: application/json');
echo json_encode($result);
?>