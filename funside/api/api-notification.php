<?php
require_once '../bootstrap.php';

$result = [];

if (isset($_POST['action']) && $_POST['action'] === "getall") {
    $result['notifications'] = $dbh->getAllNotificationOfUser($_SESSION["username"]);
    $result["username"] = $_SESSION["username"];
} else if (isset($_POST['action']) && $_POST['action'] === "read") {
    if (isset($_POST["id"]) && !empty($_POST["id"])) {
        $result["isRead"] = $dbh->readNotification($_POST["id"]);
    } else {
        $result["error"] = "Missing or invalid ID";
    }
}

header("Content-Type: application/json");
echo json_encode($result);
?>
