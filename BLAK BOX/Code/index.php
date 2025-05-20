<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BLAK BOX | Home Page</title>
    <link rel="stylesheet" href="src/styles/styleHome.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100..700;1,100..700&family=Quantico:ital,wght@0,400;0,700;1,400;1,700&family=Winky+Rough:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">

</head>
<body>
    <header>
  <nav class="nav">
        <section class="nav_left">
            <img class="logo" src="./Images/logo.png" alt="Blak Box Logo">
        </section>

    
            <button class="hamburger" id="hamburger">
            <span></span>
            <span></span>
            <span></span>
            </button>

            <section class="nav_right" id="navMenu">
                <div>
                    <a href="./index.php" class="nav_link">Home</a>
                    <a href="#hero" class="nav_link">About</a>
                    <a href="#store" class="nav_link">Store</a>
                    <a href="#contact" class="nav_link">Contact</a>
                </div>
                <div class="nav_buttons">
                    <a href="./src/pages/Login.php" class="btn"><i class="bi bi-box-arrow-in-right"></i> Log in</a>
                    <a href="./src/pages/Signup.php" class="btn"><i class="bi bi-person-plus-fill"></i> Sign Up</a>
                </div>
            </section>
        </nav>
        </header>


        <section id="hero" class="hero">
            <div class="hero_text">
                <h1>Welcome to BLAK BOX</h1>
                <br>
                <p>Your one-stop solution for all your needs.</p>
                <br>
                <a class="btn" href="#store">Explore Now 👇</a>
            </div>
        </section>

        <section id="store" class="store">
            <h2>Our Store</h2>
            <div class="service_cards">
                <div class="card">
                    <img src="./Images/pc_components.png" alt="PC Components">
                    <h3>PC components</h3>
                    <p>Power your machine from the heart. Find motherboards, processors, 
                        RAM and everything you need to build the PC of your dreams.</p>
                </div>
                <div class="card">
                    <img src="./Images/graphics_resized.jpg" alt="Graphics Cards">
                    <h3>Graphic Cards</h3>
                    <p> Take your visual experience to the next level. Discover 
                        high-performance graphics cards for gaming, design and more.</p>
                </div>
                <div class="card">
                    <img src="./Images/peripherals.png" alt="Peripherals">
                    <h3>Peripherals</h3>
                    <p>Elevate your setup with peripherals that combine style and 
                        performance: keyboards, mice, headsets and more to dominate every game.</p>
                </div>
            </div>
        </section>

        <section id="brands" class="brands_section">
            <h2>Our Brands</h2>
            <div class="carousel_container">
                <button class="carousel_btn prev_btn" aria-label="Previous"><i class="fas fa-chevron-left"></i></button>
                
                <div class="carousel_track_container">
                <ul class="carousel_track">
                    <li class="carousel_card">
                        <img src="./Images/intel_logo.jpg" alt="Brand 1">
                        <p>Intel</p>
                    </li>
                    <li class="carousel_card">
                        <img src="./Images/amd_logo.jpg" alt="Brand 2">
                        <p>AMD</p>
                    </li>
                    <li class="carousel_card">
                        <img src="./Images/ASUS_logo.jpg" alt="Brand 3">
                        <p>ASUS</p>
                    </li>
                    <li class="carousel_card">
                        <img src="./Images/gigabyte_logo.png" alt="Brand 4">
                        <p>Gigabyte</p>
                    </li>
                    <li class="carousel_card">
                        <img src="./Images/asrock_logo.jpg" alt="Brand 5">
                        <p>ASRock</p>
                    </li>
                    <li class="carousel_card">
                        <img src="./Images/nvidia_logo.jpg" alt="Brand 5">
                        <p>NVIDIA</p>
                    </li>
                    <li class="carousel_card">
                        <img src="./Images/radeon_logo.png" alt="Brand 5">
                        <p>AMD Radeon</p>
                    </li>
                    <li class="carousel_card">
                        <img src="./Images/logitech_logo.png" alt="Brand 5">
                        <p>Logitech</p>
                    </li>
                    <li class="carousel_card">
                        <img src="./Images/corsair_logo.jpg" alt="Brand 5">
                        <p>Corsair</p>
                    </li>
                    <li class="carousel_card">
                        <img src="./Images/redragon_logo.png" alt="Brand 5">
                        <p>Redragon</p>
                    </li>
                    <li class="carousel_card">
                        <img src="./Images/secretlab_logo.png" alt="Brand 5" style="filter: invert(1)">
                        <p>SecretLab</p>
                    </li>
                </ul>
                </div>
    
                <button class="carousel_btn next_btn" aria-label="Next"><i class="fas fa-chevron-right"></i></button>
            </div>
        </section>


        <section class="contact" id="contact">
            <h2>Contact Us</h2>
            <div class="contact_info">
                <a href="https://wa.me/593987600150" target="_blank" class="whatsapp-button">
                <i class="fab fa-whatsapp"></i> Contact Us Via WhatsApp
                </a>
                <a href="mailto:jg2323229@gmail.com?subject=Inquiry%20on%20mi%20Rquest&body=Hi%20Blak%20Box,%20I%20woul'd%20like%20to%20know%20about%20..." 
                class="contact_button">📩 Contact Us Via Email</a>
            </div>
        </section>

    <footer>
        <div class="footer_logo">
            <img class="logo_footer" src="./Images/logo.png" alt="Blak Box Logo">
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
            <p>© 2023 BLAK BOX. All rights reserved.</p>
        </div>
    </footer>

    <script src="./src/scripts/carousel.js" defer></script>
</body>
</html>