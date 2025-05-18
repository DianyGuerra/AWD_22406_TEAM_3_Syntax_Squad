<?php
class Category {
    public $id, $name, $description;

    public function __construct($id, $name, $description) {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
    }

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

    public static function updateCategory($id, $name, $description) {
        $db = new ConnectionDB();
        $conn = $db->connection();
        $query = "UPDATE Category SET name=?, description=? WHERE categoryId=?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ssi", $name, $description, $id);
        mysqli_stmt_execute($stmt);
    }

    public static function deleteCategory($id) {
        $db = new ConnectionDB();
        $conn = $db->connection();
        $query = "DELETE FROM Category WHERE categoryId = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "i", $id);
        mysqli_stmt_execute($stmt);
    }
}
?>