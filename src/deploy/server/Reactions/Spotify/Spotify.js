const axios = require('axios');
const queryString = require('query-string');
const fetch = require('node-fetch');
const mysql = require("mysql");

const debugLog = require('../../Debug/debugLog')
const computeReactions = require('../ComputeReactions')

const parseConditions = require('../../ParseArea/AddData');

var con = mysql.createPool({
    host: "sql189.main-hosting.eu",
    user: "u177508093_areaAdmin",
    password: "1~9Y&UBe",
    database: "u177508093_area"
});


function Add_Music_In_Playlist(area) {

    var args = parseConditions.AddData(area.areaInstruction, area.areaData, area.areaName)


    con.query("SELECT token FROM token WHERE userId='" + area.userID + "' AND services='" + area.serviceReaction + "'", function (err, result) {
        if (err) throw err;


        fetch("https://api.spotify.com/v1/playlists/" + args['playlistId'] + "/tracks?uris=" + args['uris'], {
            headers: {
                Accept: "application/json",
                Authorization: "Bearer " + result[0].token,
                "Content-Type": "application/json"
            },
            method: "POST"
        })
        .then(res => res.json())
            .then(json => {
                if (json.error) {
                    debugLog.debugLog(area.areaName, "Error : " + json.error.status + " " + json.error.message)
                } else {
                    debugLog.debugLog(area.areaName, "New Track Added Successfully")
                }
            });
    })
}



exports.SpotifyAPI = function (area) {
    debugLog.debugLog(area.areaName, "Call Reaction Service : Spotify")

    switch (area.widgetReaction) {
        case "Add_Music_In_Playlist":
            Add_Music_In_Playlist(area)
            return true;
        default:
            debugLog.debugLog(area.areaName, "Error : Area can't find Spotify widget '" + area.widgetReaction + "'")
    }
}