<?php
include('ConnectionDB.php');

class CartProduct {
    public $cartId;
    public $productId;
    public $quantity;

    public function __construct($cartId, $productId, $quantity) {
        $this->cartId = $cartId;
        $this->productId = $productId;
        $this->quantity = $quantity;
    }

    public static function addProductToCart($cartId, $productId, $quantity) {
        $db = new ConnectionDB();
        $conn = $db->connection();

        $sql = "INSERT INTO CartProduct (cartId, productId, quantity) VALUES (?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iii", $cartId, $productId, $quantity);
        $stmt->execute();
        $stmt->close();
        $conn->close();
    }

    public static function updateProductQuantity($cartId, $productId, $quantity) {
        $db = new ConnectionDB();
        $conn = $db->connection();

        $sql = "UPDATE CartProduct SET quantity = ? WHERE cartId = ? AND productId = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iii", $quantity, $cartId, $productId);
        $stmt->execute();
        $stmt->close();
        $conn->close();
    }

    public static function removeProductFromCart($cartId, $productId) {
        $db = new ConnectionDB();
        $conn = $db->connection();

        $sql = "DELETE FROM CartProduct WHERE cartId = ? AND productId = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("ii", $cartId, $productId);
        $stmt->execute();
        $stmt->close();
        $conn->close();
    }

    public static function getCartProducts($cartId) {
        $db = new ConnectionDB();
        $conn = $db->connection();

        $sql = "SELECT * FROM CartProduct WHERE cartId = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $cartId);
        $stmt->execute();
        $result = $stmt->get_result();

        $cartProducts = [];
        while ($row = $result->fetch_assoc()) {
            $cartProducts[] = new CartProduct($row['cartId'], $row['productId'], $row['quantity']);
        }

        $stmt->close();
        $conn->close();

        return $cartProducts;
    }
}
?>
