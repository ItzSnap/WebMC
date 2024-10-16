// scripts.js

document.addEventListener('DOMContentLoaded', function () {
    const signinForm = document.getElementById('signin-form');

    signinForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Placeholder sign-in functionality
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Validate email and password (placeholder)
        if (email && password) {
            alert(`Signed in successfully!\nEmail: ${email}`);
        } else {
            alert('Please enter valid email and password.');
        }
    });
});
