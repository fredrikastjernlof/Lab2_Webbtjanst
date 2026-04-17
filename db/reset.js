// ⚠️ OBS: Detta script raderar tabellen "workexperience" och all befintlig data

// Import av nödvändiga moduler
const { Client } = require('pg');
require('dotenv').config();

// Skapa ny klient för att ansluta till databasen
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    ssl: {
        rejectUnauthorized: false
    },
});

async function createTable() {
    try {
        await client.connect();
        console.log("Connected to database!");

        await client.query(`
            DROP TABLE IF EXISTS workexperience;
            CREATE TABLE IF NOT EXISTS workexperience (
                id SERIAL PRIMARY KEY,
                companyname VARCHAR(255) NOT NULL,
                jobtitle VARCHAR(255) NOT NULL,
                location VARCHAR(255) NOT NULL,
                startdate DATE NOT NULL,
                enddate DATE,
                description TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);

        console.log("Table created!");
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.end();
        console.log("Connection closed");
    }
}

createTable();