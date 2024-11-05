

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

  const url = `/api/getWeather?city=${encodeURIComponent(inputVal)}`; // Correct URL formation

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`); // Handle non-200 responses
    }

    const data = await response.json();
    // Process and display the weather data here...
  } catch (error) {
    msg.textContent = "Please search for a valid city 😩"; // Handle errors gracefully
    console.error(error);
  }

  form.reset();
  input.focus();
});
