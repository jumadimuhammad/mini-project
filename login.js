/** @format */

const url = "https://5e8f22bbfe7f2a00165eeedf.mockapi.io/user";
const isLogin = document.querySelector("#login-form");

const login = async (event) => {
    event.preventDefault();
    const response = await fetch(url);
    const result = await response.json();

    const userName = document.querySelector("#userName").value;
    const password = document.querySelector("#password").value;

    let flag = false;
    let index = "";
    result.forEach((element) => {
        if (
            (userName == element.userName || userName == element.email) &&
            password == element.password
        ) {
            flag = true;
            index = element.id;
        }
    });

    if (flag) {
        localStorage.setItem("idUser", index)
        localStorage.setItem("isLogin", true);
        window.location.href = `${window.origin}/indexTrue.html`;
    } else {
        alert("Password atau username salah");
    }
};

isLogin.addEventListener("submit", login);
