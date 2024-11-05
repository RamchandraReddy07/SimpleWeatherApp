const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require("cors");
const winston = require('winston');

dotenv.config({ path: 'config.env' });
const app = express();
const PORT = process.env.PORT || 3001; // Set the port here
const API_KEY = process.env.API_KEY;

// Configure Winston logger
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

console.log("API KEY",API_KEY);
// Middleware
app.use(cors());
app.use(express.json());
logger.info(API_KEY);
// Define your API route
app.get("/api/getWeather", async (req, res) => {
  const { city } = req.query; // Capture city from query parameters
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  
  try {
    const response = await axios.get(url);
    res.json(response.data); // Respond with the weather data
    logger.info("Succesfully called API");
  } catch (error) {
    logger.error('Error fetching weather data:', error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.get("/api/test", async(req, res) => {
  logger.info("In test method");
});

// // Start the server
// app.listen(PORT, () => {
//   logger.info(`Server running on port ${PORT}`);
// });
