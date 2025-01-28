<?php
require_once '../bootstrap.php';
$result = [];

if (isset($_POST['action']) && $_POST['action'] == 'login' && isset($_POST['username']) && isset($_POST["password"])) {
    $login = $dbh->checkLogin($_POST["username"], $_POST["password"]);
    if (count($login) == 0) {
        $result['errorlogin'] = "Username e/o password non corretti";
    } else {
        registerLogin($login[0]);
        $result['loginresult'] = isUserLoggedIn();
    }
} else if (isset($_POST['action']) && $_POST['action'] == 'logout') {
    logout();
    $result['logoutresult'] = !isUserLoggedIn();
} else if (isset($_POST['action']) && $_POST['action'] == 'register') {
    if (isset($_POST['username']) && isset($_POST["password"]) && isset($_POST["name"]) && isset($_POST["surname"]) && !empty($_POST["username"]) && !empty($_POST["password"]) && !empty($_POST["name"]) && !empty($_POST["surname"])) {
        $registration = $dbh->registerUser($_POST["username"], $_POST["password"], $_POST["name"], $_POST["surname"], "client");
        if ($registration) {
            $result['registerresult'] = true;
            $result['registermsg'] = "Registrazione eseguita correttamente";
        } else {
            $result['registerresult'] = false;
            $result['registermsg'] = "Registrazione fallita";
        }
    } else {
        $result['registerresult'] = false;
        $result['registermsg'] = "Campi mancanti";
    }
}
header("Content-Type: application/json");
echo json_encode($result);
?>