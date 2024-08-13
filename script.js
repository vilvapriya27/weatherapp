function getWeather() {
    const apiKey = 'https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}';  // Replace with your OpenWeatherMap API key
    const city = document.getElementById('cityInput').value;
    const weatherResult = document.getElementById('weatherResult');

    if (city === '') {
        weatherResult.innerHTML = 'Please enter a city name.';
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod === '404') {
                weatherResult.innerHTML = 'City not found. Please try again.';
            } else {
                const temp = data.main.temp;
                const description = data.weather[0].description;
                const icon = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

                weatherResult.innerHTML = `
                    <p><img src="${icon}" alt="Weather icon"></p>
                    <p>Temperature: ${temp} °C</p>
                    <p>Condition: ${description}</p>
                `;
            }
        })
        .catch(error => {
            weatherResult.innerHTML = 'An error occurred. Please try again later.';
        });
}
