import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bcrypt from 'bcrypt';  
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../frontend')));

app.use("/styles", express.static(path.join(__dirname, "..", "styles")));

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1035854944x',
    database: "CryptoRiwi"
});

db.connect(err => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL');
});


// Register route
app.post("/register", async (req, res) => {
    try {
        const { first_name, last_name, email, password } = req.body;

        // Check if all fields are filled
        if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

        // Check if user already exists
        const [rows] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length > 0) {
            return res.status(400).json({ success: false, message: "Email already in use" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        await db.promise().query("INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)", [
            first_name,
            last_name,
            email,
            hashedPassword,
            "user"
        ]);

        return res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({ success: false, message: "Server error"})
    }
});


// Login route

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and password are required" });
        }

        // Find user by email
        const [rows] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);
        if (rows.length === 0) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        const user = rows[0];

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: "Invalid credentials" });
        }

        return res.json({ success: true, message: "Login successful", user: {id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email, role: user.role} });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
});


app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dashboard.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'login.html'));
});

app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'register.html'));
});

app.get('/courses', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'courses.hmtl'));
})

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});