function fetchWeather(location) {
    var apiKey = 'c07408c48d94b627babdc57ec2fcf6d4'; // Replace with your actual API key
    var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=' + apiKey;

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
            var data = JSON.parse(xhr.responseText);
            updateUI(data);
        } else {
            console.error('Failed to fetch weather data: ' + xhr.statusText);
            // Handle error here
        }
    };
    xhr.onerror = function () {
        console.error('Failed to fetch weather data');
        // Handle error here
    };
    xhr.send();
}

function kelvinToCelsius(kelvin) {
    return kelvin - 273.15; // Convert Kelvin to Celsius
}

function updateUI(data) {
    var weatherIcon = document.getElementById('weatherIcon');
    var locationName = document.getElementById('locationName');
    var description = document.getElementById('description');
    var temperature = document.getElementById('temperature');
    var humidity = document.getElementById('humidity');

    weatherIcon.src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png';
    locationName.textContent = 'Weather in ' + data.name;
    description.innerHTML = `<img class="weather-icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather Icon"> ${data.weather[0].description}`;
    temperature.textContent = 'Temperature: ' + kelvinToCelsius(data.main.temp).toFixed(2) + ' °C'; // Convert temperature to Celsius
    humidity.textContent = 'Humidity: ' + data.main.humidity + '%';
}

document.getElementById('submitBtn').addEventListener('click', function () {
    var location = document.getElementById('locationInput').value;
    fetchWeather(location);
});
