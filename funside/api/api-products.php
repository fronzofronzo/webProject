<?php
require_once('../bootstrap.php');
$result = "";
if($_POST["action"] == 1) {
    $result = $dbh->getRandomProducts();
    for ($i = 0; $i < count($result); $i++) {
        $result[$i]["image"] = UPLOAD_DIR.$result[$i]["image"];
    }
} else if($_POST["action"] == 2) {
    $result = $dbh->getBestSellers($_POST["n"]);
    for ($i = 0; $i < count($result); $i++) {
        $result[$i]["image"] = UPLOAD_DIR.$result[$i]["image"];
    }
} else if($_POST["action"] == 3) {
    $result = $dbh->getBestRatings($_POST["n"]);
    for ($i = 0; $i < count($result); $i++) {
        $result[$i]["image"] = UPLOAD_DIR.$result[$i]["image"];
    }
} else if($_POST["action"] == "reviews") {
    $result = $dbh->getReviewsByID($_POST["id"]);
} else if($_POST["action"] == "add-review") {
    if(!isUserLoggedIn()) {
        $result = ["result" => false];
    } else {
        $result = $dbh->addReview($_SESSION["username"], $_POST["id"], $_POST["text"],$_POST["value"]);
    }
} else if ($_POST["action"] == "getall"){
    $result = $dbh->getAllProducts();
} else if ($_POST["action"] == "isValidId"){
    $result = $dbh->getProductByID($_POST["idproduct"]);
} 


header('Content-Type: application/json');
echo json_encode($result);
?>