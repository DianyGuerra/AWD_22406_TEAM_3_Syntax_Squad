<?php
require_once 'connectionDB.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name = $_POST["name"];
    $description = $_POST["description"];
    $price = $_POST["price"];
    $stock = $_POST["stock"];
    $categoryId = $_POST["categoryId"];

    $db = new connectionDB();
    $conn = $db->connection();

    $stmt = $conn->prepare("INSERT INTO Product (name, description, price, stock, categoryId) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("ssdii", $name, $description, $price, $stock, $categoryId);

    if ($stmt->execute()) {
        echo "Product registered successfully.";
    } else {
        echo "Error inserting product: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}
?>
