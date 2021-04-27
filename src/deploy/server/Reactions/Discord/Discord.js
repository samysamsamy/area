
const parseArea = require('../../ParseArea/AddData');
const mysql = require("mysql");
const debugLog = require('../../Debug/debugLog')

var con = mysql.createPool({
    host: "sql189.main-hosting.eu",
    user: "u177508093_areaAdmin",
    password: "1~9Y&UBe",
    database: "u177508093_area"
});


function editBufferReaction(buff, id) {
    con.query("UPDATE area SET bufferReaction = '" + buff + "' WHERE id='" + id + "'", function (err, result) {
        if (err) throw err;
    });
}

function SendMessages(area) {

    args = parseArea.AddData(area.areaInstruction, area.areaData, area.areaName)

    con.query("SELECT bufferReaction FROM area WHERE id='" + area.id + "'", function (err, result) {
        if (err) throw err;

        if (result[0].bufferReaction != "created") {
            editBufferReaction("", area.id)
            const Discord = require('src/deploy/server/Reactions/Discord/Discord.js')
            const bot = new Discord.Client()


            bot.login('ODE3NTg2MjMwMTE5NzU5OTEz.YELqgw.C90oRA7E2tMHxyy_0AXqWyDeJ4A')

            // const channel = bot.channels.get('817750825849323542');

            console.log(bot.channels.cache)
            // bot.channels.cache.get("798182447203483690").send("<your message content here>")
            // channel.send('Hello here!');

            bot.on('ready', client => {
                debugLog.debugLog(area.areaName, "/Success/Discord Send Message SuccessFully")

                const channel = bot.channels.cache.get(args['channel'])

                debugLog.debugLog(area.areaName,"Bot channel" + channel)
                console.log(args['msg'])
                if (args['msg']) {
                    channel.send(args['msg'])
                } else {
                    channel.send("Hello World !")
                }
            })

        } else {
            debugLog.debugLog(area.areaName, "Discord Listener is already created")
        }
    });
}


exports.DiscordAPI = function (area) {
    debugLog.debugLog(area.areaName, "")
    debugLog.debugLog(area.areaName, "Call Reaction Service : Discord")

    switch (area.widgetReaction) {
        case "Send_Messages":
            SendMessages(area);
            return true;
        default:
            debugLog.debugLog(area.areaName, "Error : Area can't find Discord widget '" + area.widgetAction + "'")
    }
}