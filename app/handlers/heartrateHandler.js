import document from "document";
import {me} from "appbit";
import {display} from "display";
import {HeartRateSensor} from "heart-rate";
import {user} from "user-profile";

const hrmImage = document.getElementById("#hrmImage");
const hrmText = document.getElementById("#hrmText");

let sensor, watchID, heartRate;
let lastReading = 0;

export function initialize() {
    if (me.permissions.granted("access_heart_rate") && me.permissions.granted("access_user_profile")) {
        sensor = new HeartRateSensor();
        setupEvents();
        start();
        lastReading = sensor.timestamp;
    } else {
        console.log("Denied Heart Rate or User Profile permissions");
        handleUpdate({
            bpm: "???",
            zone: "denied",
            restingHeartRate: "???"
        });
    }
}

const handleUpdate = (data) => {
    if (data) {
        hrmText.text = `${data.bpm || 0}`;

        hrmImage.href = data.zone === 'out-of-range' ? 'images/heart_open.png' : 'images/heart_solid.png';
        if (data.bpm !== '--') {
            hrmImage.animate('highlight');
        }
    }
}

const getReading = () => {
    heartRate = sensor.timestamp === lastReading ? '--' : sensor.heartRate;

    lastReading = sensor.timestamp;

    handleUpdate({
        bpm: heartRate,
        zone: user.heartRateZone(sensor.heartRate || 0),
        restingHeartRate: user.restingHeartRate
    })
};

const setupEvents = () => {
    display.addEventListener('change', () => {
        if (display.on) {
            start();
        } else {
            stop();
        }
    })
}

const start = () => {
    if (!watchID) {
        sensor.start();
        getReading();
        watchID = setInterval(getReading, 1000);
    }
}

const stop = () => {
    sensor.stop();
    clearInterval(watchID);
    hrmImage.animate('unhighlight');
    watchID = null;
}