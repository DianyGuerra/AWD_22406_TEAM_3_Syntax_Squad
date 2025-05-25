<?php
require_once('ConnectionDB.php');

class Category {

    public static function createCategory($name, $description) {
        $db = new ConnectionDB();
        $conn = $db->connection();
        $query = "INSERT INTO Category(name, description) VALUES (?, ?)";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ss", $name, $description);
        mysqli_stmt_execute($stmt);
    }

    public static function getCategoryById($id) {
        $db = new ConnectionDB();
        $conn = $db->connection();
        $query = "SELECT * FROM Category WHERE categoryId = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "i", $id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return mysqli_fetch_assoc($result);
    }

    public static function getCategories() {
        $db = new ConnectionDB();
        $conn = $db->connection();
        $query = "SELECT * FROM Category";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        $categories = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $categories[] = $row;
        }
        return $categories;
    }


    public static function updateCategory($id, $name, $description) {
        $db = new ConnectionDB();
        $conn = $db->connection();
        $query = "UPDATE Category SET name=?, description=? WHERE categoryId=?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ssi", $name, $description, $id);
        mysqli_stmt_execute($stmt);
    }

    
}
?>