<?php
require_once 'bootstrap.php';

if (isUserLoggedIn()) {
    if (isUserClient()) {
        $templateParams["name"] = "template/cart-view.php";
        $templateParams["js"] = array("js/cart.js");
    }
    $templateParams["title"] = "FunSide - Carrello di " . $_SESSION["username"];
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