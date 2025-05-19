<?php
require_once('ConnectionDB.php');

class Wishlist {

    public $wishlistId;
    public $userId;
    public $createdDate;

    public function __construct($wishlistId, $userId, $createdDate) {
        $this->wishlistId = $wishlistId;
        $this->userId = $userId;
        $this->createdDate = $createdDate;
    }

    public static function createWishlist($userId) {
        $database = new ConnectionDB();
        $conn = $database->connection();

        $query = "INSERT INTO Wishlist(userId, createdDate) VALUES (?, CURDATE())";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "i", $userId);

        if (!mysqli_stmt_execute($stmt)) {
            return false;
        }

        return mysqli_insert_id($conn);
    }

    public static function addProductToWishlist($wishlistId, $productId) {
        $database = new ConnectionDB();
        $conn = $database->connection();

        $query = "INSERT INTO WishlistProduct(wishlistId, productId) VALUES (?, ?)";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ii", $wishlistId, $productId);

        return mysqli_stmt_execute($stmt);
    }

    public static function removeProductFromWishlist($wishlistId, $productId) {
        $database = new ConnectionDB();
        $conn = $database->connection();

        $query = "DELETE FROM WishlistProduct WHERE wishlistId = ? AND productId = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ii", $wishlistId, $productId);

        return mysqli_stmt_execute($stmt);
    }

    public static function getWishlistProducts($wishlistId) {
        $database = new ConnectionDB();
        $conn = $database->connection();

        $query = "SELECT p.* 
                  FROM WishlistProduct wp 
                  JOIN Product p ON wp.productId = p.productId 
                  WHERE wp.wishlistId = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "i", $wishlistId);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        $products = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $products[] = $row;
        }

        return $products;
    }

    public static function deleteWishlist($wishlistId) {
        $database = new ConnectionDB();
        $conn = $database->connection();

        $queryDeleteProducts = "DELETE FROM WishlistProduct WHERE wishlistId = ?";
        $stmt1 = mysqli_prepare($conn, $queryDeleteProducts);
        mysqli_stmt_bind_param($stmt1, "i", $wishlistId);
        mysqli_stmt_execute($stmt1);

        $queryDeleteWishlist = "DELETE FROM Wishlist WHERE wishlistId = ?";
        $stmt2 = mysqli_prepare($conn, $queryDeleteWishlist);
        mysqli_stmt_bind_param($stmt2, "i", $wishlistId);

        return mysqli_stmt_execute($stmt2);
    }

    public static function getUserWishlists($userId) {
        $database = new ConnectionDB();
        $conn = $database->connection();

        $query = "SELECT * FROM Wishlist WHERE userId = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "i", $userId);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);

        $wishlists = [];
        while ($row = mysqli_fetch_assoc($result)) {
            $wishlists[] = $row;
        }

        return $wishlists;
    }
}
?>
