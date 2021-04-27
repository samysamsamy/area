const Trello = require('./Trello')
const SendGrid = require('./Sendgrid')
const Facebook = require('./Facebook/Facebook')
const Clicksend = require('./Clicksend/Clicksend')
const Discord = require('./Discord/Discord')
const Spotify = require('./Spotify/Spotify')
const debugLog = require('../Debug/debugLog')

exports.computeReaction = function (area) {
    debugLog.debugLog(area.areaName, "condition return TRUE -> Continue Area process | Call Reaction")
    switch (area.serviceReaction) {
        case "SendGrid":
            SendGrid.SendGridAPI(area);
            break;
        case "Trello":
            Trello.TrelloAPI(area);
            break;
        case "Facebook":
            Facebook.FacebookAPI(area);
            break;
        case "Clicksend":
            Clicksend.ClicksendAPI(area);
            break;
        case "Discord":
            Discord.DiscordAPI(area);
            break;
        case "Spotify":
            Spotify.SpotifyAPI(area);
            break;
        default:
            debugLog.debugLog(area.areaName, "Error : Area can't find '" + area.serviceReaction + "' service !");
            debugLog.debugLog(area.areaName, "Error : Area stopped !");
    }
}