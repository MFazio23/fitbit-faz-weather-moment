import document from 'document';
import * as messaging from "messaging";

const stats = document.getElementById('stats');
const weatherSVG = document.getElementById('weather');
const weatherImage = document.getElementById('weatherImage');
const weatherText = document.getElementById('weatherText');


export function initialize() {
    setInterval(fetchWeather, 1800000) //Update every 30 minutes

    weatherSVG.onclick = () => fetchWeather();
}

const fetchWeather = () => {
    if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
        messaging.peerSocket.send({
            command: 'weather'
        })
    }
}

const processWeatherData = data => {
    weatherText.text = `${data.temperature?.toFixed(0) || '--'}°`;

    weatherSVG.width = weatherText.getBBox().width + weatherImage.width + 2;
    weatherSVG.x = stats.getBBox().width - weatherSVG.width;
}

// Listen for the onopen event
messaging.peerSocket.onopen = function () {
    // Fetch weather when the connection opens
    fetchWeather();
}

// Listen for messages from the companion
messaging.peerSocket.onmessage = function (evt) {
    if (evt.data) {
        processWeatherData(evt.data);
    }
}

// Listen for the onerror event
messaging.peerSocket.onerror = function (err) {
    // Handle any errors
    console.log("Connection error: " + err.code + " - " + err.message);
}