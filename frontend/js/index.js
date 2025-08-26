document.addEventListener("DOMContentLoaded", () => {
    const loginBtn = document.getElementById("login-btn");
    const registerBtn = document.getElementById("register-btn"); 

    console.log("Valor de isLoggedIn en localStorage:", localStorage.getItem("isLoggedIn"));

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
        window.location.href = "./login.html";
      });
    }

    if (registerBtn) {
        registerBtn.addEventListener("click", () => {
        window.location.href = "./register.html";
      });
    }
});