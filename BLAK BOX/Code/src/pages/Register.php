<!DOCTYPE html> <!-- Doctype OK -->
<html lang="en">
<head><!-- Head OK -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register - PawPoint360</title>
    <link rel="stylesheet" href="../styles/styleLogin.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Winky+Rough:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
</head>
<body>
    <nav><!-- NAV OK -->
        <h1>Register at PawPoint360</h1>
    </nav>

    <br><br>

    <section class="container">
        <form name="registerform" id="registerform" method="POST" action="#">

            <section class="element">
                <label for="user">Username</label>
                <input type="text" name="user" id="user" placeholder="Choose a username" required />
            </section>

            <section class="element">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Enter your email" required />
            </section>

            <section class="element">
                <label for="phone">Phone Number</label>
                <input type="tel" name="phone" id="phone" placeholder="Enter your phone number" required />    
            </section>

            <section class="element">
                <label for="password">Password</label>
                <input type="password" name="password" id="password" placeholder="Create a password" required />
                <br><p class="msg" id="password_message"></p>
            </section>

            <section class="element">
                <label for="confirm_password">Confirm Password</label>
                <input type="password" name="confirm_password" id="confirm_password" placeholder="Confirm your password" required />
                <br><p class="msg" id="confirm_password_message"></p>
            </section>

            <section class="btn">
                <input type="submit" name="register" id="register" value="REGISTER">
            </section>
            <br>
            <p>Already have an account? <a class="register_link" href="Login.php">Login</a></p>
        </form>
    </section>

    <section id="view_values"></section>

    <br><br>
    
    <footer>
        <p>Happiness is not bought, it is taken for a walk.</p>
    </footer>
    <script src="../../JS/Validate.js"></script>
</body>
</html>
