var axios = require("axios").default;

const parseArguments = require('../../ParseArea/ParseArea')
const debugLog = require('../../Debug/debugLog')
const computeReactions = require('../../Reactions/ComputeReactions')
const mysql = require("mysql");
const fetch = require('node-fetch');
const dateFormat = require('dateformat');

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

function New_Issue(area) {
    debugLog.debugLog(area.areaName, "Call Action Widget : New_Issue");
    var now = new Date();
    unformatedDate = dateFormat(now - 10000, "isoDateTime");
    formatedDate = unformatedDate.slice(0, -5) + 'Z'

    const args = parseArguments.parseAreaArguments(area.areaCondition, area.areaName);

    // var options = {
    //     method: 'get',
    //     url: 'https://api.github.com/repos/' + args['owner'] + '/' + args['repo'] + '/issues',
    //     headers: {
    //     },
    //     data: { client_id: 'Iv1.c244a243219988c3', client_secret: '036c5286aaa0d989e6d2b80f1af87a414d0603cd' }
    // };

    // console.log(options);

    fetch('https://api.github.com/repos/' + args['owner'] + '/' + args['repo'] + '/issues', {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        method: "GET"
    }).then(res => res.json())
        .then(response => {
            // debugLog.debugLog(area.areaName, response.data.number)
            // console.log(area.areaName, response)
            // console.log(area.areaName, response[0])
            const itemDate = new Date(response[0].created_at)

            debugLog.debugLog(area.areaName, "Server Date : " + new Date().getTime())
            debugLog.debugLog(area.areaName, "Item  Date  : " + itemDate.getTime())
            debugLog.debugLog(area.areaName, "Difference  : " + (new Date().getTime() - itemDate.getTime()))

            if (new Date().getTime() - itemDate.getTime() <= 12000) {
                debugLog.debugLog(area.areaName, "An issue has been found");

                const data = "GithubIssueTitle=" + response[0].title + "#GithubIssueLogin=" + response[0].user.login;
                editAreaData(data, area.id);
                computeReactions.computeReaction(area)
            } else {
                debugLog.debugLog(area.areaName, "No issue was found");
            }
            return

        })







    // axios.request('https://api.github.com/repos/' + args['owner'] + '/' + args['repo'] + '/issues').then(function (response) {

    //     debugLog.debugLog(area.areaName, response.data.number)
    //     debugLog.debugLog(area.areaName, response.data)

    //     if (response.data.length) {

    //         const itemDate = new Date(response.data[0].created_at)

    //         debugLog.debugLog(area.areaName, "Server Date : " + new Date().getTime())
    //         debugLog.debugLog(area.areaName, "Item  Date  : " + itemDate.getTime())
    //         debugLog.debugLog(area.areaName, "Difference  : " + new Date().getTime() - itemDate.getTime())

    //         if (new Date().getTime() - itemDate.getTime() <= 10000) {
    //             debugLog.debugLog(area.areaName, "An issue has been found");

    //             const data = "GithubIssueTitle=" + response.data[0].title + "#GithubIssueLogin=" + response.data[0].user.login;
    //             editAreaData(data, area.id);
    //             computeReactions.computeReaction(area)
    //         } else {
    //             debugLog.debugLog(area.areaName, "No issue was found");
    //         }
    //         return
    //     } else {
    //         debugLog.debugLog(area.areaName, "No issue was found");
    //         return
    //     }
    // }).catch(function (error) {
    //     debugLog.debugLog(area.areaName, "Error : " + error.message)
    // });
    return
}

function New_Commit(area) {
    debugLog.debugLog(area.areaName, "Call Action Widget : New_Commit");

    const args = parseArguments.parseAreaArguments(area.areaCondition, area.areaName);

    // var options = {
    //     method: 'get',
    //     url: 'https://api.github.com/repos/' + args['owner'] + '/' + args['repo'] + '/commits',
    //     headers: {
    //     },
    //     data: { client_id: 'Iv1.c244a243219988c3', client_secret: '036c5286aaa0d989e6d2b80f1af87a414d0603cd' }
    // };
    

    fetch('https://api.github.com/repos/' + args['owner'] + '/' + args['repo'] + '/commits', {
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        method: "GET"
    }).then(res => res.json())
        .then(response => {
            console.log(response)
            // debugLog.debugLog(area.areaName, response.data.number)
            // console.log(area.areaName, response)
            // console.log(area.areaName, response[0])
            const itemDate = new Date(response[0].commit.committer.date)

            debugLog.debugLog(area.areaName, "Server Date : " + new Date().getTime())
            debugLog.debugLog(area.areaName, "Item  Date  : " + itemDate.getTime())
            debugLog.debugLog(area.areaName, "Difference  : " + (new Date().getTime() - itemDate.getTime()))

            if (new Date().getTime() - itemDate.getTime() <= 12000) {
                debugLog.debugLog(area.areaName, "A commit has been found");

                const data = "GithubCommitTitle=" + response[0].commit.message + "#GithubCommitLogin=" + response[0].commit.author.name;
                editAreaData(data, area.id);
                computeReactions.computeReaction(area)
            } else {
                debugLog.debugLog(area.areaName, "No commit was found");
            }
            return

        })



    // axios.request(options).then(function (response) {
    //     if (response.data.length) {

    //         const itemDate = new Date(response.data[0].commit.committer.date)
    //         console.log(itemDate)

    //         if (new Date().getTime() - itemDate.getTime() <= 10000) {
    //             debugLog.debugLog(area.areaName, "A commit has been found");

    //             const data = "GithubCommitTitle=" + response.data[0].commit.message + "#GithubCommitLogin=" + response.data[0].commit.author.name;
    //             editAreaData(data, area.id);

    //             computeReactions.computeReaction(area)
    //         } else {
    //             debugLog.debugLog(area.areaName, "No commit was found");

    //         }
    //         return
    //     } else {
    //         debugLog.debugLog(area.areaName, "No commit was found");
    //         return
    //     }
    // }).catch(function (error) {
    //     debugLog.debugLog(area.areaName, "Error : " + error.message)
    // });
    return
}



exports.GithubAPI = function (area) {
    debugLog.debugLog(area.areaName, "Call Action Service : Github")

    switch (area.widgetAction) {
        case "New_Issue":
            New_Issue(area)
            return true;
        case "New_Commit":
            New_Commit(area)
            return true;
        default:
            debugLog.debugLog(area.areaName, "Error : Area can't find Github widget '" + area.widgetAction + "'")
    }
}