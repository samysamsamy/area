const CONFIG = require('../../Actions/Youtube/config')
const google = require('googleapis').google
const jwt = require('jsonwebtoken')
const OAuth2 = google.auth.OAuth2

const newToken = require('../../Database/Token/newToken');

module.exports = function (app) {
    app.set('view engine', 'ejs')
    app.set('views', __dirname)

    app.post('/youtubeOauth', (req, res) => {
        const oauth2client = new OAuth2(
            CONFIG.oauth2credentials.client_id,
            CONFIG.oauth2credentials.client_secret,
            CONFIG.oauth2credentials.redirect_uris[0]
        )
        const loginLink = oauth2client.generateAuthUrl({
            access_type: 'offline',
            scope: CONFIG.oauth2credentials.scopes
        })

        const tokenObj = {
            userId: req.body.userID,
            service: 'Youtube',
            widget: 'New_Video_In_Channel',
            token: 'waiting'
        }
        newToken.newToken(tokenObj);
        res.send(JSON.stringify(loginLink))
    });

    app.get('/youtubeOauth2callback', (req, res) => {
        const oauth2client = new OAuth2(
            CONFIG.oauth2credentials.client_id,
            CONFIG.oauth2credentials.client_secret,
            CONFIG.oauth2credentials.redirect_uris[0]
        )

        if (req.query.error) {
            return res.redirect('/')
        } else {
            oauth2client.getToken(req.query.code, function (err, token) {
                if (err) return res.redirect('/')
                const tokenObj = {
                    userId: 'waiting',
                    service: 'Youtube',
                    widget: 'New_Video_In_Channel',
                    token: jwt.sign(token, CONFIG.JWTsecret)
                }
                newToken.newToken(tokenObj);
            })
            res.end()
            // return res.redirect('https://area-georges.herokuapp.com/Html/Area_links.html')
        }
    });
}