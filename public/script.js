

const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let inputVal = input.value.trim();
  msg.textContent = ""; // Clear previous messages

  // Check if input is empty
  if (!inputVal) {
    msg.textContent = "Please enter a city name!";
    return;
  }

  // apiUrl=window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://simple-weather-app-taupe.vercel.app/weather'
  // const url = `${apiUrl}/api/getWeather?city=${encodeURIComponent(inputVal)}`;

  // try {
  //   const response = await fetch(url);
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`); // Handle non-200 responses
  //   }

  //   const data = await response.json();
  //   // Process and display the weather data here...
  // } catch (error) {
  //   msg.textContent = "Please search for a valid city 😩"; // Handle errors gracefully
  //   console.error(error);
  // }

//   const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000' : 'https://simple-weather-app-taupe.vercel.app';
// const url = `${apiUrl}/api/getWeather?city=${encodeURIComponent(inputVal)}`;

// fetch(url)
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.text(); // Get the response as text
//   })
//   .then((text) => {
//     console.log("Raw response text:", text); // Log the raw response text
//     return JSON.parse(text); // Parse it as JSON
//   })
//   .then((data) => {
//     const { main, name, sys, weather } = data;
//     console.log("API DATA", data);

//     // Render the weather data
//     const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
//     const li = document.createElement("li");
//     li.classList.add("city");
//     const closeButton = `<button class="close-btn" aria-label="Close">&times;</button>`;
//     const markup = `
//       <h2 class="city-name" data-name="${name},${sys.country}">
//         <span>${name}</span>
//         <sup>${sys.country}</sup>
//       </h2>
//       <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
//       <figure>
//         <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
//         <figcaption>${weather[0]["description"]}</figcaption>
//       </figure>
//     `;
//     li.innerHTML = markup;
//     list.appendChild(li);
//   })
//   .catch((error) => {
//     console.error("Error fetching weather data:", error);
//     msg.textContent = "Please search for a valid city 😩"; // Display error message
//   });



  const apiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3002' : 'https://simple-weather-app-taupe.vercel.app';
  const url = `${apiUrl}/api/getWeather?city=${encodeURIComponent(inputVal)}`;

  try {
    const response = await fetch(url);
    console.log("Weather API Respnsee",response);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    // Destructure the data for weather details
    const { main, name, sys, weather } = data;
    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

    // Create a new tile (li element) for the weather data
    const li = document.createElement("li");
    li.classList.add("city");

    // Markup for the weather data and the close button
    const markup = `
      <button class="close-btn" aria-label="Close">&times;</button>
      <h2 class="city-name" data-name="${name},${sys.country}">
        <span>${name}</span>
        <sup>${sys.country}</sup>
      </h2>
      <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
      <figure>
        <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
        <figcaption>${weather[0]["description"]}</figcaption>
      </figure>
    `;
    
    li.innerHTML = markup;
    list.appendChild(li);

    // Add the close button functionality for this specific tile
    li.querySelector(".close-btn").addEventListener("click", () => {
      li.remove();
    });
  } catch (error) {
    msg.textContent = "Please search for a valid city 😩";
    console.error(error);
  }

  form.reset();
  input.focus();
});


