import document from 'document';
import {me} from "appbit";
import clock from "clock";
import {goals, today} from "user-activity";
import * as util from "../util";

const stats = document.getElementById('stats');
const steps = document.getElementById('steps');
const stepsImage = document.getElementById('stepsImage');
const stepsText = document.getElementById('stepsText');

export function initialize() {
    if (me.permissions.granted("access_activity")) {
        clock.granularity = 'seconds';
        clock.addEventListener("tick", () => updateSteps());
    } else {
        console.log("Denied User Activity permission");
        updateSteps(0);
    }
}

const updateSteps = (defaultCount) => {
    const currentSteps = today?.adjusted?.steps || 0;
    stepsText.text = defaultCount || util.thousandsSeparators(currentSteps);

    steps.width = stepsText.getBBox().width + stepsImage.width;
    steps.x = stats.getBBox().width / 2 - (steps.width + stepsImage.width) / 2;

    stepsImage.style.fill = currentSteps >= goals.steps ? 'aqua' : 'white';

}