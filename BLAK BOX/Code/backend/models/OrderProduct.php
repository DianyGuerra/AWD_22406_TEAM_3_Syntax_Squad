<?php
require_once 'ConnectionDB.php';

class OrderProduct {

    public static function addProductToOrder($orderId, $productId, $quantity) {
        $database = new ConnectionDB();
        $conn = $database->connection();
        $query = "INSERT INTO OrderProduct(orderId, productId, quantity) VALUES (?, ?, ?)";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt,"iii", $orderId, $productId, $quantity);
        mysqli_stmt_execute($stmt);
    }

    public static function updateOrderProduct($orderId, $productId, $quantity) {
        $database = new ConnectionDB();
        $conn = $database->connection();

        $query = "UPDATE OrderProduct SET quantity = ? WHERE orderId = ? AND productId = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "iii", $quantity, $orderId, $productId);

        if (!mysqli_stmt_execute($stmt)) {
            header('Location: ../../../frontend/Error.php');
            exit();
        }
        header('Location: ../../../frontend/OrderDetails.php?orderId=' . $orderId);
    }

    public static function removeProductFromOrder($orderId, $productId) {
        $database = new ConnectionDB();
        $conn = $database->connection();

        $query = "DELETE FROM OrderProduct WHERE orderId = ? AND productId = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ii", $orderId, $productId);

        if (!mysqli_stmt_execute($stmt)) {
            header('Location: ../../../frontend/Error.php');
            exit();
        }
        header('Location: ../../../frontend/OrderDetails.php?orderId=' . $orderId);
    }

    public static function getProductsByOrder($orderId) {
        $database = new ConnectionDB();
        $conn = $database->connection();

        $query = "SELECT * FROM OrderProduct WHERE orderId = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "i", $orderId);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        $orderProducts = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $orderProducts[] = $row;
        }
        return $orderProducts;
    }

    public static function getOrderProduct($orderId, $productId) {
        $database = new ConnectionDB();
        $conn = $database->connection();

        $query = "SELECT * FROM OrderProduct WHERE orderId = ? AND productId = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ii", $orderId, $productId);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        return mysqli_fetch_assoc($result);
    }
}
?>
