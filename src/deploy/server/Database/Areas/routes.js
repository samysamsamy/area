const debugLog = require('../../Debug/debugLog')
const mysql = require("mysql");

var con = mysql.createPool({
    host: "sql189.main-hosting.eu",
    user: "u177508093_areaAdmin",
    password: "1~9Y&UBe",
    database: "u177508093_area"
});

module.exports = function (app) {
    app.post('/deleteAreaFromId', (req, res) => {
        con.query("SELECT * FROM area WHERE id='" + req.body.id + "'", function (err, result) {
            if (err) throw err;
            con.query("DELETE FROM area WHERE id='" + req.body.id + "'", function (err, result) {
                if (err) throw err;
                res.send("done")
            });
            debugLog.debugLog("DATABASE", result[0].areaName + " has been deleted")
        })
    });

    app.post('/newArea', (req, res) => {
        con.query("INSERT INTO area (userID, areaName, serviceAction, widgetAction, areaCondition, serviceReaction, widgetReaction, areaInstruction, areaState) VALUES ('" + req.body.userId + "','" + req.body.areaName + "','" + req.body.serviceAction + "','" + req.body.widgetAction + "','" + req.body.condition + "','" + req.body.serviceReaction + "','" + req.body.widgetReaction + "','" + req.body.instruction + "', 'ongoing' )", function (err, result) {
            if (err) throw err;

            debugLog.debugLog("DATABASE", req.body.areaName + " has been created")
            debugLog.debugLog("DATABASE", "with: \tUser ID \t: " + req.body.userId)
            debugLog.debugLog("DATABASE", "\tArea name \t: " + req.body.areaName)
            debugLog.debugLog("DATABASE", "\tAction \t: " + req.body.serviceAction + " - " + req.body.widgetAction)
            debugLog.debugLog("DATABASE", "\Reaction \t: " + req.body.serviceReaction + " - " + req.body.widgetReaction)
            //res.send("done");
            res.send(JSON.stringify(result))
        });
    });

    app.post('/areaFromId', (req, res) => {
        con.query("SELECT * FROM area WHERE userID='" + req.body.userID + "'", function (err, result) {
            if (err) throw err;
            debugLog.debugLog("DATABASE", "Send User Areas informations From a userID to a Client")
            res.send(JSON.stringify(result))
        });
    });

    app.get('/areas', (req, res) => {
        con.query("SELECT * FROM area", function (err, result) {
            if (err) throw err;
            debugLog.debugLog("DATABASE", "Send all Areas informations to a Client")
            res.send(JSON.stringify(result))
        });
    });

    app.post('/areaStateChange', (req, res) => {
        con.query("SELECT areaName FROM area WHERE id='" + req.body.id + "'", function (err, result) {
            if (err) throw err;

            if (result.length) {
                debugLog.debugLog("DATABASE", result[0].areaName + " state was update for '" + req.body.state + "'")
                con.query("UPDATE area SET areaState = '" + req.body.state + "' WHERE id='" + req.body.id + "'", function (err, result) {
                    if (err) throw err;
                    res.send(req.body.state);
                });    
            } else {
                return res.status(400).send("Unknow Area id " + req.body.id)
            }
        });
    })
}
