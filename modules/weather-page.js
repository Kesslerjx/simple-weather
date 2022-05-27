import { getWeatherData, refreshWeatherData } from "./handlers/weather-data-handler.js";

//Elements
const inputField = document.querySelector('#zip-code-input');
const goButton = document.querySelector('#go-button');
const refreshButton = document.querySelector("#refresh-button");
const weatherName = document.querySelector("#weather-name");
const currentTemperature = document.querySelector("#current-temperature");
const temperatureRange = document.querySelector("#temperature-range");
const humidity = document.querySelector("#weather-humidity");
const description = document.querySelector("#weather-description");
const wind = document.querySelector("#weather-wind");

//Loads the page with its initial content
function loadPage() {

    goButton.addEventListener('click', validateForm);
    refreshButton.addEventListener('click', refreshWeatherData)

}

//Ensures that the input is a valid US zipcode
function validateForm() {
    if(/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(inputField.value)) {
        console.log("Valid zip code");
        getWeatherData(inputField.value);
    } else {
        console.log("Invalid zip code.");
    }

    inputField.value = ""; //Clears the field
}

//Puts the weather data in their respective elements
//Called from the getWeatherData function
function displayWeatherData(weatherData) {
    console.log(weatherData);

    weatherName.textContent = weatherData.name;
    currentTemperature.textContent = weatherData.main.temp;
    temperatureRange.textContent = `${weatherData.main.temp_min} - ${weatherData.main.temp_max}`;
    humidity.textContent = weatherData.main.humidity
    description.textContent = weatherData.weather[0].description
    wind.textContent = weatherData.wind.speed;
}

export {loadPage, displayWeatherData}