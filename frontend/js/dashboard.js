document.addEventListener("DOMContentLoaded", () => {
  const authButtons = document.getElementById("auth-buttons");
  const loginBtn = document.getElementById("login-btn");
  const registerBtn = document.getElementById("register-btn");

  console.log("Valor de isLoggedIn en localStorage:", localStorage.getItem("isLoggedIn"));

  if (localStorage.getItem("isLoggedIn") === "true" && authButtons) {
    authButtons.style.display = "none";

    // Mostrar botón de logout en lugar de los de login/registro
    const navbar = document.querySelector(".navbar-nav");
    if (navbar) {
      const logoutBtn = document.createElement("button");
      logoutBtn.textContent = "Cerrar Sesión";
      logoutBtn.className = "btn btn-outline-custom ms-3";
      logoutBtn.onclick = () => {
        localStorage.removeItem("isLoggedIn");
        window.location.href = "./login.html";
      };
      navbar.appendChild(logoutBtn);
    }
  } else {
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
  }
});
