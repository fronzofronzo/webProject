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
                $dbh->registerOrder($totalPrice, $_SESSION["username"]);
            }
            break;
        default:
            $result["error"] = "Azione non valida";
    }
}
header("Content-Type: application/json");
echo json_encode($result);
?>