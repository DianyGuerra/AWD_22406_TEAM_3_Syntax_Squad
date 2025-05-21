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
        echo "Faltan datos para actualizar.";
    }
} else {
    echo "Acceso no permitido.";
}
