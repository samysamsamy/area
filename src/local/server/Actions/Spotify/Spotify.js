const axios = require('axios');
const queryString = require('query-string');
const fetch = require('node-fetch');
const mysql = require("mysql");

const debugLog = require('../../Debug/debugLog')
const computeReactions = require('../../Reactions/ComputeReactions')

const parseConditions = require('../../ParseArea/ParseArea');

var con = mysql.createPool({
    host: "sql189.main-hosting.eu",
    user: "u177508093_areaAdmin",
    password: "1~9Y&UBe",
    database: "u177508093_area"
});


function editAreaData(data, area) {
    con.query("UPDATE area SET areaData = '" + data + "' WHERE id='" + area.id + "'", function (err, result) {
        if (err) throw err;
        computeReactions.computeReaction(area)
    });
}

function New_Music_In_Playlist(area) {

    var args = parseConditions.parseAreaArguments(area.areaCondition, area.areaName)


    con.query("SELECT token FROM token WHERE userId='" + area.userID + "' AND services='" + area.serviceAction + "'", function (err, result) {
        if (err) throw err;


        fetch("https://api.spotify.com/v1/playlists/" + args['playlistId'] + "/tracks?market=from_token&limit=100", {
            headers: {
                Authorization: "Bearer " + result[0].token,
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            method: "GET"
        }).then(res => res.json())
            .then(json => {

                // console.log(json)
                if (json.items) {
                    var now = new Date();
                    var actionDate = new Date(json.items[json.items.length-1].added_at)
    
                    // console.log(now.getTime() - actionDate.getTime())
                    // console.log(json.items[0])
    
                    if (now.getTime() - actionDate.getTime() <= 10000) {
                        debugLog.debugLog(area.areaName, "An music has been found");
    
                        // console.log(json.items[json.items.length-1].added_at)
                        // console.log(json.items[json.items.length-1].track.href)
                        // console.log(json.items[json.items.length-1].track.name)
    
                        const data = "SpotifyTrackName=" + json.items[json.items.length-1].track.name + "#SpotifyTrackLink=" + json.items[json.items.length-1].track.href;
                        editAreaData(data, area);
                        
                    } else {
                        debugLog.debugLog(area.areaName, "No music was found");
                    }
                } else {
                    debugLog.debugLog(area.areaName, "Error : Token or Args are not valid !");
                }

            });
    })
}



exports.SpotifyAPI = function (area) {
    debugLog.debugLog(area.areaName, "Call Action Service : Spotify")

    switch (area.widgetAction) {
        case "New_Music_In_Playlist":
            New_Music_In_Playlist(area)
            return true;
        case "New_Commit":
            New_Commit(area)
            return true;
        default:
            debugLog.debugLog(area.areaName, "Error : Area can't find Spotify widget '" + area.widgetAction + "'")
    }
}