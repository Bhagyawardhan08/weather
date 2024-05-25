const apiKey = "a17d4899a3efd41e053857d558efc10f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector("#inputbox");
const searchBtn = document.querySelector(".search button");
const weather_icon = document.querySelector(".weather-icon");

document.addEventListener("DOMContentLoaded", function() {
    const autocomplete = new google.maps.places.Autocomplete(document.getElementById('inputbox'), {
        types: ['geocode']
    });

    searchBtn.addEventListener("click", () => {
        const city = searchBox.value.trim();
        if (city) {
            checkWeather(city);
        } else {
            console.error('Please enter a city name'); // Debugging: Log if no city name is entered
            alert('Please enter a city name');
        }
    });
});

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + '&appid=' + apiKey);
        const data = await response.json();

        if (data.cod !== 200) {
            console.error('City not found'); // Debugging: Log if city not found
            alert('City not found. Please try again.');
            return;
        }

        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const weatherCondition = data.weather[0].main.toLowerCase();
        if (weatherCondition === "clouds") {
            weather_icon.src = "images/cloudy-day.png";
        } else if (weatherCondition === "clear") {
            weather_icon.src = "images/sun.png";
        } else if (weatherCondition === "rain") {
            weather_icon.src = "images/raining.png";
        } else if (weatherCondition === "mist") {
            weather_icon.src = "images/mist.png";
        } else if (weatherCondition === "drizzle") {
            weather_icon.src = "images/drizzle.png";
        } else {
            weather_icon.src = ""; // Default or unknown weather icon
        }

        document.querySelector(".weather").style.display = "block";
    } catch (error) {
        console.error('Error fetching weather data:', error); // Debugging: Log error if fetch fails
        alert('Error fetching weather data. Please try again later.');
    }
}