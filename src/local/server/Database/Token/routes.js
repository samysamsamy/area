
const debugLog = require('../../Debug//debugLog')
const newToken = require('./newToken');



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
}