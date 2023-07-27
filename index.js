const apiKey = "79a330e50f878b2c78188626d77f0471";
const input = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const error = document.getElementById("error");

// Fetch info from the url and displays the data
function checkWeather(url) {
  fetch(url)
    .then(async (res) => {
      if (res.status === 404) {
        error.style.display = "block";
      } else {
        const data = await res.json();
        error.style.display = "none";
        document.getElementById("cityName").innerHTML = data.name;
        document.getElementById("temperature").innerHTML =
          Math.round(data.main?.temp) + "°C";
        document.getElementById("humidity").innerHTML =
          data.main?.humidity + "%";
        document.getElementById("windSpeed").innerHTML =
          data.wind?.speed + "km/h";
        document.getElementById(
          "weatherIcon"
        ).src = `./assets/images/${data.weather[0].main.toLowerCase()}.png`;
      }
    })
    .catch((err) => {
      window.alert("Try Again!", err);
    });
}

// Call the main function
function showWeather() {
  checkWeather(
    `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${input.value}&appid=${apiKey}`
  );
}

// Show weather when btn is clicked
searchBtn.addEventListener("click", showWeather);

// Show weather when enter is clicked
window.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    showWeather();
  }
});

// Asses user location and display weather
function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Call the function to fetch weather for the user's location
        checkWeather(
          `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${apiKey}`
        );
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

getUserLocation();
