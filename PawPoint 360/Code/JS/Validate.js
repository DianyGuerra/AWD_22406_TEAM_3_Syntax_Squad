//Login
/*function viewValues(){
    let form = document.forms['registerform']
    let text ='';
    for(let element of form){
        text += element.value +'<br>';
    }
    //console.log(text);
    document.getElementById('view_values').innerHTML = text;
}*/

document.forms["registerform"].addEventListener("submit", function(event) {
    let username = document.getElementById("username").value.trim();
    let password = document.getElementById('password').value.trim();
    let regex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
    let usernameRegex = /^[a-zA-Z0-9]+$/;

    if (!username || !password) {
        alert("All fields are required.");
        event.preventDefault();
    }
    
    /*if (username.length < 4) {
        alert("The username must have at least 4 characters.");
        event.preventDefault();
    }else{
        document.getElementById('username').style.border = "2px solid green";
    }*/

    /*if (regex.test(password)) {
        alert("The password must have at least 6 characters, one capital letter and one number.");
        event.preventDefault();
    }else{
        document.getElementById('password').style.border = "2px solid green";
    }else{
        document.getElementById('password').style.border = "2px solid green";
    }
    */

    /*
    let email = document.getElementById("email").value.trim();
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert("Please enter a valid email.");
        event.preventDefault();
    }*/

    if (username.length < 4 || !usernameRegex.test(username)) {
        document.getElementById("username").style.border = "2px solid red";
        alert("Username must be at least 4 characters and contain only letters and numbers.");
        event.preventDefault();
    }else{
        document.getElementById('username').style.border = "2px solid green";
    }

    /*if(password.length < 8){
        document.getElementById("password").style.border = "2px solid red";
        alert("The password must have at least 8 characters.");
        event.preventDefault();
    }else{
        document.getElementById('password').style.border = "2px solid green";
    }*/
});

document.getElementById('password').addEventListener('input',function(){
    const msg = document.getElementById("password_message");
    const pass = this.value;
    if (pass.length < 6) {
        document.getElementById("password").style.border = "2px solid red";
        msg.textContent = "Very short password";
        msg.style.color = "red";
    } else {
        document.getElementById("password").style.border = "2px solid green";
        msg.textContent = "Acceptable password";
        msg.style.color = "green";
    }
});


//Register
