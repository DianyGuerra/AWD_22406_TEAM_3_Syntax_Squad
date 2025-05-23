<?php
require_once('../models/OrderTable.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $orderId = $_POST['orderId'] ?? null;
    $status = $_POST['status'] ?? null;

    if ($orderId && $status) {
        OrderTable::updateOrderStatus($orderId, $status);
        header("Location: ../../src/pages/seeOrderAdmin.php?orderId=$orderId");
        exit();
    } else {
        echo "Missing data to update.";
    }
} else {
    echo "Access not permitted.";
}
