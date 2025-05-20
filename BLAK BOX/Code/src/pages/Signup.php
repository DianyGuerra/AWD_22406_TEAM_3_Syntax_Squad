<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <title>BLAK BOX | Sign up</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Quantico:ital,wght@0,400;0,700;1,400;1,700&family=Winky+Rough:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="stylesheet" href="../styles/styleSignup.css">    

</head>

<body>
    <header>
        <nav class="nav">
            <section class="nav_left">
                <img class="logo" src="../../Images/logo.png" alt="Blak Box Logo">
            </section>
            <section class="nav_right">
                <div>
                    <a href="../../index.php" class="nav_link">Home</a>
                </div>
                <div class="nav_buttons">
                    <a href="../pages/Login.php" class="btn"><i class="bi bi-box-arrow-in-right"></i>Log in</a>
                </div>
            </section>
        </nav>
    </header>

    <div class="content-wrapper">
        <section class="background"></section>
        <div class="content">
            <div class="highlight-box">
                <h2 class="title">Sign up</h2>
                <br>
                <form class="registerform" method="POST" id="registerform" name="registerform" action="../../backend/models/signupform.php">
                        <section class="element">
                            <label for="firstName">Name:</label>
                            <input type="text" id="firstName" name="firstName"/>    
                        </section>
                        
                        <section class="element">
                            <label for="lastName">Lastname:</label>
                            <input type="text" id="lastName" name="lastName"/>
                        </section>

                        <section class="element">
                            <label for="email">Email:</label>
                            <input type="email" id="email" name="email"/>
                        </section>

                        <section class="element">
                            <label for="phoneNumber">Phone:</label>
                            <input type="tel" id="phoneNumber" name="phoneNumber"/>
                        </section>
                        
                        <section class="element">
                            <label for="password">Password</label>
                            <input type="password" id="password" name="password"/>
                        </section>

                        <br>

                        <section class="element">
                            <input type="submit" value="Register" name="Register"/>
                        </section>

                        <p class="already-registered">You're already registered? <a class="login-link" href="../pages/Login.php">Log In</a></p>
    
                    </form>
                </div>
        </div>
    </div>
    <!--Hola-->
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

    <script src="../scripts/formvalidations.js" defer></script>
</body>

</html>

