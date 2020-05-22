import document from "document";

import * as clockHandler from "./handlers/clockHandler";
import * as heartrateHandler from "./handlers/heartrateHandler";
import * as stepsHandler from "./handlers/stepsHandler";
import * as weatherHandler from "./handlers/weatherHandler";

clockHandler.initialize();
heartrateHandler.initialize();
stepsHandler.initialize();
weatherHandler.initialize();