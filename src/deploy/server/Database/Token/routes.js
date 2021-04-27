
const debugLog = require('../../Debug/debugLog')
const newToken = require('./newToken');

const mysql = require("mysql");

var con = mysql.createPool({
  host: "sql189.main-hosting.eu",
  user: "u177508093_areaAdmin",
  password: "1~9Y&UBe",
  database: "u177508093_area"
});

module.exports = function (app) {

    app.post('/newToken', (req, res) => {
        debugLog.debugLog("DATABASE", "New token has been Added")
        newToken.newToken(req.body);
    });

    app.get('/tokenFromId', (req, res) => {
        con.query("SELECT * FROM token WHERE userId='" + req.body.userId + "'", function (err, result) {
            if (err) throw err;
            debugLog.debugLog("DATABASE", "Send token From ID")
            res.send(JSON.stringify(result[0]))
        });
    });

    app.get('/connected', (req, res) => {
        debugLog.debugLog("DATABASE", "Is token exist for userId='" + req.query.userId + " and service='" + req.query.service)
        con.query("SELECT * FROM token WHERE userId='" + req.query.userId + "' AND services='" + req.query.service + "'", function (err, result) {
            if (err) throw err
            debugLog.debugLog("DATABASE", "Send if token exists")
            if (result.length > 0) {
                if (result[0].token != "waiting") {
                    res.send(JSON.stringify("connected"))
                } else {
                    res.send(JSON.stringify("token is waiting"))
                }
            } else {
                res.send(JSON.stringify("nope"))
            }
        })
    })

    app.get('/Servicelogout', (req, res) => {
        debugLog.debugLog("DATABASE", "Is token exist for userId='" + req.query.userId + " and service='" + req.query.service)
        con.query("SELECT * FROM token WHERE userId='" + req.query.userId + "' AND services='" + req.query.service + "'", function (err, result) {
            if (err) throw err
            debugLog.debugLog("DATABASE", "Send if token exists")
            if (result.length > 0) {
                con.query("DELETE FROM token WHERE userId='" + req.query.userId + "' AND services='" + req.query.service + "'", function (err, result) {
                    if (err) throw err;
                    res.send("token has been removed")
                });

            } else {
                res.send(JSON.stringify("token Doesn't exist"))
            }
        })
    })
}