<?php
require_once('ConnectionDB.php');
class Product {

    public $id;
    public $name;
    public $description;
    public $price;
    public $stock;
    public $category_id;

    public function __construct($id, $name, $description, $price, $stock, $category_id) {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->price = $price;
        $this->stock = $stock;
        $this->category_id = $category_id;
    }

    public static function getProductById($id) {
        $database = new ConnectionDB();
        $conn = $database->connection();

        $stmt = $conn->prepare("SELECT p.*, c.name AS category, c.description AS categoryDescription 
                                FROM Product p 
                                JOIN Category c ON p.categoryId = c.categoryId 
                                WHERE p.productId = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $result = $stmt->get_result();
        $product = $result->fetch_assoc();


        return $product;
    }

    public static function updateProduct($id, $name, $description, $price, $stock, $categoryId) {
        $database = new ConnectionDB();
        $conn = $database->connection();

        $query = "UPDATE Product SET name = ?, description = ?, price = ?, stock = ?, categoryId = ? WHERE productId = ?";
        $stmt = mysqli_prepare($conn, $query);

        
        mysqli_stmt_bind_param($stmt, "ssdiii", $name, $description, $price, $stock, $categoryId, $id);

        if (!mysqli_stmt_execute($stmt)) {
            
            return false;
        }

        return true;
    }

    public static function deleteProduct($id) {
        $database = new ConnectionDB();
        $conn = $database->connection();

        $query = "DELETE FROM Product WHERE productId = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "i", $id);

        return mysqli_stmt_execute($stmt); 
    }

    public static function listAllProducts() {
        $database = new ConnectionDB();
        $conn = $database->connection();

        $query = "SELECT * FROM Product";
        $result = mysqli_query($conn, $query);

        $products = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $products[] = $row;
        }
        return $products;
    }

    public static function listAllProductsCategories() {
        $database = new ConnectionDB();
        $conn = $database->connection();

        $query = "SELECT p.*, c.name AS category, c.description AS categoryDescription FROM Product p
                  JOIN Category c ON p.categoryId = c.categoryId";
        $result = mysqli_query($conn, $query);

        $products = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $products[] = $row;
        }
        return $products;
    }

    public static function updateStock($productId, $newStock) {
        $database = new ConnectionDB();
        $conn = $database->connection();

        $query = "UPDATE Product SET stock = ? WHERE productId = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ii", $newStock, $productId);

        return mysqli_stmt_execute($stmt);
    }

    public static function increaseStock($productId, $quantity) {
        $db = new ConnectionDB();
        $conn = $db->connection();

        $query = "UPDATE Product SET stock = stock + ? WHERE productId = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ii", $quantity, $productId);

        return mysqli_stmt_execute($stmt);
    }

}
?>
