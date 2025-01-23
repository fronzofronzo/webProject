<?php
    require_once '../bootstrap.php';
    $result['isUserLogged'] = false;
    if (isUserLoggedIn()) {
        $result['isUserLogged'] = true;
        $result['notifications'] = $dbh->getAllNotificationOfUser($_SESSION["username"]);
    }

    header("'Content-Type: application/json");
    echo json_encode($result);
?>