
const weatherContainer = document.querySelector("#weather-container");

async function getWeather() {
    const url = "https://api.open-meteo.com/v1/forecast?latitude=-20.3155&longitude=-40.3128&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=America%2FSao_Paulo";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Weather data could not be loaded.");
        }

        const data = await response.json();
        const current = data.current;

        const weatherDescriptions = {
            0: "Clear sky ☀️",
            1: "Mainly clear 🌤️",
            2: "Partly cloudy ⛅",
            3: "Overcast ☁️",
            45: "Foggy 🌫️",
            48: "Foggy 🌫️",
            51: "Light drizzle 🌦️",
            53: "Drizzle 🌦️",
            55: "Heavy drizzle 🌧️",
            61: "Light rain 🌧️",
            63: "Moderate rain 🌧️",
            65: "Heavy rain 🌧️",
            80: "Rain showers 🌦️",
            81: "Rain showers 🌧️",
            82: "Heavy rain showers ⛈️",
            95: "Thunderstorm ⛈️",
            96: "Thunderstorm with hail ⛈️",
            99: "Thunderstorm with hail ⛈️"
        };

        const description =
            weatherDescriptions[current.weather_code] || "Weather information unavailable";

        weatherContainer.innerHTML = `
            <h3>Vitória, Espírito Santo</h3>
            <p class="temperature">${Math.round(current.temperature_2m)}°C</p>
            <p>${description}</p>
            <p>Feels like: ${Math.round(current.apparent_temperature)}°C</p>
            <p>Humidity: ${current.relative_humidity_2m}%</p>
            <p>Wind: ${current.wind_speed_10m} km/h</p>
            <p class="weather-time">Updated: ${current.time.replace("T", " ")}</p>
            <p class="weather-credit">
                Weather data by
                <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer">Open-Meteo</a>
            </p>
        `;

    } catch (error) {
        console.error("Weather error:", error);
        weatherContainer.textContent =
            "Weather information is currently unavailable.";
    }
}

getWeather();
