<?php
require_once 'bootstrap.php';

if (isUserLoggedIn()) {
    if (isUserClient()) {
        $templateParams["name"] = "template/client.php";
    } else {
        
        $templateParams["name"] = "template/admin.php";
    }
    $templateParams["title"] = "FunSide - " . $_SESSION["username"];
    $templateParams["js"] = array("js/client.js");
} else {
    $templateParams["name"] = "template/login-form.php";
    $templateParams["js"] = array("js/login-form.js");
    $templateParams["title"] = "FunSide - Login";
    if (isset($_SESSION["message"])) {
        $templateParams["message"] = $_SESSION["message"];
        readMessage();
    }
}
require 'template/base.php';
?>