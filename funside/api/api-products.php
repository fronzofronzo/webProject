<?php
require_once('../bootstrap.php');
$products = $dbh->getRandomProducts();

header('Content-Type: application/json');
echo json_encode($products);
?>