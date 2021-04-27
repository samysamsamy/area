
const CONFIG = require('./config')
const google = require('googleapis').google
const mysql = require("mysql");
const jwt = require('jsonwebtoken')
const dateFormat = require('dateformat');
const parseArguments = require('../../ParseArea/ParseArea')
const debugLog = require('../../Debug/debugLog')
const computeReactions = require('../../Reactions/ComputeReactions')


const OAuth2 = google.auth.OAuth2

var con = mysql.createPool({
    host: "sql189.main-hosting.eu",
    user: "u177508093_areaAdmin",
    password: "1~9Y&UBe",
    database: "u177508093_area"
});


function editAreaData(data, id) {
    con.query("UPDATE area SET areaData = '" + data + "' WHERE id='" + id + "'", function (err, result) {
        if (err) throw err;
    });
}

function New_Video_In_Channel(area) {
    args = parseArguments.parseAreaArguments(area.areaCondition, area.areaName)


    con.query("SELECT * FROM token WHERE userId='" + area.userID + "' AND services='" + area.serviceAction + "' AND widget='" + area.widgetAction + "'", function (err, result) {
        if (err) throw err;
        if (result.length) {
            result.forEach(element => {

                const oauth2Client = new OAuth2(
                    CONFIG.oauth2credentials.client_id,
                    CONFIG.oauth2credentials.client_secret,
                    CONFIG.oauth2credentials.redirect_uris[0]
                );

                oauth2Client.credentials = jwt.verify(element.token, CONFIG.JWTsecret);

                const service = google.youtube("v3");

                var now = new Date();
                unformatedDate = dateFormat(now - 10000, "isoDateTime");
                formatedDate = unformatedDate.slice(0, -2) + ':' + unformatedDate.slice(-2)

                // console.log(formatedDate)
                service.activities
                    .list({
                        auth: oauth2Client,
                        channelId: args['channelId'],
                        publishedAfter: formatedDate,
                        part: 'snippet'
                    })
                    .then(response => {
                        nbrOfVideo = parseInt(response.data.pageInfo.totalResults)
                        // console.log(nbrOfVideo)
                        if (nbrOfVideo > 0) {
                            elem = response.data.items[0]
                            editAreaData("youtubeVideoTitle=" + elem.snippet.title, area.id)
                            debugLog.debugLog(area.areaName, "Youtube video has been find !")
                            computeReactions.computeReaction(area)


                        } else {
                            debugLog.debugLog(area.areaName, "no Youtube video was found !")
                            debugLog.debugLog(area.areaName, "Area stopped !")
                        }
                    });

            });
        } else {
            debugLog.debugLog(area.areaName, "Error : Youtube token Not Found or Expired !")
            debugLog.debugLog(area.areaName, "Error : Area stopped !");
        }
    });
}


exports.YoutubeAPI = function (area) {
    debugLog.debugLog(area.areaName, "Call Action Service : Youtube")
    debugLog.debugLog(area.areaName, "")


    switch (area.widgetAction) {
        case "New_Video_In_Channel":
            New_Video_In_Channel(area)
            return true;
        default:
            debugLog.debugLog(area.areaName, "Error : Area can't find Youtube widget '" + area.widgetAction + "'")
    }
}