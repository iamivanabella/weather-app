const form = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');
const weatherInfo = document.getElementById('weather-info');

const apiKey = '4d442e26836b4793aaa24210242302'; // Replace with your WeatherAPI key

form.addEventListener('submit', e => {
    e.preventDefault();
    const location = locationInput.value;

    getWeather(location)
        .then(data => {
            displayWeather(data);
        })
        .catch(err => {
            console.error(err);
            weatherInfo.innerHTML = '<p>Something went wrong. Please try again later.</p>';
        });
});

async function getWeather(location) {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`);
    if (!response.ok) {
        throw new Error('Unable to fetch weather data');
    }
    const data = await response.json();
    return data;
}

function displayWeather(data) {
    const { location, current } = data;
    weatherInfo.innerHTML = `
        <h2>${location.name}, ${location.country}</h2>
        <div>Temperature: ${current.temp_c}°C / ${current.temp_f}°F</div>
        <div>Condition: ${current.condition.text}</div>
        <div>Humidity: ${current.humidity}%</div>
    `;
}
