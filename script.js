let btn = document.querySelector("button")
let weather_icon = document.querySelector(".weather_icon")

let key=""  

let url = "https://api.openweathermap.org/data/2.5/weather?&units=metric"

let fetch_weather = async (city) => {
  // Clear previous data when searching for a new city
  clearWeatherDetails();

  try {
    let data = await fetch(url + `&appid=${key}` + `&q=${city}`);

    if (!data.ok) {
      throw new Error("City not found");
    }

    let jsonData = await data.json();
    console.log(jsonData);

    let name = jsonData.name;

    if (name) {
      // Display city name and weather details
      document.querySelector("h1").innerText = name;

      document.querySelector(".temperature").innerText = `${jsonData.main.temp} °C`;

      let weather = jsonData.weather[0].main;

      if (weather === "Clouds") {
        weather_icon.src = "./images/clouds.png";
      } else if (weather === "Rain") {
        weather_icon.src = "./images/rain.png";
      } else if (weather === "Haze") {
        weather_icon.src = "./images/haze.png";
      } else if (weather === "Drizzle") {
        weather_icon.src = "./images/drizzle.png";
      } else if (weather === "Mist") {
        weather_icon.src = "./images/mist.png";
      } else {
        weather_icon.src = "./images/sunny.png";
      }

      document.querySelector("#humidity").innerHTML = `Humidity: ${jsonData.main.humidity}%`;

      document.querySelector("#wind").innerHTML = `Wind Speed: ${jsonData.wind.speed} km/hr`;

      document.querySelector("#min_temp").innerText = `Min Temp: ${jsonData.main.temp_min} °C`;

      document.querySelector("#max_temp").innerText = `Max Temp: ${jsonData.main.temp_max} °C`;
    }
  } catch (error) {
    // Display error message if city is not found
    document.querySelector("h1").innerText = "City not found";
  }
};

// Function to clear the weather details

const clearWeatherDetails = () => {
  document.querySelector("h1").innerText = "";
  document.querySelector(".temperature").innerText = "";
  weather_icon.src = ""; // Clear weather icon
  document.querySelector("#humidity").innerText = "";
  document.querySelector("#wind").innerText = "";
  document.querySelector("#min_temp").innerText = "";
  document.querySelector("#max_temp").innerText = "";
};

// Initially fetch weather for Chennai
fetch_weather("chennai");

btn.addEventListener("click", () => {
  let input = document.querySelector("input").value;
  fetch_weather(input);
});
