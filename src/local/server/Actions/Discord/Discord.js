var axios = require("axios").default;

const parseCondition = require('../../ParseArea/ParseArea');
const mysql = require("mysql");
const fetch = require('node-fetch');
const debugLog = require('../../Debug/debugLog')
const computeReactions = require('../../Reactions/ComputeReactions')

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

function editBufferAction(buff, id) {
    con.query("UPDATE area SET bufferAction = '" + buff + "' WHERE id='" + id + "'", function (err, result) {
        if (err) throw err;
    });
}

function GetMessages(area) {

    args = parseCondition.parseAreaArguments(area.areaCondition, area.areaName)


    con.query("SELECT bufferAction FROM area WHERE id='" + area.id + "'", function (err, result) {
        if (err) throw err;

        if (result[0].bufferAction != "Created") {
            const Discord = require('src/local/server/Actions/Discord/Discord.js');
            const client = new Discord.Client();
            
            client.on('ready', () => {
              console.log(`Logged in as ${client.user.tag}!`);
            });
            
            // client.on('ready', function () {
            //     debugLog.debugLog(area.areaName, "Discord Listener Created SuccessFully")
            //     // editBufferAction("Created", area.id)
            // })


            client.on('message', message => {

                if (args['channel'] != "all") {
                    if (message.channel.id == args['channel']) {
                        if (args['startWith'] != "all") {
                            if (message.content.startsWith(args['startWith'])) {
                                computeReactions.computeReaction(area)
                            }
                        } else {
                            computeReactions.computeReaction(area)
                        }
                    }
                } else {
                    if (args['startWith'] != "all") {
                        if (message.content.startsWith(args['startWith'])) {
                            computeReactions.computeReaction(area)
                        }
                    } else {
                        computeReactions.computeReaction(area)
                    }
                }
            })

            client.login('ODE3NTg2MjMwMTE5NzU5OTEz.YELqgw.C90oRA7E2tMHxyy_0AXqWyDeJ4A')


        } else {
            debugLog.debugLog(area.areaName, "Discord Listener is already created")
        }
    });
}


exports.DiscordAPI = function (area) {
    debugLog.debugLog(area.areaName, "")
    debugLog.debugLog(area.areaName, "Call Action Service : Discord")

    switch (area.widgetAction) {
        case "Get_Messages":
            GetMessages(area);
            return true;
        default:
            debugLog.debugLog(area.areaName, "Error : Area can't find Discord widget '" + area.widgetAction + "'")
    }
}