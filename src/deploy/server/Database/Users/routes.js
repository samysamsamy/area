const debugLog = require('../../Debug/debugLog')
const mysql = require("mysql");
const md5 = require('js-md5');

var con = mysql.createPool({
    host: "sql189.main-hosting.eu",
    user: "u177508093_areaAdmin",
    password: "1~9Y&UBe",
    database: "u177508093_area"
});

module.exports = function (app) {
    app.post('/register', (req, res) => {

        if (req.body.email != null && req.body.email !== '') {
            if (req.body.password != null && req.body.password !== '') {
                con.query("INSERT INTO users(name,email,password) VALUES('" + req.body.user + "','" + req.body.email + "','" + md5(req.body.password) + "')", function (err, result) {
                    if (err) throw err;
                    debugLog.debugLog("CLIENT", "New Registration with '" + req.body.email + "' mail address")
                    console.log("")
                    res.send("registered !")
                });
            } else {
                debugLog.debugLog("CLIENT", "New Registration Failed : missing password field")
                res.send("Registration Failed : missing password field")
            }
        } else {
            debugLog.debugLog("CLIENT", "New Registration Failed : missing email field")
            res.send("Registration Failed : missing email field")
        }
    });

    app.post('/login', (req, res) => {

        if (req.body.email != null && req.body.email !== '') {
            if (req.body.password != null && req.body.password !== '') {
                con.query("SELECT ID FROM users WHERE password='" + md5(req.body.password) + "' AND email='" + req.body.email + "'", function (err, result) {
                    if (err) throw err;
                    if (result[0] == null) {
                        debugLog.debugLog("CLIENT", "Login with '" + req.body.email + "' mail address Failed")
                        console.log("")
                        res.send({ msg: "none" })
                    } else {
                        debugLog.debugLog("CLIENT", "Login with '" + req.body.email + "' mail address Successfully")
                        console.log("")
                        res.send({ msg: String(result[0].ID) })
                    }
                });
            } else {
                debugLog.debugLog("CLIENT", "Login Failed : missing password field")
                res.send("Login Failed : missing password field")
            }
        } else {
            debugLog.debugLog("CLIENT", "Login Failed : missing email field")
            res.send("Login Failed : missing email field")
        }
    });

    app.post('/profil', (req, res) => {
        con.query("SELECT * FROM users WHERE ID='" + req.body.userId + "'", function (err, result) {
            if (err) throw err;
            if (result == "undefined") {
                debugLog.debugLog("CLIENT", "Sending profil Information with '" + req.body.userId + "' ID Successfully")
                res.send("nope")
            } else {
                debugLog.debugLog("CLIENT", "Sending profil Information with '" + req.body.userId + "' ID Successfully")
                console.log("")
                res.send(JSON.stringify(result[0]))
            }
        });
    });
}