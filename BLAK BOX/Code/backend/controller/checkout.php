<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once '../models/OrderTable.php';
require_once '../models/OrderProduct.php';
require_once '../models/Payment.php';

if (!isset($_SESSION['userId']) || empty($_SESSION['cart']) || empty($_POST['paymentMethod'])) {
    header("Location: ../../src/pages/cartUser.php");
    exit();
}

$userId = $_SESSION['userId'];
$cart = $_SESSION['cart'];
$paymentMethod = $_POST['paymentMethod'];
$total = 0;

foreach ($cart as $item) {
    $total += $item['price'] * $item['quantity'];
}

try {
    $orderId = OrderTable::createOrder($userId, $total);

    foreach ($cart as $item) {
        OrderProduct::addProductToOrder($orderId, $item['productId'], $item['quantity']);
    }

    Payment::createPayment($userId, $orderId, $total, $paymentMethod);

    $_SESSION['cart'] = [];
    $_SESSION['orderMsg'] = "Thank you! Your order has been placed.";

} catch (Exception $e) {
    echo "<h2>Error placing order: " . htmlspecialchars($e->getMessage()) . "</h2>";
    exit();
}

header("Location: ../../src/pages/cartUser.php");
exit();
?>
