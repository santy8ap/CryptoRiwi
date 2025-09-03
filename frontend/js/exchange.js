document.addEventListener("DOMContentLoaded", () => {
    // --- LOGOUT automático si entro a index.html ---
    if (window.location.pathname.endsWith("index.html")) {
        if (localStorage.getItem("isLoggedIn") == "true") {
            localStorage.clear();
        }
    }

    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "./login.html";
        return;
    }

    // --- Referencias a botones ---
    const authButtons = document.getElementById("auth-buttons");
    const loginBtn = document.getElementById("login-btn");
    const registerBtn = document.getElementById("register-btn"); 
    const homeBtn = document.getElementById("home-btn");
    const aboutUsBtn = document.getElementById("aboutus-btn");
    const educationBtn = document.getElementById("education-btn");
    const exchangeBtn = document.getElementById("exchange-btn");
    const walletBtn = document.getElementById("wallet-btn");

    console.log("Valor de isLoggedIn en localStorage:", localStorage.getItem("isLoggedIn"));

    // --- Control Login / Logout ---
    if (localStorage.getItem("isLoggedIn") == "true") {
        authButtons.innerHTML = `<button id="logout-btn" class="btn btn-outline-light" type="button">Logout</button>`;
        const logoutBtn = document.getElementById("logout-btn");
        if (logoutBtn) {
            logoutBtn.addEventListener("click", () => {
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("user");
                window.location.href = "./index.html";
            });
        }
    }

    // --- Navegación de la navbar ---
    if (aboutUsBtn){
        aboutUsBtn.addEventListener("click", () => {
            window.location.href = "./about_us.html";
        });
    }

    if (homeBtn){
        homeBtn.addEventListener("click", () => {
            window.location.href = "./dashboard.html";
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

    if (walletBtn) {
        walletBtn.addEventListener("click", () => {
            window.location.href = "./wallet.html";
        });
    }

    // --- Función para crear TradingView Widget ---
    function loadTradingView(symbol) {
        document.getElementById("tradingview_chart").innerHTML = ""; // limpiar antes de crear otro
        new TradingView.widget({
            "container_id": "tradingview_chart",
            "autosize": true,
            "symbol": symbol,
            "interval": "1",
            "timezone": "Etc/UTC",
            "theme": "dark",
            "style": "1",
            "locale": "es",
            "enable_publishing": false,
            "studies": ["Volume@tv-basicstudies"],
            "withdateranges": true,
            "range": "1D"
        });
    }

    // --- Render inicial con BTC ---
    loadTradingView("BINANCE:BTCUSDT");

    // --- Listener del selector ---
    const cryptoSelect = document.getElementById("crypto-select");
    if (cryptoSelect) {
        cryptoSelect.addEventListener("change", (e) => {
            loadTradingView(e.target.value);
        });
    }
});
