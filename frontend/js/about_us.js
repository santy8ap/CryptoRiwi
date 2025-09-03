document.addEventListener("DOMContentLoaded", () => {
    const authButtons = document.getElementById("auth-buttons");
    const loginBtn = document.getElementById("login-btn");
    const registerBtn = document.getElementById("register-btn"); 
    const homeBtn = document.getElementById("home-btn");
    const aboutUsBtn = document.getElementById("aboutus-btn");
    const educationBtn = document.getElementById("education-btn");
    const exchangeBtn = document.getElementById("exchange-btn");
    const ctaRegisterCard = document.getElementById("cta-register");
    const ctaRegisterBtn = document.getElementById("ctaregister-btn");
    const walletBtn = document.getElementById("wallet-btn");

    console.log("Valor de isLoggedIn en localStorage:", localStorage.getItem("isLoggedIn"));

    if (localStorage.getItem("isLoggedIn") == "true"){
        authButtons.innerHTML = `<button id="logout-btn" class="btn btn-outline-light" type="button">Logout</button>`;
        const logoutBtn = document.getElementById("logout-btn");
        ctaRegisterCard.style.display = "none";
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("user");
                window.location.href = "./index.html";
            });
        }
    }

    if (homeBtn){
        if(localStorage.getItem("isLoggedIn") == "true"){
            homeBtn.addEventListener("click", () => {
                window.location.href = "./dashboard.html";
            });
        }
        else{
            homeBtn.addEventListener("click", () => {
                window.location.href = "./index.html";
            });
        }
    }

    if (aboutUsBtn) {
        aboutUsBtn.addEventListener("click", () => {
            window.location.href = "./about_us.html";
        });
    }

    if (educationBtn) {
        educationBtn.addEventListener("click", () => {
            window.location.href = "./courses.html";
        });
    }

    if (exchangeBtn) {
        exchangeBtn.addEventListener("click", () => {
            window.location.href = "./exchange.html";
        });
    }

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
    
    if (ctaRegisterBtn) {
        ctaRegisterBtn.addEventListener("click", () => {
            window.location.href = "./register.html";
        });
    }

    if (walletBtn) {
        walletBtn.addEventListener("click", () => {
            window.location.href = "./wallet.html";
        });
    }
});