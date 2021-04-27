
const mysql = require("mysql");
const debugLog = require('../../Debug/debugLog')

var con = mysql.createPool({
    host: "sql189.main-hosting.eu",
    user: "u177508093_areaAdmin",
    password: "1~9Y&UBe",
    database: "u177508093_area"
});

exports.newToken = function (body) {
    if (body.userId == "waiting") {

        con.query("SELECT id FROM token WHERE token='waiting' AND services='" + body.service + "'", function (err, result) {
            if (err) throw err;

            con.query("UPDATE token SET token = '" + body.token + "' WHERE id='" + result[0].id + "' AND services='" + body.service + "'", function (err, result) {
                if (err) throw err;
                debugLog.debugLog("DATABASE", "Token created - " + body.service + " " + body.widget)
                
            });
        });
    } else {
        con.query("SELECT id FROM token WHERE userId='" + body.userId + "' AND services='" + body.service + "'", function (err, result) {
            if (err) throw err;

            if (result.length) {
                con.query("UPDATE token SET token = '" + body.token + "' WHERE userId='" + body.userId + "' AND services='" + body.service + "'", function (err, result) {
                    if (err) throw err;
    
                    debugLog.debugLog("DATABASE", "Token updated - " + body.service + " " + body.widget)
                });
            } else {
                debugLog.debugLog("DATABASE", "Wait for token")
                con.query("INSERT INTO token(userId,services,widget,token) VALUES('" + body.userId + "','" + body.service + "','" + body.widget + "','" + body.token + "')", function (err, result) {
                    if (err) throw err;
            
                    debugLog.debugLog("DATABASE", "Token is waiting !")
                });   
            }

        });


 
    }

}