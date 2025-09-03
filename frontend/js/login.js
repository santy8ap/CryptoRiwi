document.getElementById("login-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success) {
  document.getElementById("login-message").textContent = "✅ Successful login!";
  document.getElementById("login-message").classList.remove("text-danger");
  document.getElementById("login-message").classList.add("text-success");

  localStorage.setItem("isLoggedIn", "true");
  localStorage.setItem("user", JSON.stringify(data.user));

  // Redirigir a dashboard
  window.location.href = "./dashboard.html";
} else {
      document.getElementById("login-message").textContent = "❌ Incorrect credentials";
    }
  } catch (err) {
    console.error(err);
    document.getElementById("login-message").textContent = "⚠️ Server error";
  }
});

// Manejo del botón "Back to Home"
const backBtn = document.getElementById("back-btn");
if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.location.href = "./index.html";
  });
}