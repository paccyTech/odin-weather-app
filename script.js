function fetchWeatherData(cityName) {
    const apiKey = "3dcb69ea955cc69e431eeb2a02c944c4";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
  
    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error("Error fetching data:", error);
        return null;
      });
  }
  
  function processWeatherData(data) {
    if (!data) return null;
  
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;
  
    return { temperature, weatherDescription };
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const weatherForm = document.getElementById("weatherForm");
    const cityInput = document.getElementById("cityInput");
    const weatherInfo = document.getElementById("weatherInfo");
  
    weatherForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const cityName = cityInput.value.trim();
  
      if (!cityName) {
        alert("Please enter a city name.");
        return;
      }
  
      weatherInfo.innerHTML = "Loading...";
  
      fetchWeatherData(cityName)
        .then(data => {
          const weatherData = processWeatherData(data);
          if (weatherData) {
            weatherInfo.innerHTML = `
              <p>Temperature: ${weatherData.temperature} °C</p>
              <p>Weather: ${weatherData.weatherDescription}</p>
            `;
          } else {
            weatherInfo.innerHTML = "<p>Failed to fetch weather data.</p>";
          }
        });
    });
  });
  