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
                }
            }
            break;
        case 'stats':
            $result['stats'] = $dbh->getStatsOrders($_POST["anno"]);
            break;
        default:
            $result["error"] = "Azione non valida";
    }
}
header("Content-Type: application/json");
echo json_encode($result);
?>