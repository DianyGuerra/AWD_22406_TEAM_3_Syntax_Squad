<?php
include('ConnectionDB.php');

class OrderService {
    public static function getFullOrderById($orderId) {
        $db = new ConnectionDB();
        $conn = $db->connection();

        $queryOrder = "
            SELECT o.*, u.firstName, u.lastName
            FROM OrderTable o
            INNER JOIN User u ON o.userId = u.userId
            WHERE o.orderId = ?
        ";
        $stmtOrder = mysqli_prepare($conn, $queryOrder);
        mysqli_stmt_bind_param($stmtOrder, "i", $orderId);
        mysqli_stmt_execute($stmtOrder);
        $resultOrder = mysqli_stmt_get_result($stmtOrder);
        $order = mysqli_fetch_assoc($resultOrder);

        if (!$order) {
            return null;
        }

        $queryProducts = "
            SELECT op.productId, op.quantity, p.name, p.price, (op.quantity * p.price) AS subtotal
            FROM OrderProduct op
            INNER JOIN Product p ON op.productId = p.productId
            WHERE op.orderId = ?
        ";
        $stmtProducts = mysqli_prepare($conn, $queryProducts);
        mysqli_stmt_bind_param($stmtProducts, "i", $orderId);
        mysqli_stmt_execute($stmtProducts);
        $resultProducts = mysqli_stmt_get_result($stmtProducts);

        $products = [];
        while ($row = mysqli_fetch_assoc($resultProducts)) {
            $products[] = $row;
        }

        $order['products'] = $products;

        return $order;
    }
}
?>