const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const cors = require('cors'); 

dotenv.config({ path: 'config.env' });
const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;
app.use(cors());
console.log(API_KEY);
app.get("/weather", async (req, res) => {
  console.log("Request",req);
  const { city } = req.query;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  try {
    const response = await axios.get(url);
    res.json(response.data);
    
  } catch (error) {
    console.log("error: ",error);
    res.status(500).json({ error: "Error fetching data" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
