<?php
require_once 'bootstrap.php';

if (isUserLoggedIn()) {
    if (isUserClient()) {
        $templateParams["name"] = "template/client.php";
    } else {
        
        $templateParams["name"] = "template/admin.php";
    }
} else {
    $templateParams["name"] = "template/login-form.php";
    $templateParams["js"] = array("js/login-form.js");
    $templateParams["title"] = "FunSide - Login";
    if(isset($_GET["formmsg"])){
        $templateParams["formmsg"] = $_GET["formmsg"];
    }
}
require 'template/base.php';
?>