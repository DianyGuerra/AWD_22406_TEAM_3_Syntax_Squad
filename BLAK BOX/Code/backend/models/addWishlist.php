<?php
session_start();
include('Wishlist.php');

if (!isset($_SESSION['user_id'])) {
    header('Location: ../../src/pages/Login.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['addWishlistProductId'])) {
    $productId = (int)$_POST['addWishlistProductId'];
    $userId = (int)$_SESSION['user_id'];

    $added = Wishlist::addProductToWishlist($userId, $productId);
    if ($added) {
        $_SESSION['products_msg'] = "Product added to wishlist.";
        error_log("Product $productId add");
    } else {
        $_SESSION['products_msg'] = "The product is already in your wishlist.";
        error_log("Product $productId already");
    }
}

header("Location: ../../src/pages/productsUser.php");
exit;
?>