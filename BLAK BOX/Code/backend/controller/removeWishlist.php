<?php
session_start();
include('../models/Wishlist.php');

if (!isset($_SESSION['userId'])) {
    header('Location: ../../src/pages/Login.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['wishlistId']) && isset($_POST['productId'])) {
    $wishlistId = (int)$_POST['wishlistId'];
    $productId = (int)$_POST['productId'];

    $deleted = Wishlist::removeProductFromWishlist($wishlistId, $productId);

    if ($deleted) {
        $_SESSION['profileMsg'] = "Product removed from wishlist.";
    } else {
        $_SESSION['profileMsg'] = "Error removing product from wishlist.";
    }
}

header('Location: ../../src/pages/profileUser.php');
exit;
?>
