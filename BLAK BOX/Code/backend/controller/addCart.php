<?php
session_start();
include('../models/Products.php');

if (!isset($_SESSION['user_id'])) {
    header('Location: ../../src/pages/Login.php');
    exit;
}

if (isset($_POST['productId'])) {
    $productId = $_POST['productId'];
    $found = false;
    if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = [];
    }
    foreach ($_SESSION['cart'] as &$item) {
        if ($item['productId'] == $productId) {
            $item['quantity'] += 1;
            $found = true;
            break;
        }
    }
    if (!$found) {
        $products = Product::listAllProducts();
        foreach ($products as $p) {
            if ($p['productId'] == $productId) {
                $_SESSION['cart'][] = [
                    'productId' => $p['productId'],
                    'name' => $p['name'],
                    'price' => $p['price'],
                    'quantity' => 1
                ];
                break;
            }
        }
    }
    $_SESSION['products_msg'] = "Product added to cart.";
}
header("Location: ../../src/pages/productsUser.php");
exit;
?>
