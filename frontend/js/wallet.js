// ======= WALLET LOGIC =======
function generateAccountID() {
    const rand = Math.floor(Math.random() * 900000 + 100000);
    return "RWC-" + rand;
}

function saveWallet(wallet) {
    const user = JSON.parse(localStorage.getItem("user")); 
    if (user && user.email) {
        localStorage.setItem(`wallet_${user.email}`, JSON.stringify(wallet));
    }
}

function loadWallet() {
    const user = JSON.parse(localStorage.getItem("user")); 
    if (user && user.email) {
        const saved = localStorage.getItem(`wallet_${user.email}`);
        if (saved) return JSON.parse(saved);
        const newWallet = { id: generateAccountID(), balanceRWC: 1000, transactions: [] };
        saveWallet(newWallet);
        return newWallet;
    }
    return null;
}


// ====== Variables globales ======
let wallet = loadWallet();
const coinPrice = 0.05115;

function updateBalances() {
    document.getElementById("balance-rwc").textContent = wallet.balanceRWC;
    document.getElementById("balance-usd").textContent = "Value: $" + (wallet.balanceRWC * coinPrice).toFixed(2) + " USD";
    document.getElementById("wallet-id").textContent = "Account ID: " + wallet.id;
}

function renderTransactions() {
    const table = document.getElementById("transaction-table");
    table.innerHTML = "";
    if(wallet.transactions.length === 0) {
        table.innerHTML = `<tr><td colspan="4">No transactions yet</td></tr>`;
    } else {
        wallet.transactions.slice().reverse().forEach(tx => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${tx.date}</td><td>${tx.type}</td><td>${tx.amount}</td><td>$${tx.totalUSD}</td>`;
            table.appendChild(tr);
        });
    }
}

function addTransaction(type, amount) {
    const date = new Date().toLocaleString();
    const totalUSD = (amount * coinPrice).toFixed(2);
    wallet.transactions.push({ date, type, amount, totalUSD });
    saveWallet(wallet);
    renderTransactions();
}

// ====== Toast Message ======
function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.textContent = message;
    toast.style.position = "fixed";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.padding = "1rem 1.5rem";
    toast.style.borderRadius = "8px";
    toast.style.color = "white";
    toast.style.fontWeight = "600";
    toast.style.zIndex = "10000";
    toast.style.boxShadow = "0 4px 12px rgba(0,0,0,0.5)";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease, transform 0.3s ease";

    toast.style.backgroundColor = type === "success" ? "#28a745" : "#dc3545";

    document.body.appendChild(toast);
    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(-10px)";
    });

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(0)";
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ====== Modal ======
function openTransactionModal(type) {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0,0,0,0.6)";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "9999";

    const modal = document.createElement("div");
    modal.style.background = "var(--card-bg)";
    modal.style.backdropFilter = "blur(10px)";
    modal.style.padding = "2rem";
    modal.style.borderRadius = "16px";
    modal.style.minWidth = "300px";
    modal.style.maxWidth = "90%";
    modal.style.textAlign = "center";

    modal.innerHTML = `
        <h3>${type} RWC</h3>
        <input id="tx-amount" type="number" placeholder="Enter amount" min="1" class="form-control my-3"/>
        <div class="d-flex justify-content-center gap-2">
            <button id="confirm-btn" class="btn btn-success">Confirm</button>
            <button id="cancel-btn" class="btn btn-danger">Cancel</button>
        </div>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    overlay.querySelector("#confirm-btn").addEventListener("click", () => {
        const amount = parseFloat(document.getElementById("tx-amount").value);
        if (!isNaN(amount) && amount > 0) {
            if (type === "Deposit") {
                wallet.balanceRWC += amount;
                addTransaction(type, amount);
                updateBalances();
                saveWallet(wallet);
                showToast("Deposit successful!", "success");
                overlay.remove();
            } else if (type === "Withdraw") {
                if(amount > wallet.balanceRWC) {
                    showToast("Insufficient balance!", "error");
                } else {
                    wallet.balanceRWC -= amount;
                    addTransaction(type, amount);
                    updateBalances();
                    saveWallet(wallet);
                    showToast("Withdrawal successful!", "success");
                    overlay.remove();
                }
            }
        } else {
            showToast("Please enter a valid amount!", "error");
        }
    });

    overlay.querySelector("#cancel-btn").addEventListener("click", () => overlay.remove());
}

// ====== DOMContentLoaded ======
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("isLoggedIn") == "true") {
        updateBalances();
        renderTransactions();
    } else{
        window.location.href = "./login.html";
    }

    const depositBtn = document.getElementById("deposit-btn");
    const withdrawBtn = document.getElementById("withdraw-btn");

    if(depositBtn) depositBtn.addEventListener("click", () => openTransactionModal("Deposit"));
    if(withdrawBtn) withdrawBtn.addEventListener("click", () => openTransactionModal("Withdraw"));

    // ===== LOGIN / LOGOUT / NAVIGATION =====
    if (localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = "./login.html";
        return;
    }

    const authButtons = document.getElementById("auth-buttons");
    const loginBtn = document.getElementById("login-btn");
    const registerBtn = document.getElementById("register-btn");
    const homeBtn = document.getElementById("home-btn");
    const aboutUsBtn = document.getElementById("aboutus-btn");
    const educationBtn = document.getElementById("education-btn");
    const exchangeBtn = document.getElementById("exchange-btn");
    const walletBtn = document.getElementById("wallet-btn");
    const user = JSON.parse(localStorage.getItem("user"));

    if (localStorage.getItem("isLoggedIn") === "true" && user) {
        document.getElementById("user-name").innerHTML = user.first_name;
    } else {
        window.location.href = "./login.html";
    }

    if (authButtons) {
        authButtons.innerHTML = `<button id="logout-btn" class="btn btn-outline-light" type="button">Logout</button>`;
        document.getElementById("logout-btn").addEventListener("click", () => {
            localStorage.removeItem("isLoggedIn");
            localStorage.removeItem("user");
            window.location.href = "./index.html";
        });
    }

    if (aboutUsBtn) aboutUsBtn.addEventListener("click", () => window.location.href = "./about_us.html");
    if (homeBtn) homeBtn.addEventListener("click", () => window.location.href = "./dashboard.html");
    if (educationBtn) educationBtn.addEventListener("click", () => window.location.href = "./courses.html");
    if (exchangeBtn) exchangeBtn.addEventListener("click", () => window.location.href = "./exchange.html");
    if (loginBtn) loginBtn.addEventListener("click", () => window.location.href = "./login.html");
    if (registerBtn) registerBtn.addEventListener("click", () => window.location.href = "./register.html");
    if (walletBtn) walletBtn.addEventListener("click", () => window.location.href = "./wallet.html");
});
