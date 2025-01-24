<?php
require_once('../bootstrap.php');
$result = "";
if($_POST["action"] == 1) {
    $result = $dbh->getRandomProducts();
} else if($_POST["action"] == 2) {
    $result = $dbh->getBestSellers($_POST["n"]);
} else if($_POST["action"] == 3) {
    $result = $dbh->getBestRatings($_POST["n"]);
}

header('Content-Type: application/json');
echo json_encode($result);
?>