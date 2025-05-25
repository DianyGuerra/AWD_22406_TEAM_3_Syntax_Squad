<?php
session_start();
require_once '../models/ConnectionDB.php';

$db = new connectionDB();
$conn = $db->connection();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = trim($_POST['email']);
    $password = trim($_POST['password']);

    if (empty($email) || empty($password)) {
        $_SESSION['loginError'] = "Please fill in all fields.";
        header("Location: ../../src/pages/Login.php?error=Please+fill+in+all+fields");
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
                $_SESSION['userId'] = $user['userId'];
                $_SESSION['userEmail'] = $user['email'];
                $_SESSION['userType'] = $user['userType'];

                if ($user['userType'] === 'user') {
                    header("Location: ../../src/pages/user.php");
                    exit;
                } else {
                    header("Location: ../../src/pages/admin.php");
                    exit;
                }
            } else {
                $_SESSION['loginError'] = "Incorrect password.";
                header("Location: ../../src/pages/Login.php?error=Incorrect+password");
                exit;
            }
        } else {
            $_SESSION['loginError'] = "User not found.";
            header("Location: ../../src/pages/Login.php?error=User+not+found");
            exit;
        }
    } catch (Exception $e) {
        $_SESSION['loginError'] = "Error in the database.";
        header("Location: ../../src/pages/Login.php?error=Error+in+the+database");
        exit;
    }
} else {
    header("Location: ../../src/pages/Login.php");
    exit;
}


