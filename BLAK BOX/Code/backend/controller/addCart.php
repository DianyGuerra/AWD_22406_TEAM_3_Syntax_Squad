<?php
session_start();
include('../models/Products.php');

if (!isset($_SESSION['userId'])) {
    header('Location: ../../src/pages/Login.php');
    exit;
}

if (isset($_POST['productId'])) {
    $productId = $_POST['productId'];
    $product = Product::getProductById($productId);

    if (!$product || $product['stock'] <= 0) {
        $_SESSION['productsMsg'] = "This product is out of stock.";
        header("Location: ../../src/pages/productsUser.php");
        exit;
    }

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
        $_SESSION['cart'][] = [
            'productId' => $product['productId'],
            'name' => $product['name'],
            'price' => $product['price'],
            'quantity' => 1
        ];
    }

    $newStock = $product['stock'] - 1;
    Product::updateStock($productId, $newStock);

    $_SESSION['productsMsg'] = "Product added to cart.";
}

header("Location: ../../src/pages/productsUser.php");
exit;
