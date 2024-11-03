const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require('cors'); 
const winston = require('winston');
dotenv.config({ path: 'config.env' });
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

logger.info('This is an info message');
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

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});


// const corsOptions = {
//   credentials: true,
//   origin: allowedOrigins,
//   methods: 'GET, POST, PUT, DELETE',
//   allowedHeaders: 'Content-Type, Authorization, Cookie'
// };
app.use(cors());
app.use((req, res, next) => {
  logger.info(`Received ${req.method} request for ${req.url}`);
  next();
});

logger.info("API_KEY",API_KEY);
app.get("/api/weather", async (req, res) => {
  logger.info('Received weather request:', req.query);
  const { city } = req.query;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
    logger.info('Weather data fetched:', response.data);
  } catch (error) {
    logger.error('Error fetching weather data:', error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

module.exports = app; 
