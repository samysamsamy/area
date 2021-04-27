const Weather = require('./OpenWeather')
const Trello = require('./Trello/Trello')
const Youtube = require('./Youtube/Youtube')
const Github = require('./Github/Github')
const Discord = require('./Discord/Discord')
const Spotify = require('./Spotify/Spotify')
const debugLog = require('../Debug/debugLog')

exports.computeAction = function (area) {
    switch (area.serviceAction) {
        case "OpenWeather":
            return Weather.OpenWeatherAPI(area);
        case "Trello":
            return Trello.TrelloAPI(area);
        case "Youtube":
            return Youtube.YoutubeAPI(area);
        case "Github":
            return Github.GithubAPI(area);
        case "Discord":
            return Discord.DiscordAPI(area);
        case "Spotify":
            return Spotify.SpotifyAPI(area);
        default:
            debugLog.debugLog(area.areaName, "Error : Area can't find '" + area.serviceAction + "' service !");
            debugLog.debugLog(area.areaName, "Error : Area stopped !");
    }
}