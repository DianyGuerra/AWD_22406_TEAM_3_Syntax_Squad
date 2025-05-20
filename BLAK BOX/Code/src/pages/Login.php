<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BLAK BOX | Log in</title>
    <link rel="stylesheet" href="../styles/styleLogin.css">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Quantico:ital,wght@0,400;0,700;1,400;1,700&family=Winky+Rough:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    

</head>

<body>
    <header>
        <nav class="nav">
            <section class="nav_left">
                <img class="logo" src="../../Images/logo.png" alt="Blak Box Logo">
            </section>
            <section class="nav_right">
                <div>
                    <a href="./../../index.php" class="nav_link">Home</a>
                </div>
                <div class="nav_buttons">
                    <a href="../pages/Signup.php" class="btn">Sign Up</a>
                </div>
            </section>
        </nav>
    </header>

    <div class="content-wrapper">
        <section class="background"></section>
        <div class="content">
            <div class="highlight-box">
                <h2 class="title">Log in</h2>

                <?php
                    if (isset($_SESSION['login_error'])) {
                        echo "<div class='alert alert-danger'>{$_SESSION['login_error']}</div>";
                        unset($_SESSION['login_error']);
                    }
                ?>

                <form class="registerform" method="POST" id="registerform" name="registerform" action="../../backend/models/LoginForm.php">

                        <section class="element">
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email"/>
                            <span class="error-message" id="email-error"></span>
                        </section>
                        
                        <section class="element">
                            <label for="password">Password</label>
                            <input type="password" id="password" name="password"/>
                            <span class="error-message" id="password-error"></span>
                        </section>

                        <br>

                        <section class="element">
                            <input type="submit" value="Log in" name="Log in"/>
                        </section>

                        <p class="not-registered">Don't have an account yet? <a class="register-link" href="../pages/Signup.php">Register here</a></p>
    
                </form>
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

    <script src="../scripts/loginvalidations.js"></script>

</body>

</html>