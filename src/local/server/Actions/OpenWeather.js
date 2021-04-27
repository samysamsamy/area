const axios = require('axios');
const computeReactions = require('../Reactions/ComputeReactions')
const parseArguments = require('../ParseArea/ParseArea')

const mysql = require("mysql");

var con = mysql.createPool({
    host: "sql189.main-hosting.eu",
    user: "u177508093_areaAdmin",
    password: "1~9Y&UBe",
    database: "u177508093_area"
});

function editBufferAction(buff, id) {
    con.query("UPDATE area SET bufferAction = '" + buff + "' WHERE id='" + id + "'", function (err, result) {
        if (err) throw err;
    });
}

function CurrentWeatherDataAPI(area) {
    console.log("Call  | Widget : Current_weather_data")

    var args = parseArguments.parseAreaArguments(area.areaCondition, area.areaName)

    axios.get("http://api.openweathermap.org/data/2.5/weather?q=" + args["city"] + "&appid=e349ae55f077143f4cc830950565694a").then((response) => {
        let temp = (response.data.main.temp - 273.15);
        let res = { temperature: temp, weather: response.data.weather[0].description };

        console.log("Call  | Buffer Action :", area.bufferAction)

        if (args["operator"] == "<") {
            if (parseInt(res.temperature) < parseInt(args["temp"]) && area.bufferAction != "true") {
                editBufferAction("true", area.id)
                computeReactions.computeReaction(area)
            } else {
                editBufferAction("false", area.id)
                console.log("Call  | condition return FALSE -> Stop Area process")
            }
        } else if  (args["operator"] == "=") {
            if (parseInt(res.temperature) == parseInt(args["temp"]) && area.bufferAction != "true") {
                editBufferAction("true", area.id)
                computeReactions.computeReaction(area)
            } else {
                editBufferAction("false", area.id)
                console.log("Call  | condition return FALSE -> Stop Area process")
            }
        } else if  (args["operator"] == ">") {
            if ((res.temperature) > parseInt(args["temp"]) && area.bufferAction != "true") {
                computeReactions.computeReaction(area)
                editBufferAction("true", area.id)
            } else {
                editBufferAction("false", area.id)
                console.log("Call  | condition return FALSE -> Stop Area process")
            }
        } else {
            console.log("ERROR : ")
        }
    })
}

exports.OpenWeatherAPI = function (area) {
    console.log("Call  | Service : OpenWeather")

    switch (area.widgetAction) {
        case "Current_weather_data":
            CurrentWeatherDataAPI(area)
            return true;
        default:
            console.log("ERROR : Area can't find OpenWeather widget '", area.widgetAction, "'");
    }
}