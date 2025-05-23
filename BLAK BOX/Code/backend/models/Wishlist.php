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

    public static function addProductToWishlist($userId, $productId) {
        $database = new ConnectionDB();
        $conn = $database->connection();

        $query = "SELECT wishlistId FROM Wishlist WHERE userId = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "i", $userId);
        mysqli_stmt_execute($stmt);
        mysqli_stmt_bind_result($stmt, $wishlistId);
        if (!mysqli_stmt_fetch($stmt)) {
            mysqli_stmt_close($stmt);
            $insertWishlist = "INSERT INTO Wishlist (userId, createdDate) VALUES (?, CURDATE())";
            $stmt2 = mysqli_prepare($conn, $insertWishlist);
            mysqli_stmt_bind_param($stmt2, "i", $userId);
            mysqli_stmt_execute($stmt2);
            $wishlistId = mysqli_insert_id($conn);
            mysqli_stmt_close($stmt2);
        }
        mysqli_stmt_close($stmt);

        $check = "SELECT * FROM WishlistProduct WHERE wishlistId = ? AND productId = ?";
        $stmt3 = mysqli_prepare($conn, $check);
        mysqli_stmt_bind_param($stmt3, "ii", $wishlistId, $productId);
        mysqli_stmt_execute($stmt3);
        mysqli_stmt_store_result($stmt3);

        if (mysqli_stmt_num_rows($stmt3) > 0) {
            mysqli_stmt_close($stmt3);
            return false;
        }
        mysqli_stmt_close($stmt3);

        $insertProduct = "INSERT INTO WishlistProduct (wishlistId, productId) VALUES (?, ?)";
        $stmt4 = mysqli_prepare($conn, $insertProduct);
        mysqli_stmt_bind_param($stmt4, "ii", $wishlistId, $productId);
        $result = mysqli_stmt_execute($stmt4);
        mysqli_stmt_close($stmt4);

        return $result;
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

    public static function getUserWishlistProducts($userId) {
    $database = new ConnectionDB();
    $conn = $database->connection();

    $query = "SELECT p.*, w.wishlistId
              FROM Wishlist w
              JOIN WishlistProduct wp ON w.wishlistId = wp.wishlistId
              JOIN Product p ON wp.productId = p.productId
              WHERE w.userId = ?";

    $stmt = mysqli_prepare($conn, $query);
    mysqli_stmt_bind_param($stmt, "i", $userId);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    $products = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $products[] = $row;
    }

    return $products;
}

}
?>
