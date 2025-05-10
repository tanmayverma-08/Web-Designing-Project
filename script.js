document.addEventListener("DOMContentLoaded", () => {
  const cityInput = document.getElementById("city-input");
  const getWeatherBtn = document.getElementById("get-weather-btn");
  const weatherInfo = document.getElementById("weather-info");
  const cityNameDisplay = document.getElementById("city-name");
  const temperatureDisplay = document.getElementById("temperature");
  const descriptionDisplay = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");
  //   const feelsLike = document.getElementById("feels-like");
  //   const humidity = document.getElementById("humidity");
  //   const windSpeed = document.getElementById("wind");
  //   const pressure = document.getElementById("pressure");
  //   const sunrise = document.getElementById("sunrise");
  //   const sunset = document.getElementById("sunset");

  const API_KEY = "444175ab7dfcbdd0f05b15a8ed885df6"; //env variables

  getWeatherBtn.addEventListener("click", async () => {
    const city = cityInput.value.trim();
    if (!city) return;

    // it may throw an error
    // server/database is always in another continent

    try {
      const weatherData = await fetchWeatherData(city);
      displayWeatherData(weatherData);
    } catch (error) {
      showError();
    }
  });

  async function fetchWeatherData(city) {
    //gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE", response);

    if (!response.ok) {
      throw new Error("City Not found");
    }
    const data = await response.json();
    return data;
  }

  function displayWeatherData(data) {
    // console.log(data);
    // const { name, main, weather } = data;
    // cityNameDisplay.textContent = name;
    // temperatureDisplay.textContent = `Temperature : ${main.temp}`;
    // descriptionDisplay.textContent = `Weather : ${weather[0].description}`;

    console.log(data);
    const { name, main, weather, wind, sys } = data;

    // Update existing elements
    cityNameDisplay.textContent = name;
    temperatureDisplay.textContent = `Temperature: ${main.temp}°C`;
    descriptionDisplay.textContent = `Weather: ${weather[0].description}`;
    // feelsLike = `Feels Like: ${main.feels_like}°C`;
    // humidity = `Humidity: ${main.humidity}%`;
    // windSpeed = `Wind Speed: ${wind.speed} m/s`;
    // pressure = `Pressure: ${main.pressure} hPa`;
    // sunrise = `Sunrise: ${convertUnixTime(sys.sunrise)}`;
    // sunset = `Sunset: ${convertUnixTime(sys.sunset)}`;

    //unlock the display
    weatherInfo.classList.remove("hidden");
    errorMessage.classList.add("hidden");

    updateBackground(weather[0].main);
  }

  function showError() {
    weatherInfo.classList.add("hidden");
    errorMessage.classList.remove("hidden");
  }

  function updateBackground(weatherMain) {
    let imageUrl = "";

    weatherMain = weatherMain.toLowerCase(); // lowercase for safe matching

    if (weatherMain.includes("clear")) {
      imageUrl = "./images/sunny.jpg";
    } else if (weatherMain.includes("cloud")) {
      imageUrl = "./images/cloudy.jpg";
    } else if (
      weatherMain.includes("rain") ||
      weatherMain.includes("drizzle")
    ) {
      imageUrl = "./images/rainy.jpg";
    } else if (weatherMain.includes("snow")) {
      imageUrl = "./images/snowy.jpg";
    } else if (weatherMain.includes("mist") || weatherMain.includes("fog")) {
      imageUrl = "./images/mist.jpg";
    } else if (weatherMain.includes("thunderstorm")) {
      imageUrl = "./images/thunderstorm.jpg";
    } else if (weatherMain.includes("haze")) {
      imageUrl = "./images/haze.jpg";
    } else {
      imageUrl = "./images/default.jpg"; // fallback
    }

    console.log("Setting background to:", imageUrl); // DEBUG

    document.body.style.backgroundImage = `url('${imageUrl}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.transition = "background-image 1s ease-in-out";
  }
});
