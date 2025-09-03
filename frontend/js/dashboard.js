document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");
  const homeBtn = document.getElementById("home-btn");
  const aboutUsBtn = document.getElementById("aboutus-btn");
  const educationBtn = document.getElementById("education-btn");
  const exchangeBtn = document.getElementById("exchange-btn");
  const walletBtn = document.getElementById("wallet-btn");

  // nuevos: login y register
  const loginBtn = document.getElementById("login-btn");
  const registerBtn = document.getElementById("register-btn");

  console.log("Valor de isLoggedIn en localStorage:", localStorage.getItem("isLoggedIn"));

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  // --- mostrar / ocultar botones según estado ---
  if (isLoggedIn) {
    if (loginBtn) loginBtn.style.display = "none";
    if (registerBtn) registerBtn.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "inline-block";
  } else {
    if (loginBtn) loginBtn.style.display = "inline-block";
    if (registerBtn) registerBtn.style.display = "inline-block";
    if (logoutBtn) logoutBtn.style.display = "none";
  }

  // --- navegación ---
  if (homeBtn) {
    homeBtn.addEventListener("click", () => {
      window.location.href = isLoggedIn ? "./dashboard.html" : "./index.html";
    });
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
  
  if (walletBtn) {
    walletBtn.addEventListener("click", () => {
      window.location.href = "./wallet.html";
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("user");
      window.location.href = "./index.html";
    });
  }
});
