<?php
class Cart {
    public $id, $userId, $createdDate;

    public function __construct($id, $userId, $createdDate) {
        $this->id = $id;
        $this->userId = $userId;
        $this->createdDate = $createdDate;
    }

    public static function createCart($userId, $createdDate) {
        $db = new ConnectionDB();
        $conn = $db->connection();
        $query = "INSERT INTO Cart(userId, createdDate) VALUES (?, ?)";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "is", $userId, $createdDate);
        mysqli_stmt_execute($stmt);
    }

    public static function getCartById($id) {
        $db = new ConnectionDB();
        $conn = $db->connection();
        $query = "SELECT * FROM Cart WHERE cartId = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "i", $id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return mysqli_fetch_assoc($result);
    }
}

?>