
const parseArguments = require('../../ParseArea/ParseArea')
const debugLog = require('../../Debug/debugLog')
const mysql = require("mysql");
const fetch = require('node-fetch');



var con = mysql.createPool({
    host: "sql189.main-hosting.eu",
    user: "u177508093_areaAdmin",
    password: "1~9Y&UBe",
    database: "u177508093_area"
});




function Pages_Messaging(area) {
    con.query("SELECT token FROM token WHERE userId='" + area.userID + "' AND services='" + area.serviceReaction + "' AND widget='" + area.widgetReaction + "'", function (err, result) {
        if (err) throw err;

        // tmp

        args = {}
        args['page-id'] = '102175158610653'
        args['message'] = "Hello World !"
        // end tmp
        // message=' + args['message'] + '&
        console.log(result)
        console.log(result.length)
        if (result.length) {
            fetch('https://graph.facebook.com/' + args['page-id'] + '/feed?access_token=' + result[0].token, {
                method: 'POST'
            }).then(text => console.log(text))
            .catch(err => console.error(err));
        }
    });
}



exports.FacebookAPI = function (area) {
    debugLog.debugLog(area.areaName, "Call Action Service : Facebook")

    console.log("")

    switch (area.widgetReaction) {
        case "Pages_Messaging":
            Pages_Messaging(area)
            return true;
        default:
            debugLog.debugLog(area.areaName, "Error : Area can't find Facebook widget '" + area.widgetReaction + "'")
    }
}