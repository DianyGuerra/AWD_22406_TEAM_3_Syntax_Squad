<?php
include('ConnectionDB.php');

class User {
    public $id, $firstName, $lastName, $email, $password, $userType, $address, $phoneNumber;

    public function __construct($id, $firstName, $lastName, $email, $password, $userType, $address, $phoneNumber) {
        $this->id = $id;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->email = $email;
        $this->password = $password;
        $this->userType = $userType;
        $this->address = $address;
        $this->phoneNumber = $phoneNumber;
    }

    public static function createUser($firstName, $lastName, $email, $password, $userType, $address, $phoneNumber) {
        $db = new ConnectionDB();
        $conn = $db->connection();
        $query = "INSERT INTO User(firstName, lastName, email, password, userType, address, phoneNumber) VALUES (?, ?, ?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ssssss", $firstName, $lastName, $email, $password, $userType, $address, $phoneNumber);
        mysqli_stmt_execute($stmt);
    }

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

    public static function updateUser($id, $firstName, $lastName, $email, $password, $userType, $address, $phoneNumber) {
        $db = new ConnectionDB();
        $conn = $db->connection();
        $query = "UPDATE User SET firstName=?, lastName=?, email=?, password=?, userType=?, address=? , phoneNumber=?, WHERE userId=?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "ssssssi", $firstName, $lastName, $email, $password, $userType, $address, $phoneNumber, $id);
        mysqli_stmt_execute($stmt);
    }

    public static function deleteUser($id) {
        $db = new ConnectionDB();
        $conn = $db->connection();
        $query = "DELETE FROM User WHERE userId = ?";
        $stmt = mysqli_prepare($conn, $query);
        mysqli_stmt_bind_param($stmt, "i", $id);
        mysqli_stmt_execute($stmt);
    }
}
?>