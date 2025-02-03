<?php
require_once('../bootstrap.php');
$result = "";
if($_POST["action"] == 1) {
    $result = $dbh->getRandomProducts();
} else if($_POST["action"] == 2) {
    $result = $dbh->getBestSellers($_POST["n"]);
} else if($_POST["action"] == 3) {
    $result = $dbh->getBestRatings($_POST["n"]);
} else if($_POST["action"] == "reviews") {
    $result = $dbh->getReviewsByID($_POST["id"]);
}

for ($i = 0; $i < count($result); $i++) {
    $result[$i]["image"] = UPLOAD_DIR.$result[$i]["image"];
}

header('Content-Type: application/json');
echo json_encode($result);
?>