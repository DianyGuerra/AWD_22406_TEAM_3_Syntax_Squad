<?php
class OrderTable {
    public $id, $userId, $orderDate, $total, $status;

    public function __construct($id, $userId, $orderDate, $total, $status) {
        $this->id = $id;
        $this->userId = $userId;
        $this->orderDate = $orderDate;
        $this->total = $total;
        $this->status = $status;
    }

    public static function createOrder($userId, $orderDate, $total, $status) {
        $db = new ConnectionDB();
        $conn = $db->connection();
        $query = "INSERT INTO OrderTable(userId, orderDate, total, status) VALUES (?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "isds", $userId, $orderDate, $total, $status);
        mysqli_stmt_execute($stmt);
        return mysqli_insert_id($conn);
    }

    public static function getOrderById($orderId) {
        $db = new ConnectionDB();
        $conn = $db->connection();
        $query = "SELECT * FROM OrderTable WHERE orderId = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "i", $orderId);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return mysqli_fetch_assoc($result);
    }

    public static function updateOrderStatus($orderId, $status) {
        $db = new ConnectionDB();
        $conn = $db->connection();
        $query = "UPDATE OrderTable SET status=? WHERE orderId=?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "si", $status, $orderId);
        mysqli_stmt_execute($stmt);
    }
}
?>