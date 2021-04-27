var axios = require("axios").default;

const parseArguments = require('../ParseArea/AddData');
const mysql = require("mysql");
const fetch = require('node-fetch');
const debugLog = require('../Debug/debugLog')

var con = mysql.createPool({
    host: "sql189.main-hosting.eu",
    user: "u177508093_areaAdmin",
    password: "1~9Y&UBe",
    database: "u177508093_area"
});

function CreateANewCard(area) {
    debugLog.debugLog(area.areaName, "Call Action Widget : Create_a_new_Card");
    debugLog.debugLog(area.areaName, "")

    var args = parseArguments.AddData(area.areaInstruction, area.areaData, area.areaName)

    con.query("SELECT token FROM token WHERE userId='" + area.userID + "' AND services='" + area.serviceReaction + "'", function (err, result) {
        if (err) throw err;
        fetch('https://api.trello.com/1/cards?key=b51b6d62f813b1f0ae55bf2a72f7cdf4&token=' + result[0].token + '&idList=' + args['idList'] + '&name=' + args['name'] + '&desc=' + args['desc'], {
            method: 'POST'
        }).then(res => {
            debugLog.debugLog(area.areaName, "")
            debugLog.debugLog(area.areaName, "/Success/" + area.serviceReaction + " - " + area.widgetReaction + " ended successfully !")
            console.log("")
        }).catch(err => {
            debugLog.debugLog(area.areaName, "Error : " + err.message)
        });
    });
}

exports.TrelloAPI = function (area) {
    debugLog.debugLog(area.areaName, "")
    debugLog.debugLog(area.areaName, "Call Reaction Service : Trello")

    switch (area.widgetReaction) {
        case "Create_a_new_Card":
            CreateANewCard(area);
            return true;
        default:
            debugLog.debugLog(area.areaName, "Error : Area can't find Trello widget '" + area.widgetReaction + "'")
    }
}