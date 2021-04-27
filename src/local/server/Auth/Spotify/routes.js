const axios = require('axios');
const queryString = require('query-string');
const fetch = require('node-fetch');

const newToken = require('../../Database/Token/newToken');
const { json } = require('body-parser');


function parseUrl(url) {
    var args = url.split("&")
    var result = {}
    args.forEach(elem => {
        result[elem.split("=")[0]] = elem.split("=")[1]
    });
    return result
}
// var authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     form: {
//       code: code,
//       redirect_uri: redirect_uri,
//       grant_type: 'authorization_code'
//     },
//     headers: {
//       'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//     },
//     json: true
//   };



async function getSpotifyAccessTokenFromCode(code_) {

    const client_id = "f4e57a6bcdb34ef298b5a71574c255ee";
    const client_secret = "eca70e24095b45b0bc53efcf0236bb9f";
    const client_info = client_id + ':' + client_secret
    // const client_info_encoded = client_info.toString('base64')
    const client_info_encoded = "ZjRlNTdhNmJjZGIzNGVmMjk4YjVhNzE1NzRjMjU1ZWU6ZWNhNzBlMjQwOTViNDViMGJjNTNlZmNmMDIzNmJiOWY="
    console.log("client_id : " + client_id)
    console.log("client_secret : " + client_secret)
    console.log("client_info : " + client_info)
    console.log("BAse 64 Encoded : " + client_info_encoded)
    console.log("code : " + code_)


    fetch("https://accounts.spotify.com/api/token", {
        body: "grant_type=authorization_code&code=" + code_ + "&redirect_uri=https://area-georges.herokuapp.com/spotifyOauthcallback",
        headers: {
            Authorization: "Basic ZjRlNTdhNmJjZGIzNGVmMjk4YjVhNzE1NzRjMjU1ZWU6ZWNhNzBlMjQwOTViNDViMGJjNTNlZmNmMDIzNmJiOWY",
            "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST"
    }).then(res => console.log(res.json()))
        .then(json => console.log(json));

    var token = parseUrl(data).access_token

    const tokenObj = {
        userId: 'waiting',
        service: 'Spotify',
        widget: '*',
        token: token
    }
    newToken.newToken(tokenObj);
    return data.access_token;
};
module.exports = function (app) {

    app.post('/spotifyOauth', function (req, res) {
        var scopes = 'user-read-private user-read-email';

        // var token = parseUrl(data).access_token
        const tokenObj = {
            userId: req.body.userID,
            service: 'Spotify',
            widget: '*',
            token: 'waiting'
        }
        newToken.newToken(tokenObj);

        res.send(JSON.stringify('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + "f4e57a6bcdb34ef298b5a71574c255ee" +
        (scopes ? '&scope=' + encodeURIComponent("playlist-modify-public", "playlist-modify-private") : '') +
        '&redirect_uri=' + encodeURIComponent("https://area-georges.herokuapp.com/spotifyOauthcallback")));

    })

    app.get('/spotifyOauthcallback', (req, res) => {

        // console.log(req.query.code)
        // getSpotifyAccessTokenFromCode(req.query.code)
        const client_id = "f4e57a6bcdb34ef298b5a71574c255ee";
        const client_secret = "eca70e24095b45b0bc53efcf0236bb9f";
        const client_info = client_id + ':' + client_secret
        const code_ = req.query.code
        // const client_info_encoded = client_info.toString('base64')
        const client_info_encoded = "ZjRlNTdhNmJjZGIzNGVmMjk4YjVhNzE1NzRjMjU1ZWU6ZWNhNzBlMjQwOTViNDViMGJjNTNlZmNmMDIzNmJiOWY="
        console.log("client_id : " + client_id)
        console.log("client_secret : " + client_secret)
        console.log("client_info : " + client_info)
        console.log("BAse 64 Encoded : " + client_info_encoded)
        console.log("code : " + code_)


        fetch("https://accounts.spotify.com/api/token", {
            body: "grant_type=authorization_code&code=" + code_ + "&redirect_uri=https://area-georges.herokuapp.com/spotifyOauthcallback",
            headers: {
                Authorization: "Basic ZjRlNTdhNmJjZGIzNGVmMjk4YjVhNzE1NzRjMjU1ZWU6ZWNhNzBlMjQwOTViNDViMGJjNTNlZmNmMDIzNmJiOWY",
                "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST"
        })
            .then(response => response.json())
            .then(json => {
                console.log(json)
                const tokenObj = {
                    userId: 'waiting',
                    service: 'Spotify',
                    widget: '*',
                    token: json.access_token
                }
                newToken.newToken(tokenObj);
            });

        return res.redirect('https://area-georges.herokuapp.com/Html/Area_links.html')
    })
}
