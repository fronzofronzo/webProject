<?php 

function registerLogin($user){
    $_SESSION["username"] = $user["username"];
    $_SESSION["type"] = $user["type"];
    $_SESSION["name"] = $user["name"];
    $_SESSION["surname"] = $user["surname"];
}

function setMessage($message){
    $_SESSION["message"] = $message;
}

function readMessage(){
    unset($_SESSION["message"]);
}

function logout(){
    unset($_SESSION["username"]);
}

function isUserLoggedIn(){
    return !empty($_SESSION['username']);
}

function isUserClient() {
    return $_SESSION["type"] == "client";
}

function uploadImage($path, $image){
    $imageName = basename($image["name"]);
    $fullPath = $path.$imageName;
    
    $maxKB = 500;
    $acceptedExtensions = array("jpg", "jpeg", "png", "gif");
    $result = 0;
    $msg = "";
    //Controllo se immagine è veramente un'immagine
    $imageSize = getimagesize($image["tmp_name"]);
    if($imageSize === false) {
        $msg .= "File caricato non è un'immagine! ";
    }
    //Controllo dimensione dell'immagine < 500KB
    if ($image["size"] > $maxKB * 1024) {
        $msg .= "File caricato pesa troppo! Dimensione massima è $maxKB KB. ";
    }

    //Controllo estensione del file
    $imageFileType = strtolower(pathinfo($fullPath,PATHINFO_EXTENSION));
    if(!in_array($imageFileType, $acceptedExtensions)){
        $msg .= "Accettate solo le seguenti estensioni: ".implode(",", $acceptedExtensions);
    }

    //Controllo se esiste file con stesso nome ed eventualmente lo rinomino
    if (file_exists($fullPath)) {
        $i = 1;
        do{
            $i++;
            $imageName = pathinfo(basename($image["name"]), PATHINFO_FILENAME)."_$i.".$imageFileType;
        }
        while(file_exists($path.$imageName));
        $fullPath = $path.$imageName;
    }

    //Se non ci sono errori, sposto il file dalla posizione temporanea alla cartella di destinazione
    if(strlen($msg)==0){
        if(!move_uploaded_file($image["tmp_name"], $fullPath)){
            $msg.= "Errore nel caricamento dell'immagine.";
        }
        else{
            $result = 1;
            $msg = $imageName;
        }
    }
    return array($result, $msg);
}

function generateNotificationTitle($status, $order) {
    return "Order #".$order." ".$status;
}

function generateNotificationText($status, $order) {
    switch($status) {
        case "ordinato":
            return "Confermiamo il tuo ordine #".$order.".";
        case "spedito":
            return "Il tuo ordine #".$order." è stato spedito.";
        case "in consegna":
                return "Il tuo ordine #".$order." è in consegna.";
        case "consegnato":
            return "Il tuo ordine #".$order." è stato consegnato.";
        case "sospeso":
            return "Il tuo ordine #".$order." è stato sospeso.";
        case "attivato":
            return "Il tuo ordine #".$order." è nuovamente in viaggio verso di te.";
        default:
            return "null";
    }
}
?>