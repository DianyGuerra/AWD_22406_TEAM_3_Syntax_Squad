<?php
session_start();
include('auth.php');
requireLogin();
checkUserType('user');

if (!isset($_SESSION['user_id'])) {
    header('Location: ../../src/pages/Login.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['addWishlistProductId'])) {
    include('Wishlist.php');
    $productId = (int)$_POST['addWishlistProductId'];
    $userId = $_SESSION['user_id'];

    $added = Wishlist::addProductToWishlist($userId, $productId);
    if ($added) {
        $_SESSION['products_msg'] = "Product added to wishlist.";
    } else {
        $_SESSION['products_msg'] = "The product is already in your wishlist.";
    }

} else {
    $_SESSION['products_msg'] = "Invalid request.";
    
}
header("Location: ../../src/pages/productsUser.php");
exit();
?>