require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());

// Enable CORS
app.use(cors({
origin: process.env.CLIENT_URL
}));

// Simple Route
app.get("/", (req, res) => {
    res.send("Welcome to the learning space.");
});

const codeOfPracticesRoutes = require('./routes/codeOfPractices');
app.use("/code-of-practices", codeOfPracticesRoutes);

let port = process.env.APP_PORT;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});