document.addEventListener("DOMContentLoaded", () => {
<<<<<<< HEAD
=======
    if (window.location.pathname.endsWith("index.html")) {
        if (!localStorage.getItem("isLoggedIn")) {
            localStorage.clear();
        }
    }

>>>>>>> feature/aboutus
    const loginBtn = document.getElementById("login-btn");
    const registerBtn = document.getElementById("register-btn"); 

    console.log("Valor de isLoggedIn en localStorage:", localStorage.getItem("isLoggedIn"));

    if (loginBtn) {
        loginBtn.addEventListener("click", () => {
<<<<<<< HEAD
        window.location.href = "./login.html";
      });
=======
            window.location.href = "./login.html";
        });
>>>>>>> feature/aboutus
    }

    if (registerBtn) {
        registerBtn.addEventListener("click", () => {
<<<<<<< HEAD
        window.location.href = "./register.html";
      });
    }
});
=======
            window.location.href = "./register.html";
        });
    }
});
>>>>>>> feature/aboutus
