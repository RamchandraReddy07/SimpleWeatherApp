/*SEARCH BY USING A CITY NAME (e.g. athens) OR A COMMA-SEPARATED CITY NAME ALONG WITH THE COUNTRY CODE (e.g. athens,gr)*/
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");


form.addEventListener("submit", e => {
  e.preventDefault();
  let inputVal = input.value;
    console.log("Submit Button Pressed");
  //check if there's already a city
  const listItems = list.querySelectorAll(".ajax-section .city");
  const listItemsArray = Array.from(listItems);

  if (listItemsArray.length > 0) {
    const filteredArray = listItemsArray.filter(el => {
      let content = "";
      //athens,gr
      if (inputVal.includes(",")) {
    
        if (inputVal.split(",")[1].length > 2) {
          inputVal = inputVal.split(",")[0];
          content = el
            .querySelector(".city-name span")
            .textContent.toLowerCase();
        } else {
          content = el.querySelector(".city-name").dataset.name.toLowerCase();
        }
      } else {
        //athens
        content = el.querySelector(".city-name span").textContent.toLowerCase();
      }
      return content == inputVal.toLowerCase();
    });

    if (filteredArray.length > 0) {
      msg.textContent = `You already know the weather for ${
        filteredArray[0].querySelector(".city-name span").textContent
      } ...otherwise be more specific by providing the country code as well 😉`;
      form.reset();
      input.focus();
      return;
    }
  }

 

const apiUrl = window.location.hostname === 'localhost'
  ? 'http://localhost:3000/api/weather' // Local development URL
  : 'https://simple-weather-app-taupe.vercel.app/api/weather';


console.log();
console.log("API URl local",apiUrl);
const url = `${apiUrl}?city=${inputVal}`;
console.log("URL",url);
fetch(url)
  // .then(response => response.json())
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`); // Check if the response is OK
    }
    return response.text(); // Get the response as text
  })
  .then(text => {
    console.log("Raw response text:", text); // Log the raw response text
    return JSON.parse(text); // Try parsing it as JSON
  })
  .then(data => {
    const { main, name, sys, weather } = data;
    console.log("API DATA",data);
    // Render the weather data as before
    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${
      weather[0]["icon"]
    }.svg`;

    const li = document.createElement("li");
    li.classList.add("city");
    const markup = `
      <h2 class="city-name" data-name="${name},${sys.country}">
        <span>${name}</span>
        <sup>${sys.country}</sup>
      </h2>
      <div class="city-temp">${Math.round(main.temp)}<sup>°C</sup></div>
      <figure>
        <img class="city-icon" src="${icon}" alt="${
      weather[0]["description"]
    }">
        <figcaption>${weather[0]["description"]}</figcaption>
      </figure>
    `;
    li.innerHTML = markup;
    list.appendChild(li);
  })
  .catch((error) => {
    console.error("Error fetching weather data:", error); 
    msg.textContent = "Please search for a valid city 😩";
  });

  msg.textContent = "";
  form.reset();
  input.focus();
});