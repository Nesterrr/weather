import express = require('express');
import bodyParser = require('body-parser');
import * as apiController from "./controllers/api";

export const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/woeid", apiController.getWoeid);
app.get("/api/location/", apiController.getFiveDayForecast);
app.get("/api/weather", apiController.getWeather)
