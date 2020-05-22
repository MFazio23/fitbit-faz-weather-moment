import * as messaging from "messaging";
import {geolocation} from "geolocation";

const apiKey = '';

const queryOpenWeather = () => {
    geolocation.getCurrentPosition(locationFound, locationError);
}

const locationFound = position => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    const weatherURL = `https://api.openweathermap.org/data/2.5/weather?units=imperial&lat=${lat}&lon=${long}&appid=${apiKey}`;

    fetch(weatherURL).then(weatherSuccess).catch(weatherError);
}

const locationError = error => {
    console.log(`Error [${error.code}] loading location: [${error.message}]`);
}

const weatherSuccess = response => {
    response.json().then((data) => {
        returnWeatherData({
            temperature: data['main']['temp'],
            humidity: data['main']['humidity'],
            feelsLike: data['main']['feels_like'],
            location: data['name']
        })
    })
}

const weatherError = error => console.log(`Error fetching weather: ${error}`);

const returnWeatherData = data => {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        // Send a command to the device
        messaging.peerSocket.send(data);
    } else {
        console.log("Error: Connection is not open");
    }
}

// Listen for messages from the device
messaging.peerSocket.onmessage = (evt) => {
    if (evt.data && evt.data.command === 'weather') {
        queryOpenWeather();
    }
};

// Listen for the onerror event
messaging.peerSocket.onerror = function (err) {
    // Handle any errors
    console.log("Connection error: " + err.code + " - " + err.message);
};