const validations = {
    firstName: {
        regex: /^[A-Za-zÀ-ÿ\s]{3,}$/,
        message: "The name must have at least 3 letters."
    },
    lastName: {
        regex: /^[A-Za-zÀ-ÿ\s]{4,}$/,
        message: "The last name must have at least 4 letters."
    },
    email: {
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,4}$/,
        message: "Please enter a valid email address."
    },
    phoneNumber: {
        regex: /^\d{10}$/,
        message: "The phone number must have 10 digits."
    },
    password: {
        regex: /^(?=.*[A-Z])(?=.*\d).{6,}$/,
        message: "Your password must have at least 6 characters, one capital letter and one number."
    }
};

function validateInput(input) {
    const value = input.value.trim();
    const id = input.id;
    const validation = validations[id];

    console.log("Validando", id);

    let message = "";
    let isValid = false;

    if (!validation) return false;

    if (value === "") {
        message = "This field is required.";
    } else if (!validation.regex.test(value)) {
        message = validation.message;
    } else {
        isValid = true;
    }

    const feedbackId = id + "-feedback";
    let feedback = document.getElementById(feedbackId);
    if (!feedback) {
        feedback = document.createElement("div");
        feedback.id = feedbackId;
        feedback.className = "msg";
        input.parentNode.appendChild(feedback);
    }

    feedback.innerText = message;
    feedback.style.color = isValid ? "green" : "red";
    input.style.border = `2px solid ${isValid ? "green" : "red"}`;

    return isValid;
}



window.onload = function () {
    const form = document.getElementById("registerform");
    const inputs = form.querySelectorAll("input[type='text'], input[type='email'], input[type='tel'], input[type='password']");

    inputs.forEach(input => {
        input.oninput = () => validateInput(input);
    });

    form.onsubmit = function (e) {
        let valid = true;
        inputs.forEach(input => {
            if (!validateInput(input)) {
                valid = false;
            }
        });

        if (!valid) {
            e.preventDefault();
            alert("Please correct the errors before submitting the form.");
        }
    };
};
