<?php 
require_once '../bootstrap.php';

$result['loginresult'] = false;

if (isset($_POST['username']) && isset($_POST["password"])) {
    $login = $dbh->checkLogin($_POST["username"], $_POST["password"]);
    if (count($login) == 0) {
        //Login failed
        $result["errorLogin"] = "Username e/o password non corretti";
    } else {
        registerLogin($login[0]);
    }
}

if (isUserLoggedIn()) {
    $result["loginresult"] = true;;
}

header("'Content-Type: application/json");
echo json_encode($result);

?>