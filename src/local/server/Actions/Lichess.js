exports.LichessAPI = function (area) {
    console.log("Call  | Service : Lichess")

    switch (area.widgetAction) {
        case "Get_ongoing_games":
            console.log("Call  | Widget : Get_ongoing_games")
            return true;
        default:
            console.log("ERROR : Area can't find Lichess API widget '", area.widgetAction, "'");
    }
}