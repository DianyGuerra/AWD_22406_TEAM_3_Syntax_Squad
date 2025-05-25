<?php
include('ConnectionDB.php');

class User {
    
    public static function getUserById($id) {
        $db = new ConnectionDB();
        $conn = $db->connection();
        $query = "SELECT * FROM User WHERE userId = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "i", $id);
        mysqli_stmt_execute($stmt);
        $result = mysqli_stmt_get_result($stmt);
        return mysqli_fetch_assoc($result);
    }

    public static function updateUser($id, $firstName, $lastName, $email, $password, $userType, $phoneNumber) {
        $db = new ConnectionDB();
        $conn = $db->connection();
        $query = "UPDATE User SET firstName=?, lastName=?, email=?, password=?, userType=?, phoneNumber=? WHERE userId=?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "sssssi", $firstName, $lastName, $email, $password, $userType, $phoneNumber, $id);
        mysqli_stmt_execute($stmt);
    }

    
}
?>