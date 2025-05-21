<?php
session_start();
include('Wishlist.php');

if (!isset($_SESSION['user_id'])) {
    header('Location: ../../src/pages/Login.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['wishlistId']) && isset($_POST['productId'])) {
    $wishlistId = (int)$_POST['wishlistId'];
    $productId = (int)$_POST['productId'];

    $deleted = Wishlist::removeProductFromWishlist($wishlistId, $productId);

    if ($deleted) {
        $_SESSION['profile_msg'] = "Product removed from wishlist.";
    } else {
        $_SESSION['profile_msg'] = "Error removing product from wishlist.";
    }
}

header('Location: ../../src/pages/profileUser.php');
exit;
?>
