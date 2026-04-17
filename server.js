//Importerar paket
const express = require('express');
require('dotenv').config();
const cors = require('cors');

//Läser in routes
const workexperienceRoutes = require("./routes/workexperienceRoutes");

// Expressinstans
const app = express();

// Middlewares
app.use(cors()); // Tillåter cross-origin
app.use(express.json()); // Parsa JSON-body

//Routes
app.use("/workexperience", workexperienceRoutes);

// Test-route
app.get('/', (req, res) => {
    res.send('API is running, yippee-ki-yay, motherfu**er!🚀');
});

// Starta servern
app.listen(process.env.PORT, () => console.log (`Server started, using port ${process.env.PORT}`));

