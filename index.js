const mysql = require('mysql2');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const bcrypt = require('bcrypt'); // Add bcrypt for password hashing

const app = express();

// MySQL connection pool

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Abhinav',
    database: 'industry',
    connectionLimit: 10
});


// Middleware
app.use(bodyParser.json()); // for parsing application/json
app.use(express.static(path.join(__dirname, 'public')));

// Set up multer for handling file uploads
const upload = multer();

// Routes
app.get("/", (req, res) => {
    console.log("Serving login.html");
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Handle stock and challan (no file upload needed here)
app.post("/store/add-stock-and-challan", (req, res) => {
    console.log("Received stock and challan data:", req.body);
    res.send({ message: "Data Received" });
});

// Handle PPC form submission (no file upload needed here)
app.post("/submit-ppc", (req, res) => {
    console.log("Received PPC data:", req.body);
    res.send({ message: "Data Received" });
});

// Handle purchase form submission (no file upload needed here)
app.post("/submit-purchase", (req, res) => {
    console.log("Received purchase data:", req.body);
    res.send({ message: "Data Received" });
});

// Handle product form with file upload (multer for form-data)
app.post("/cdg/add-product", upload.single('uploadBOM'), (req, res) => {
    console.log("Received product data:", req.body);
    const bomFile = req.file;  // Uploaded BOM file

    console.log("Uploaded BOM File:", bomFile);  // This will log file details

    res.send({ message: "Product added successfully!" });
});

// Register route
app.post("/register", (req, res) => {
    const { username, email, password } = req.body;
    console.log("Registering user with data:", { username, email, password });

    // Hash the password before storing
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error("Error hashing password:", err);
            return res.status(500).send({ message: "Error hashing password" });
        }

        console.log("Hashed password:", hashedPassword);

        // Check if the user already exists
        pool.query('SELECT * FROM Login WHERE Email = ?', [email], (err, results) => {
            if (err) {
                console.error("Database error during registration check:", err);
                return res.status(500).send({ message: "Database error" });
            }

            if (results.length > 0) {
                console.log("User already exists:", { email });
                return res.status(409).send({ message: "User already exists" });
            }

            // Insert the new user into the database
            pool.query('INSERT INTO Login (Username, Email, Password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err, results) => {
                if (err) {
                    console.error("Database error during registration:", err);
                    return res.status(500).send({ message: "Database error" });
                }

                console.log("User registered successfully:", { username, email });
                res.status(200).send({ message: "Registration successful" });
            });
        });
    });
});

// Login route
app.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log("Login attempt with data:", { email, password });

    // Fetch user from database
    pool.query('SELECT * FROM Login WHERE Email = ?', [email], (err, results) => {
        if (err) {
            console.error("Database error during login check:", err);
            return res.status(500).send({ message: "Database error" });
        }

        if (results.length === 0) {
            console.log("Invalid email or password:", { email });
            return res.status(401).send({ message: "Invalid email or password" });
        }

        const user = results[0];

        // Compare password
        bcrypt.compare(password, user.Password, (err, isMatch) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                return res.status(500).send({ message: "Error comparing passwords" });
            }

            if (isMatch) {
                console.log("Login successful for:", user);
                return res.status(200).json({ redirectTo: '/Main1.html' });
            } else {
                console.log("Invalid login attempt:", { email });
                return res.status(401).json({ message: "Invalid email or password" });
            }
        });
    });
});

// Server Listening
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
