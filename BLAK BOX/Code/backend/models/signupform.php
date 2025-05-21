<?php
session_start();
require_once 'connectionDB.php';

$successMessage = "";
$errorMessage = "";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstName = trim($_POST['firstName']);
    $lastName = trim($_POST['lastName']);
    $email = trim($_POST['email']);
    $phoneNumber = trim($_POST['phoneNumber']);
    $password = $_POST['password'];
    $userType = "user";

    if (empty($firstName) || empty($lastName) || empty($email) || empty($phoneNumber) || empty($password)) {
        $errorMessage = "All fields are required.";
    } else {
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        try {
            $db = new connectionDB();
            $conn = $db->connection();

            $stmt = $conn->prepare("INSERT INTO User (firstName, lastName, email, phoneNumber, password, userType) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssss", $firstName, $lastName, $email, $phoneNumber, $hashedPassword, $userType);

            if ($stmt->execute()) {
                $_SESSION['userId'] = $conn->insert_id;
                $_SESSION['userType'] = $userType;
                $successMessage = "Successfully registered!";
            } else {
                $errorMessage = "Error in the registration: " . $stmt->error;
            }

            $stmt->close();
            $conn->close();

        } catch (Exception $e) {
            $errorMessage = "Connection or insertion error: " . $e->getMessage();
        }
    }
}
?>



<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Quantico:ital,wght@0,400;0,700;1,400;1,700&family=Winky+Rough:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="stylesheet" href="../../src/styles/styleSignup.css">
</head>
<body>
    <header>
        <nav class="nav">
            <section class="nav_left">
                <img class="logo" src="../../Images/logo.png" alt="Blak Box Logo">
            </section>
        
            <section class="hamburger_menu">
                <button class="hamburger" id="hamburger">
                <span></span>
                <span></span>
                <span></span>
                </button>
            </section>

                <section class="nav_right" id="navMenu">
                    <div>
                        <a href="../../index.php" class="nav_link">Home</a>
                    </div>
                    <div class="nav_buttons">
                        <a href="../../src/pages/Signup.php" class="btn"><i class="bi bi-person-plus-fill"></i> Sign Up</a>
                    </div>
                </section>
        </nav>
    </header>

    <div class="content-wrapper">
        <section class="background"></section>
        <div class="content">
            <div class="highlight-box" style="height: fit-content;">
                <?php if (!empty($successMessage)): ?>
                    <div class="message success">
                        <i class="fas fa-check-circle"></i>
                        <?= $successMessage ?>
                        <div class="success-button">
                            <br>
                            <a href="../../src/pages/Login.php" class="btn-success">Log in with your New Account!</a>
                        </div>
                    </div>
                <?php elseif (!empty($errorMessage)): ?>
                    <div class="message error">
                        <i class="fas fa-exclamation-triangle"></i>
                        <?= $errorMessage ?>
                        <div class="error-button">
                            <br>
                            <a href="../../src/pages/Signup.php" class="btn-error">Go back</a>
                        </div>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>


    <footer>
        <div class="footer_logo">
            <img class="logo_footer" src="../../Images/logo.png" alt="Blak Box Logo">
        </div>
        <div class="footer_content">
            <div class="social_media">
                <a href="#"><i class="fab fa-facebook-f"></i> Facebook</a>
                <a href="#"><i class="fab fa-instagram"></i> Instagram</a>
                <a href="#"><i class="fab fa-x-twitter"></i> Twitter</a>
                <a href="#"><i class="fab fa-tiktok"></i> TikTok</a>
            </div>
        </div>
        <div class="footer_text">
            <p>© 2025 BLAK BOX. All rights reserved.</p>
        </div>
    </footer>
    <script>
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');

        hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('show');
        });
    </script>
</body>
</html>
