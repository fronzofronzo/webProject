<?php
require_once '../bootstrap.php';

$result = [];

if (isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'getaddress':
            $result["address"] = $dbh->getAddressesFromUser($_SESSION["username"]);
            break;
        case "modifypassword":
            if (isset($_POST["oldpassword"]) && isset($_POST["newpassword"]) && !empty($_POST["oldpassword"]) && !empty($_POST["newpassword"])) {
                if ($dbh->checkLogin($_SESSION["username"], $_POST["oldpassword"])) {
                    if ($_POST["oldpassword"] == $_POST["newpassword"]) {
                        $result["isPasswordModified"] = false;
                        $result["message"] = "La nuova password non può essere uguale alla precedente";
                    } else {
                        $result["isPasswordModified"] = $dbh->updatePasswordByUser($_SESSION["username"], $_POST["newpassword"]);
                        if ($result["isPasswordModified"]) {
                            setMessage("Password modificata correttamente");
                        } else {
                            $result["message"] = "Errore durante la modifica";
                        }
                    }
                } else {
                    $result["isPasswordModified"] = false;
                    $result["message"] = "Password non corretta";
                }
            } else {
                $result["isPasswordModified"] = false;
                $result["message"] = "Campi mancanti";
            }
            break;
        default:
            $result["error"];
    }
}

header("Content-Type: application/json");
echo json_encode($result);
?>