
const weatherContainer = document.querySelector("#weather-container");
const spotlightsContainer = document.querySelector("#spotlights-container");

// OPENWEATHERMAP API
const API_KEY = "161ea342636666dbe26b4af5987e2443";

const latitude = -20.3155;
const longitude = -40.3128;

async function getWeather() {
    const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`;

    try {
        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(currentUrl),
            fetch(forecastUrl)
        ]);

        if (!currentResponse.ok || !forecastResponse.ok) {
            throw new Error("Weather data could not be loaded.");
        }

        const currentData = await currentResponse.json();
        const forecastData = await forecastResponse.json();

        const current = currentData.main;
        const weather = currentData.weather[0];

        // Group forecast data by date
        const dailyForecast = {};

        forecastData.list.forEach(item => {
            const date = item.dt_txt.split(" ")[0];

            if (!dailyForecast[date]) {
                dailyForecast[date] = [];
            }

            dailyForecast[date].push(item);
        });

        // Get the next three days, excluding today
        const today = new Date().toLocaleDateString("en-CA", {
            timeZone: "America/Sao_Paulo"
        });

        const forecastDates = Object.keys(dailyForecast)
            .filter(date => date > today)
            .sort()
            .slice(0, 3);

        const forecastHTML = forecastDates.map(date => {
            const dayData = dailyForecast[date];

            const temperatures = dayData.map(item => item.main.temp);

            const minTemp = Math.round(Math.min(...temperatures));
            const maxTemp = Math.round(Math.max(...temperatures));

            const dateLabel = new Date(date + "T12:00:00")
                .toLocaleDateString("en-US", {
                    weekday: "long"
                });

            return `
                <div class="forecast-day">
                    <h4>${dateLabel}</h4>
                    <p>${minTemp}°C - ${maxTemp}°C</p>
                </div>
            `;
        }).join("");

        weatherContainer.innerHTML = `
            <h3>Vitória, Espírito Santo</h3>

            <p class="temperature">
                ${Math.round(current.temp)}°C
            </p>

            <p>${weather.description}</p>

            <p>Feels like: ${Math.round(current.feels_like)}°C</p>

            <p>Humidity: ${current.humidity}%</p>

            <p>Wind: ${currentData.wind.speed} m/s</p>

            <p class="weather-time">
                Updated: ${new Date().toLocaleTimeString("en-US")}
            </p>

            <h3>3-Day Forecast</h3>

            <div class="forecast-grid">
                ${forecastHTML}
            </div>

            <p class="weather-credit">
                Weather data by
                <a href="https://openweathermap.org/"
                   target="_blank"
                   rel="noopener noreferrer">
                   OpenWeatherMap
                </a>
            </p>
        `;

    } catch (error) {
        console.error("Weather error:", error);

        weatherContainer.textContent =
            "Weather information is currently unavailable.";
    }
}


// BUSINESS SPOTLIGHTS

async function getSpotlights() {
    try {
        const response = await fetch("data/members.json");

        if (!response.ok) {
            throw new Error("Members data could not be loaded.");
        }

        const data = await response.json();

        // Select only Gold and Silver members
        const qualifiedMembers = data.members.filter(member =>
            member.membership === 2 ||
            member.membership === 3
        );

        // Randomize members
        const shuffledMembers = [...qualifiedMembers];

        for (let i = shuffledMembers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));

            [shuffledMembers[i], shuffledMembers[j]] =
                [shuffledMembers[j], shuffledMembers[i]];
        }

        // Randomly display two or three members
        const numberOfMembers = 3;

        const selectedMembers =
            shuffledMembers.slice(0, numberOfMembers);

        // Display spotlight cards
        spotlightsContainer.innerHTML = selectedMembers.map(member => {

            const membershipLevel =
                member.membership === 3 ? "Gold Member" : "Silver Member";

            return `
                <article class="spotlight-card">

                    <img
                        src="images/${member.image}"
                        alt="${member.name} logo"
                        loading="lazy"
                    >

                    <h3>${member.name}</h3>

                    <p>${member.description}</p>

                    <p><strong>Phone:</strong> ${member.phone}</p>

                    <p><strong>Address:</strong> ${member.address}</p>

                    <p>
                        <strong>Membership:</strong>
                        ${membershipLevel}
                    </p>

                    <a href="${member.website}"
                       target="_blank"
                       rel="noopener noreferrer">
                       Visit Website
                    </a>

                </article>
            `;
        }).join("");

    } catch (error) {
        console.error("Spotlight error:", error);

        spotlightsContainer.textContent =
            "Business spotlights are currently unavailable.";
    }
}


// LOAD PAGE INFORMATION

getWeather();
getSpotlights();


