/*
import UserModel from "../Model/UserModel.js";
import { users } from "../DB/db.js";

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modalS');
    const signUpForm = modal.querySelector('form');
    const usernameInput = signUpForm.querySelector('#Musername');
    const passwordInput = signUpForm.querySelector('#Mpassword');
    const confirmPasswordInput = signUpForm.querySelector('#MconfirmPassword');

    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!username) {
            alert('Username is required.');
            return;
        }

        if (!password) {
            alert('Password is required.');
            return;
        }

        if (!passwordPattern.test(password)) {
            alert('Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        // Save user if validations pass
        const newUser = new UserModel(username, password);
        console.log('User created:', newUser);

        // Clear form fields after successful registration
        usernameInput.value = '';
        passwordInput.value = '';
        confirmPasswordInput.value = '';

        // Optionally close the modal programmatically
        const bsModal = bootstrap.Modal.getInstance(modal);
        if (bsModal) {
            bsModal.hide();
        }
    });

    // Prevent modal closure on click inside modal content
    signUpForm.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevents event from bubbling up to close modal
    });
});
*/
