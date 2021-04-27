const debugLog = require('../../Debug/debugLog')

module.exports = function (app) {
    app.get('/discordOauth', (req, res) => {
        res.send(JSON.stringify("https://discord.com/api/oauth2/authorize?client_id=817586230119759913&permissions=8&scope=bot"))
      });
}