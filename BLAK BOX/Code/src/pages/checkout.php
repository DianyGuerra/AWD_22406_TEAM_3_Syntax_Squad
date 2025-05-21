<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once '../../backend/models/auth.php';
requireLogin();
checkUserType('user');


require_once '../../backend/models/ConnectionDB.php';

if (!isset($_SESSION['user_id']) || empty($_SESSION['cart']) || empty($_POST['paymentMethod'])) {
    header("Location: cartUser.php");
    exit();
}

$userId = $_SESSION['user_id'];
$cart = $_SESSION['cart'];
$paymentMethod = $_POST['paymentMethod'];
$total = 0;

foreach ($cart as $item) {
    $total += $item['price'] * $item['quantity'];
}

$conn = connectionDB();
$conn->begin_transaction();

try {
    
    $stmt = $conn->prepare("INSERT INTO OrderTable (userId, orderDate, total, status) VALUES (?, NOW(), ?, 'Pending')");
    $stmt->bind_param("id", $userId, $total);
    $stmt->execute();
    $orderId = $stmt->insert_id;

    
    $stmtProduct = $conn->prepare("INSERT INTO OrderProduct (orderId, productId, quantity) VALUES (?, ?, ?)");
    foreach ($cart as $item) {
        $stmtProduct->bind_param("iii", $orderId, $item['productId'], $item['quantity']);
        $stmtProduct->execute();
    }

    
    $stmtPay = $conn->prepare("INSERT INTO Payment (userId, orderId, amount, paymentMethod, paymentDate) VALUES (?, ?, ?, ?, NOW())");
    $stmtPay->bind_param("iids", $userId, $orderId, $total, $paymentMethod);
    $stmtPay->execute();

    $conn->commit();
    $_SESSION['cart'] = [];

    echo "<h2 style='text-align:center; margin-top:50px;'> Thank you! Your order has been placed.</h2>";
    echo "<p style='text-align:center;'><a href='user.php' class='btn btn-primary mt-3'>Back to Home</a></p>";

    header("Location: cartUser.php");
    exit;
} catch (Exception $e) {
    $conn->rollback();
    echo "<h2>Error placing order: " . htmlspecialchars($e->getMessage()) . "</h2>";
}
?>
