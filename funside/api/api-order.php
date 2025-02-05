<?php
require_once '../bootstrap.php';

$result = [];

if (isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'getorderbyuser':
            $result['orders'] = $dbh->getOrdersByUser($_SESSION['username']);
            if (count($result['orders']) > 0) {
                for ($i = 0; $i < count($result['orders']); $i++) {
                    $orderId = $result['orders'][$i]["idorder"];
                    $result['order_details'][$orderId] = $dbh->getOrdersDetailsByOrderId($orderId);
                    for ($j = 0; $j < count($result['order_details'][$orderId]); $j++) {
                        $result['order_details'][$orderId][$j]["image"] = UPLOAD_DIR . $result['order_details'][$orderId][$j]["image"];
                    }
                }
            }
            
            break;
        case 'stats':
            $result['stats'] = $dbh->getStatsOrders($_POST["anno"]);
            break;
        case 'registerOrder':
            $products = json_decode($_POST["products"], true);
            $totalPrice = 0.0;
            for($i=0; $i<count($products); $i++) {
                $totalPrice += $products[$i]["price"]*$products[$i]["quantity"];
            }
            $orderId = $dbh->registerOrder($totalPrice, $_SESSION["username"]);
            $notificationTitle = generateNotificationTitle("ordinato", $orderId);
            $notificationText = generateNotificationText("ordinato", $orderId);
            $dbh->addNotificationAboutAnOrder($notificationText,$_SESSION["username"], $orderId, $notificationTitle);
            for($i=0; $i<count($products); $i++) {
                $dbh->registerOrderDetail($products[$i]["idproduct"], $orderId, $products[$i]["quantity"]);
                $quantity = $dbh->getProductAvailability($products[$i]["idproduct"]);
                if($quantity["availability"] == 0) {
                    
                }
            }
            $dbh->emptyCart($_SESSION["username"]);
            break;
        case 'getPendingOrders':
            $result = $dbh->getPendingOrders();
            break; 
        case 'change-status':
            $result = $dbh->modifyStatus($_POST["order"], $_POST["status"]);
            if($result["result"]) {
                $title = generateNotificationTitle($_POST["status"], $_POST["order"]);
                $text = generateNotificationText($_POST["status"], $_POST["order"]);
                $dbh->addNotificationAboutAnOrder($text, $_POST["user"], $_POST["order"], $title);
            }
            break;
        case 'toggle-suspension':
            $result = $dbh->toggleSuspension($_POST["order"]);
            if($result["result"]) {
                if($_POST["suspended"] == 'false') {
                    $title = generateNotificationTitle('sospeso', $_POST["order"]);
                    $text = generateNotificationText('sospeso', $_POST["order"]);
                    $dbh->addNotificationAboutAnOrder($text, $_POST["user"], $_POST["order"], $title);
                } else {
                    $title = generateNotificationTitle('attivato', $_POST["order"]);
                    $text = generateNotificationText('attivato', $_POST["order"]);
                    $dbh->addNotificationAboutAnOrder($text, $_POST["user"], $_POST["order"], $title);
                }
            }
            break;
        case 'get-delivered-orders':
            $result = $dbh->getDeliveredOrders();
            break;
        default:
            $result["error"] = "Azione non valida";
    }
}
header("Content-Type: application/json");
echo json_encode($result);
?>