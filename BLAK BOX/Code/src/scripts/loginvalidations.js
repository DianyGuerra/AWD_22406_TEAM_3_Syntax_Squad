document.getElementById("registerform").addEventListener("input", function (e) {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let valid = true;
    document.getElementById("email-error").textContent = "";
    document.getElementById("password-error").textContent = "";

    if (email === "") {
        document.getElementById("email-error").textContent = "Email is required.";
        valid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById("email-error").textContent = "Please enter a valid email address.";
        valid = false;
    }

    if (password === "") {
        document.getElementById("password-error").textContent = "Password is required.";
        valid = false;
    } else if (password.length < 4) {
        document.getElementById("password-error").textContent = "Password must be at least 4 characters.";
        valid = false;
    }

    if (!valid) {
        e.preventDefault();
    }
    });

    setTimeout(function () {
        const errorBox = document.getElementById('errorBox');
        if (errorBox) {
            errorBox.style.display = 'none';
        }
    }, 4000);

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('show');
});
