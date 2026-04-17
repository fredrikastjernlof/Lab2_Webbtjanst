//Importerar paket
const express = require('express');
const { Client } = require('pg');
require('dotenv').config();
const cors = require('cors');

// Variabel för att koppla upp mot databasen
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    ssl: {
        rejectUnauthorized: false //Nödvändigt för databas genererad av Render, annars kan det leda till SSL-fel
    },
});

// Koppla upp mot db
client.connect()
  .then(() => console.log("Connected to database!"))
  .catch(err => console.error("Error connecting to the database:", err));

// Expressinstans
const app = express();

// Middlewares
app.use(cors()); // Tillåter cross-origin
app.use(express.json()); // Parsa JSON-body

// Test-route
app.get('/', (req, res) => {
    res.send('API is running, yippee-ki-yay, motherfu**er!🚀');
});

// Starta servern
app.listen(process.env.PORT, () => console.log (`Server started, using port ${process.env.PORT}`));