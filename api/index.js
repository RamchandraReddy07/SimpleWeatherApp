const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config({ path: 'config.env' });
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
const winston = require('winston');
// Middleware
console.log("API_KEY",process.env.API_KEY);
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),   

    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
  ],
});
app.use(cors());
app.use(express.json());

// Define your API route
app.get("/api/getWeather", async (req, res) => {
  const { city } = req.query; // Capture city from query parameters
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  
  try {
    const response = await axios.get(url);
    res.json(response.data); // Respond with the weather data
  } catch (error) {
    console.error('Error fetching weather data:', error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.get("/api/test", async(req,res)=>{
  console.log("In test mnethod");
})
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
