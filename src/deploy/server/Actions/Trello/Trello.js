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


function GetCreatedCard(area) {

    var args = parseCondition.parseAreaArguments(area.areaCondition, area.areaName)

    var options = {
        method: 'get',
        url: 'https://api.trello.com/1/boards/' + args['boardId'] + '/actions',
        headers: {
        },
        data: {
            key: 'b51b6d62f813b1f0ae55bf2a72f7cdf4',
            token: '21743f7a2b250b5ada5ae9150d64d310734df52ef88736dac982559ed572f091',
            filter: 'createCard'
        }
    };

    axios.request(options).then(function (response) {

        var now = new Date();
        var actionDate = new Date(response.data[0].date)

        if (now.getTime() - actionDate.getTime() <= 10000) {
            debugLog.debugLog(area.areaName, "An action has been found");
            // console.log(response.data[0])
            // console.log(response.data[0].data.card.name)
            // console.log(response.data[0].memberCreator.username)



            const data = "trelloCardTitle=" + response.data[0].data.card.name + "#trelloCardCreator=" + response.data[0].memberCreator.username;
            editAreaData(data, area.id);
            computeReactions.computeReaction(area)
            return
        } else {
            debugLog.debugLog(area.areaName, "No action was found");
            return
        }


    }).catch(function (error) {
        console.log(error)
        // debugLog.debugLog(area.areaName, "Error : " + error.message)
    });
}


exports.TrelloAPI = function (area) {
    debugLog.debugLog(area.areaName, "")
    debugLog.debugLog(area.areaName, "Call Action Service : Trello")

    switch (area.widgetAction) {
        case "Get_Created_Card":
            GetCreatedCard(area);
            return true;
        default:
            debugLog.debugLog(area.areaName, "Error : Area can't find Trello widget '" + area.widgetAction + "'")
    }
}