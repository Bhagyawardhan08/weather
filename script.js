const apiKey = "a17d4899a3efd41e053857d558efc10f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector("#inputbox");
const searchBtn = document.querySelector("#searchBtn");
const weather_icon = document.querySelector(".weather-icon");

document.addEventListener("DOMContentLoaded", function() {
    // Initialize the Google Maps Places Autocomplete
    const autocomplete = new google.maps.places.Autocomplete(searchBox, {
        types: ['(cities)']
    });

    searchBtn.addEventListener("click", () => {
        const city = searchBox.value.trim();
        if (city) {
            checkWeather(city);
        } else {
            console.error('Please enter a city name');
            alert('Please enter a city name');
        }
    });
});

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + '&appid=' + apiKey);
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();

        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        const weatherCondition = data.weather[0].main.toLowerCase();
        updateWeatherIcon(weatherCondition);

        document.querySelector(".weather").style.display = "block";
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again later.');
    }
}

function updateWeatherIcon(condition) {
    const iconMapping = {
        "clouds": "images/cloudy-day.png",
        "clear": "images/sun.png",
        "rain": "images/raining.png",
        "mist": "images/mist.png",
        "drizzle": "images/drizzle.png",
        // Add more conditions as needed
    };

    weather_icon.src = iconMapping[condition] || "images/default.png"; // Fallback to a default icon if condition is not mapped
}
