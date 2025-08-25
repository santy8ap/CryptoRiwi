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
      document.getElementById("login-message").textContent = "✅ Login exitoso!";
      document.getElementById("login-message").classList.remove("text-danger");
      document.getElementById("login-message").classList.add("text-success");
      // redirigir a dashboard
      window.location.href = "/dashboard.html";
    } else {
      document.getElementById("login-message").textContent = "❌ Credenciales incorrectas";
    }
  } catch (err) {
    console.error(err);
    document.getElementById("login-message").textContent = "⚠️ Error de servidor";
  }
});
