document.getElementById("register-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const first_name = document.getElementById("firstName").value;  
  const last_name = document.getElementById("lastName").value;    
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    document.getElementById("register-message").textContent = "Passwords do not match";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: first_name, 
        last_name: last_name,
        email,
        password
      }),
    });

    const data = await response.json();

    if (data.success) {
      document.getElementById("register-message").textContent = "Registration successful! Redirecting to login...";
      document.getElementById("register-message").classList.remove("text-danger");
      document.getElementById("register-message").classList.add("text-success");

      setTimeout(() => {
        window.location.href = "../frontend/login.html";
      }, 1500);
    } else {
      document.getElementById("register-message").textContent = "Error: " + data.message;
    }
  } catch (err) {
    console.error(err);
    document.getElementById("register-message").textContent = "Server error";
  }
});

// Manejo del botón "Back to Home"
const backBtn = document.getElementById("back-btn");
if (backBtn) {
  backBtn.addEventListener("click", () => {
    window.location.href = "./index.html";
  });
}