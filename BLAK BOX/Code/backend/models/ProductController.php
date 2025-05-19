<?php
include('../models/Products.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    if ($action === 'update') {
        $success = Product::updateProduct(
            $_POST['id'],
            $_POST['name'],
            $_POST['description'],
            $_POST['price'],
            $_POST['stock'],
            $_POST['categoryId'] 
        );
        echo json_encode(['success' => $success]);
        exit();
    }

    if ($action === 'delete') {
        $success = Product::deleteProduct($_POST['id']);
        echo json_encode(['success' => $success]);
        exit();
    }
}
?>
