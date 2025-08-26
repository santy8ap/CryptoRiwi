# 💰 CryptoRiwi

![Crypto Logo](https://img.shields.io/badge/CryptoRiwi-Beta-blueviolet?style=for-the-badge&logo=bitcoin)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-In_Progress-yellow?style=for-the-badge)

**CryptoRiwi** es una aplicación web educativa que simula una **plataforma de criptomonedas**.  
Permite a los usuarios **registrarse, administrar una billetera ficticia, ver el precio del Bitcoin en tiempo real y realizar transacciones simuladas** como comprar, vender y hacer intercambios.  

> ⚡ Proyecto desarrollado como parte del **Proyecto Integrador - CodeUp Riwi 2025**.  

---

## 🚀 Características

- 🔐 **Autenticación de usuarios** (registro e inicio de sesión).
- 👛 **Billetera virtual** con saldo inicial ficticio.
- 💸 **Simulación de transacciones** (compra, venta, depósitos, retiros).
- 📈 **Precio de Bitcoin en tiempo real** usando la API de [CoinGecko](https://docs.coingecko.com/docs/10-mins-tutorial-guide).
- 🛒 **Intercambio de productos/servicios** ficticios dentro de la plataforma.
- 📜 **Historial de transacciones** por usuario.
- 🎨 **Interfaz moderna** con Bootstrap 5.

---

## 🛠️ Tecnologías Utilizadas

- **Frontend:** HTML5, CSS3, JavaScript, Bootstrap 5  
- **Backend:** Node.js + Express  
- **Base de datos:** MySQL  
- **API Externa:** CoinGecko (para precio del BTC en tiempo real)  
- **Control de versiones:** Git + GitHub  
- **Metodología:** SCRUM con Azure DevOps  

---

## 📂 Estructura del Proyecto

```bash
CryptoRiwi/
├── server.js          # Servidor Express con CRUD
├── package.json       # Dependencias Node
├── public/
│   ├── index.html     # Frontend principal
│   ├── css/           # Estilos
│   └── js/            # Scripts frontend
├── sql/
│   └── schema.sql     # Script de base de datos
└── README.md          # Documentación
```

##📦 Instalación y Uso
🔹 Prerrequisitos

Node.js
 v16+

MySQL
 8+

Navegador moderno (Chrome, Edge, Firefox)

🔹 Pasos

Clonar repositorio:

git clone https://github.com/tuusuario/CryptoRiwi.git
cd CryptoRiwi


Instalar dependencias:

npm install


Configurar base de datos MySQL:

Crear la base de datos ejecutando sql/schema.sql.

Ajustar credenciales en server.js.

Ejecutar servidor:

nodemon server.js


Abrir en navegador:

http://localhost:3000

📖 Documentación Técnica

📌 Objetivo general: Desarrollar una aplicación web educativa que permita a los usuarios simular el uso de criptomonedas.

📌 Alcance: Registro, autenticación, billetera virtual, transacciones ficticias y visualización de precios.

📌 Historias de usuario:

Como usuario, quiero registrarme para tener mi propia billetera.

Como usuario, quiero ver el precio de BTC en tiempo real.

Como usuario, quiero comprar y vender Bitcoin ficticio.

Como usuario, quiero ver mi historial de transacciones.


```

CREATE DATABASE CryptoRiwi;
USE CryptoRiwi;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user'
);

CREATE TABLE wallet (
    wallet_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    balance DECIMAL(18, 8) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    wallet_id INT NOT NULL,
    type ENUM('deposit', 'withdrawal', 'purchase', 'reward', 'transfer', 'exchange') NOT NULL,
    amount DECIMAL(18, 8) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wallet_id) REFERENCES wallet(wallet_id) ON DELETE CASCADE
);

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type ENUM('course', 'ebook', 'subscription', 'event', 'merchandise', 'service') NOT NULL,
    cost DECIMAL(18, 8) NOT NULL
);

CREATE TABLE exchanges (
    exchange_id INT AUTO_INCREMENT PRIMARY KEY,
    wallet_id INT NOT NULL,
    product_id INT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wallet_id) REFERENCES wallet(wallet_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

CREATE TABLE crypto_price(
    cryptoPrice_id INT AUTO_INCREMENT PRIMARY KEY,
    crypto_name VARCHAR(100) NOT NULL,
    crypto_price DECIMAL(18, 8) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (first_name, last_name, email, password, role) VALUES ('Jose', 'Monsalve', 'jose@mail.com', '1035854944x', 'admin');

INSERT INTO wallet (user_id, balance) VALUES (1, 99999999.99);

INSERT INTO transactions (wallet_id, type, amount) VALUES (1, 'reward', 9999999999.99);

INSERT INTO products (name, type, cost) VALUES ('Python Full Course', 'course', 100000);

INSERT INTO exchanges (wallet_id, product_id) VALUES (1, 1);

INSERT INTO crypto_price (crypto_name, crypto_price) VALUES ('Riwicoin', 1000000000); CREATE DATABASE CryptoRiwi;
USE CryptoRiwi;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    role ENUM('admin', 'user') DEFAULT 'user'
);

CREATE TABLE wallet (
    wallet_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    balance DECIMAL(18, 8) NOT NULL DEFAULT 0.00,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    wallet_id INT NOT NULL,
    type ENUM('deposit', 'withdrawal', 'purchase', 'reward', 'transfer', 'exchange') NOT NULL,
    amount DECIMAL(18, 8) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wallet_id) REFERENCES wallet(wallet_id) ON DELETE CASCADE
);

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    type ENUM('course', 'ebook', 'subscription', 'event', 'merchandise', 'service') NOT NULL,
    cost DECIMAL(18, 8) NOT NULL
);

CREATE TABLE exchanges (
    exchange_id INT AUTO_INCREMENT PRIMARY KEY,
    wallet_id INT NOT NULL,
    product_id INT NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (wallet_id) REFERENCES wallet(wallet_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

CREATE TABLE crypto_price(
    cryptoPrice_id INT AUTO_INCREMENT PRIMARY KEY,
    crypto_name VARCHAR(100) NOT NULL,
    crypto_price DECIMAL(18, 8) NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (first_name, last_name, email, password, role) VALUES ('Jose', 'Monsalve', 'jose@mail.com', '1035854944x', 'admin');

INSERT INTO wallet (user_id, balance) VALUES (1, 99999999.99);

INSERT INTO transactions (wallet_id, type, amount) VALUES (1, 'reward', 9999999999.99);

INSERT INTO products (name, type, cost) VALUES ('Python Full Course', 'course', 100000);

INSERT INTO exchanges (wallet_id, product_id) VALUES (1, 1);

INSERT INTO crypto_price (crypto_name, crypto_price) VALUES ('Riwicoin', 1000000000);
```


👨‍💻 Autores

Proyecto creado por Equipo CryptoRiwi ✨

Santiago Ochoa Posso (DevOps - Clan Hooper)

Braian Cardona Bermudez (Developer - Clan Hooper)

Maria Jose Agudelo Ocampo (Scrum Manager, Product Owner - Clan Linux)

Jose Manuel Gustamante (Developer - Clan Hooper)
