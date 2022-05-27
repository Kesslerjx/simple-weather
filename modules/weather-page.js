import { getWeatherData } from "./handlers/weather-data-handler.js";

//Elements
const inputField = document.querySelector('#zip-code-input');
const goButton = document.querySelector('#go-button');


//Loads the page with its initial content
function loadPage() {
    getWeatherData('20657');
}

//Puts the weather data in their respective elements
//Called from the getWeatherData function
function displayWeatherData(weatherData) {
    console.log(weatherData);
}

export {loadPage, displayWeatherData}