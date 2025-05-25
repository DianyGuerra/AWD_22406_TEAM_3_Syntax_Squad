<?php
session_start();
include('../models/Wishlist.php');

if (!isset($_SESSION['userId'])) {
    header('Location: ../../src/pages/Login.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['addWishlistProductId'])) {
    $productId = (int)$_POST['addWishlistProductId'];
    $userId = (int)$_SESSION['userId'];

    $added = Wishlist::addProductToWishlist($userId, $productId);
    if ($added) {
        $_SESSION['productsMsg'] = "Product added to wishlist.";
    } else {
        $_SESSION['productsMsg'] = "The product is already in your wishlist.";
    }
}

header("Location: ../../src/pages/productsUser.php");
exit;
?>