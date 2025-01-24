<?php
    require_once '../bootstrap.php';
    $result['notifications'] = $dbh->getAllNotificationOfUser($_SESSION["username"]);
    $result["username"] = $_SESSION["username"];

    header("'Content-Type: application/json");
    echo json_encode($result);
?>