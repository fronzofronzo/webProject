<?php 
require_once '../bootstrap.php';

$result['loginresult'] = false;

if (isset($_POST['action']) && $_POST['action'] == 'login' && isset($_POST['username']) && isset($_POST["password"])) {
    $login = $dbh->checkLogin($_POST["username"], $_POST["password"]);
    if (count($login) == 0) {
        //Login failed
        $result['errorlogin'] = "Username e/o password non corretti";
    } else {
        registerLogin($login[0]);
        $result['loginresult'] = isUserLoggedIn();
        //header("Location: ../index.php");
    }
}

if (isset($_POST['action']) && $_POST['action'] == 'logout') {
    logout();
    $result['logoutresult'] = !isUserLoggedIn();
}
header("'Content-Type: application/json");
echo json_encode($result);
?>