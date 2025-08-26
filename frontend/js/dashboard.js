document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");

  console.log("Valor de isLoggedIn en localStorage:", localStorage.getItem("isLoggedIn"));

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        window.location.href = "./login.html";
      });
    }
  });
