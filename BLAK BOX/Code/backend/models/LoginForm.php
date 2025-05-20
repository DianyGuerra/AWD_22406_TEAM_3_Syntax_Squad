<?php
session_start();
require_once 'connectionDB.php';

$db = new connectionDB();
$conn = $db->connection();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    if (empty($email) || empty($password)) {
        echo "Please fill in all fields.";
        exit;
    }

    try {
        $stmt = $conn->prepare("SELECT userId, email, password, userType FROM User WHERE email = ?");
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();

        if ($user) {
            if (password_verify($password, $user['password'])) {
                $_SESSION['user_id'] = $user['userId'];
                $_SESSION['user_email'] = $user['email'];
                $_SESSION['user_type'] = $user['userType'];

                if ($user['userType'] === 'user') {
                    header("Location: ../../src/pages/user.php");
                    exit;
                } else {
                    header("Location: ../../src/pages/admin.php");
                    exit;
                }
            } else {
                echo "Incorrect password.";
            }
        } else {
            echo "User not found.";
        }
    } catch (Exception $e) {
        echo "Error in the database: " . $e->getMessage();
    }
} else {
    // Redirige al login si alguien intenta acceder con GET
    header("Location: ../../src/pages/Login.php");
    exit;
}

