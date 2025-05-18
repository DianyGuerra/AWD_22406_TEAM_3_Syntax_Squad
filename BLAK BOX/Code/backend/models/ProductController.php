<?php
include('../models/Products.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    if ($action === 'update') {
        Product::updateProduct(
            $_POST['id'],
            $_POST['name'],
            $_POST['description'],
            $_POST['price'],
            $_POST['stock'],
            $_POST['category']
        );
    }

    if ($action === 'delete') {
        Product::deleteProduct($_POST['id']);
    }

    echo json_encode(['success' => true]);
}
?>
