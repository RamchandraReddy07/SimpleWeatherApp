const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require('cors'); 

dotenv.config({ path: 'config.env' });
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// app.use(cors({
//   origin: 'https://simple-weather-app-taupe.vercel.app/', // replace with your actual frontend origin
//   methods: ['GET', 'POST'], // specify allowed methods
//   allowedHeaders: ['Content-Type', 'Authorization'] // specify allowed headers if needed
// }));

// app.use(cors({
//   origin: ['https://weather-hbxk6mzvz-ramchandra-reddys-projects.vercel.app', 'http://localhost:3000'], // Add any other origins you might be using
// }));

app.use(cors());
app.use((req, res, next) => {
  console.log(`Received ${req.method} request for ${req.url}`);
  next();
});

console.log(API_KEY);
app.get("/api/weather", async (req, res) => {
//   console.log("Request",req);
  const { city } = req.query;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
    console.log("Response",res);
  } catch (error) {
    console.log("error: ",error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

module.exports = app; 
