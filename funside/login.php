<?php
require_once 'bootstrap.php';

if (isUserLoggedIn()) {
    if (isUserClient()) {
        $templateParams["name"] = "template/client.php";
        $templateParams["js"] = array("js/client.js");
    } else {
        
        $templateParams["name"] = "template/admin.php";
        $templateParams["js"] = array("js/admin.js");
        $templateParams["annocorrente"] = date("Y");
    }
    $templateParams["title"] = "FunSide - " . $_SESSION["username"];
} else {
    $templateParams["name"] = "template/login-form.php";
    $templateParams["js"] = array("js/login-form.js");
    $templateParams["title"] = "FunSide - Login";   
}
if (isset($_SESSION["message"])) {
    $templateParams["message"] = $_SESSION["message"];
    readMessage();
}
require 'template/base.php';
?>