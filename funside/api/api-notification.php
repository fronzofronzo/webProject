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
} else if (isset($_POST['action']) && $_POST['action'] === "delete") {
    if (isset($_POST["id"]) && !empty($_POST["id"])) {
        $result["isDeleted"] = $dbh->deleteNotification($_POST["id"]);
        //$result["count"] = $dbh->getUnreadNotificationsCount($_SESSION["username"])[0];
    } else {
        $result["error"] = "Missing or invalid ID";
    } 
} else if (isset($_POST['action']) && $_POST['action'] === "unreadNotificationsCount") {
    $result["countUnread"] = count($dbh->getAllNotificationOfUserNotRead($_SESSION["username"]));
    $result["count"] = count($dbh->getAllNotificationOfUser($_SESSION["username"]));
}

header("Content-Type: application/json");
echo json_encode($result);
?>