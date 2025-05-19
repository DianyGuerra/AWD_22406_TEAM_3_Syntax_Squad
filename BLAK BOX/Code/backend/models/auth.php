<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

function requireLogin() {
    if (!isset($_SESSION['user_id'])) {
        header("Location: ../../index.html");
        exit;
    }
}

function requireAdmin() {
    if (!isset($_SESSION['user_id']) || $_SESSION['user_type'] !== 'admin') {
        header("Location: ../../index.html");
        exit;
    }
}

function checkUserType($requiredType) {
    if (!isset($_SESSION['user_id']) || !isset($_SESSION['user_type']) || $_SESSION['user_type'] !== $requiredType) {
        header("Location: ../../src/pages/Login.html");
        exit();
    }
}
?>

