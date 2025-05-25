<?php
require_once 'ConnectionDB.php';

class Payment {

    public static function getPaymentById($id) {
        $db = new ConnectionDB();
        $conn = $db->connection();
        $query = "SELECT * FROM Payment WHERE paymentId = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "i", $id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return mysqli_fetch_assoc($result);
    }

    public static function createPayment($userId, $orderId, $amount, $paymentMethod) {
        $db = new ConnectionDB();
        $conn = $db->connection();
        $query = "INSERT INTO Payment (userId, orderId, amount, paymentMethod, paymentDate) VALUES (?, ?, ?, ?, NOW())";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "iids", $userId, $orderId, $amount, $paymentMethod);
        mysqli_stmt_execute($stmt);
    }

    public static function updatePayment($paymentId, $userId, $orderId, $amount, $paymentMethod, $paymentDate) {
        $db = new ConnectionDB();
        $conn = $db->connection();
        $query = "UPDATE Payment SET userId = ?, orderId = ?, amount = ?, paymentMethod = ?, paymentDate = ? WHERE paymentId = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "iisssi", $userId, $orderId, $amount, $paymentMethod, $paymentDate, $paymentId);
        mysqli_stmt_execute($stmt);
    }

    
}
?>
