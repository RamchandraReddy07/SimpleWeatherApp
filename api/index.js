const axios = require('axios');
const express = require('express');
const path = require('path');
const app = express();
const cors = require("cors");
const winston = require('winston');
require('dotenv').config({path:'config.env'});

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(express.json());

const API_KEY = process.env.API_KEY;
console.log("API KEY",API_KEY);
app.get("/api/getWeather", async (req, res) => {
  const { city } = req.query; // Capture city from query parameters
  const API_KEY = process.env.API_KEY;
  if (!city) return res.status(400).json({ error: 'City is required' });
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  
  try {
    const response = await axios.get(url);
    res.json(response.data); // Respond with the weather data
    //logger.info("Succesfully called API");
  } catch (error) {
    //logger.error('Error fetching weather data:', error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Export the app for Vercel
module.exports = app; 