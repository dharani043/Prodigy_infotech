
// Function to update images based on weather condition// Weather condition to image mapping
const weatherImages = {
    'clear': 'images/sunny.jpg',
    'clouds': 'images/cloudy.jpg',
    'rain': 'images/rainy.jpg',
    'snow': 'images/snowy.jpg',
    'thunderstorm': 'images/stormy.jpg',
    'drizzle': 'images/drizzle.jpg',
    'mist': 'images/misty.jpg',
    'smoke': 'images/smoky.jpg',
    'haze': 'images/hazy.jpg',
    'fog': 'images/foggy.jpg'
};

// Background images array
const backgroundImages = ['images/web1', 'images/web2', 'images/web3', 'images/web4', 'images/web5'];

// Function to get random background image
function getRandomBackground() {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    return backgroundImages[randomIndex];
}

// Function to update images based on weather
function updateImages(weatherCondition) {
    // Change background image
    const randomBg = getRandomBackground();
    document.body.style.backgroundImage = `url('${randomBg}.jpg')`;
    
    // Change weather image in div3 based on condition
    const weatherImg = weatherImages[weatherCondition.toLowerCase()] || 'images/sunny.jpg';
    const forecastDiv = document.getElementById('forecast');
    if (forecastDiv) {
        forecastDiv.innerHTML = `
            <img src="${weatherImg}" alt="${weatherCondition}" 
                 style="object-fit: cover; width: 250px; height: 250px; opacity: 1; border-radius: 50%;">
        `;
    }
}

    // Function to update time, date, and day
    function updateDateTime() {
        const now = new Date();
        document.getElementById("time").textContent = now.toLocaleTimeString();
        document.getElementById("date").textContent = now.toLocaleDateString();
        document.getElementById("day").textContent = now.toLocaleDateString('en-US', { weekday: 'long' });
    }

    // Update time every second
    setInterval(updateDateTime, 1000);
    updateDateTime(); // Initial call

    // Function to fetch weather details
    async function fetchWeather(city) {
        const apiKey = "554adc3e35b4cbe504bb7b619c3a5fdb"; // Note: This should be secured in a real application
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("City not found");
            }
            const data = await response.json();
            displayWeather(data);
            document.getElementById("city").textContent = data.name;
            document.getElementById("error-message").textContent = "";
        } catch (error) {
            document.getElementById("error-message").textContent = error.message;
        }
    }

    // Function to fetch weather details for current location
    async function fetchWeatherByLocation(lat, lon) {
        const apiKey = "554adc3e35b4cbe504bb7b619c3a5fdb"; // Note: This should be secured in a real application
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error("Unable to fetch weather for current location");
            }
            const data = await response.json();
            displayWeather(data);
            document.getElementById("city").textContent = data.name;
            document.getElementById("error-message").textContent = "";
        } catch (error) {
            document.getElementById("error-message").textContent = error.message;
        }
    }

    // Function to display weather details
     function displayWeather(data) {
        document.getElementById("location").textContent = `Location: ${data.name}`;
        document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
        document.getElementById("description").textContent = `Description: ${data.weather[0].description}`;
        document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
        document.getElementById("wind-speed").textContent = `Wind Speed: ${data.wind.speed} m/s`;
        document.getElementById("pressure").textContent = `Pressure: ${data.main.pressure} hPa`;
        document.getElementById("sunrise").textContent = `Sunrise: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}`;
        document.getElementById("sunset").textContent = `Sunset: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}`;
        document.getElementById("visibility").textContent = `Visibility: ${data.visibility / 1000} km`;
        document.getElementById("clouds").textContent = `Clouds: ${data.clouds.all}%`;
        
        // Update city name in div1
        document.getElementById("city").textContent = data.name;
        
        // Update images based on weather
        updateImages(data.weather[0].main);
        
        // Update weather description in div3
        const weatherDesc = data.weather[0].description;
        const lastH1 = document.querySelector('.div3 h1:last-of-type');
        if (lastH1) {
            lastH1.textContent = weatherDesc;
        }
    }

    // Function to get current location
    function getCurrentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;
                    fetchWeatherByLocation(lat, lon);
                },
                (error) => {
                    document.getElementById("error-message").textContent = "Unable to retrieve your location";
                }
            );
        } else {
            document.getElementById("error-message").textContent = "Geolocation is not supported by your browser";
        }
    }

    // Event listeners
    document.getElementById("search-button").addEventListener("click", () => {
        const city = document.getElementById("city-input").value;
        if (city) {
            fetchWeather(city);
        } else {
            document.getElementById("error-message").textContent = "Please enter a city name";
        }
    });

    document.getElementById("current-location-button").addEventListener("click", () => {
        getCurrentLocation();
    });

    // Initial weather display for Chennai
    fetchWeather("Chennai");