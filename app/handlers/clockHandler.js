import clock from "clock";
import document from "document";
import * as util from "../util";

const dateText = document.getElementById("#dateText");
const timeText = document.getElementById("#timeText");
const amPMText = document.getElementById("#amPMText");

export function initialize() {
    clock.granularity = 'seconds';
    clock.addEventListener('tick', tickHandler);
}

const tickHandler = (evt) => {
    const today = evt.date;

    handleDate(today);
    handleTime(today);
};

const handleDate = (date) => {
    const dayName = days[date.getDay()];
    const dayNumber = util.zeroPad(date.getDate())
    const monthName = monthsShort[date.getMonth()];

    dateText?.text = `${dayName} ${dayNumber} ${monthName}`;
}

const handleTime = (now) => {
    const hours = now.getHours() % 12 || 12;
    const minutes = util.zeroPad(now.getMinutes() % 60)

    timeText?.text = `${hours}:${minutes}`;

    amPMText.text = now.getHours() < 12 ? 'A' : 'P';

    amPMText.x = 174 + timeText.getBBox().width / 2
}

const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const monthsShort = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];