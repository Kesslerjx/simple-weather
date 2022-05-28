import { displayWeatherData } from "../weather-page.js";
import { getImage } from "./image-handler.js";

const API_KEY = "dc85a2fb546d8ff5571b8b7d6a963de1";

let currentZipcode = undefined

//Gets the weather data based on the users location
async function getWeatherData(zipcode) {
    try {
        currentZipcode = zipcode
        const locationData = await getLocationData(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipcode},US&appid=${API_KEY}`);
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationData[0]}&lon=${locationData[1]}&appid=${API_KEY}&units=imperial`, {mode: 'cors'});
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.log("There was an issue loading the weather data");
        console.log(error);
    }
}

//Gets the users latitude and longitude based on their zipcode
async function getLocationData(URL) {
    try {
        const response = await fetch(URL, {mode: 'cors'});
        const data = await response.json();
        getImage(await getUsersLocation(data.lat, data.lon));
        return [data.lat, data.lon];
    } catch (error) {
        console.log("There was an issue retreiving the latitude and longitude");
        console.log(error);
    }
}

async function getUsersLocation(latitude, longitude) {
    try {
        const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=5&appid=${API_KEY}`, {mode: 'cors'});
        const data = await response.json();
        return data[0].state;
    } catch (error) {
        console.log("There was an issue gettings the users location");
        console.log(error);
    }
}

//Gets the weather data using the stored zipcode
function refreshWeatherData() {
    getWeatherData(currentZipcode);
}

export {getWeatherData, refreshWeatherData}