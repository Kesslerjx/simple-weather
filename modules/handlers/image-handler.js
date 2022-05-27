import { displayImage } from "../weather-page.js";

const API_KEY = "563492ad6f917000010000016e0a30354aa7440ca7d6d3432d6edee2";

async function getImage(location) {
    try {
        const response = await fetch(`https://api.pexels.com/v1/search/?query=${location}&orientation=landscape&per_page=80`,{
            mode: 'cors', 
            headers: {'Authorization': API_KEY}
        });
        const data = await response.json();
        displayImage(data.photos[randomNumber(data.photos.length)]);
    } catch (error) {
        console.log("There was an issue loading an image");
        console.log(error);
    }
}

function randomNumber(max) {
    return Math.floor(Math.random() * max);
}

export {getImage};