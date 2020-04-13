/** @format */

const url = "https://5e8f22bbfe7f2a00165eeedf.mockapi.io/user";
const mockAPI = document.querySelector("#display");

const registerForm = document.getElementById("register-form");
const addNewUser = async (event) => {
    event.preventDefault();
    const pwd1 = document.querySelector("#password").value;
    const pwd2 = document.querySelector("#password1").value;
    if (pwd1 == pwd2) {
        const fullName = document.getElementById("fullName").value;
        const userName = document.getElementById("userName").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const registrant = {
            fullName,
            userName,
            email,
            password,
        };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(registrant),
        });
        await response.json();

        window.location.href = `${window.origin}/login.html`;
    } else {
        alert("Passwords don't match");
    }
};

registerForm.addEventListener("submit", addNewUser);
