<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function requireLogin() {
    if (!isset($_SESSION['userId'])) {
        header("Location: ../../index.php");
        exit;
    }
}

function requireAdmin() {
    if (!isset($_SESSION['userId']) || $_SESSION['userType'] !== 'admin') {
        header("Location: ../../index.php");
        exit;
    }
}

function checkUserType($requiredType) {
    if (!isset($_SESSION['userId']) || !isset($_SESSION['userType']) || $_SESSION['userType'] !== $requiredType) {
        header("Location: ../../src/pages/Login.php");
        exit();
    }
}
?>

