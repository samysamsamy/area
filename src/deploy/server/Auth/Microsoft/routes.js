const axios = require('axios');

const newToken = require('../../Database/Token/newToken');

function parseUrl(url) {
    var args = url.split("&")
    var result = {}
    args.forEach(elem => {
      result[elem.split("=")[0]] = elem.split("=")[1]
    });
    return result
  }

async function getMicrosoftAccessToken(code) {
    const { data } = await axios({
        url: 'https://login.microsoftonline.com/common/oauth2/token',
        method: 'post',
        params: {
            id_token: code,
            client_id: "2a66aa67-adb0-4d7b-b058-6b54d5e95203",
            response_type: 'id_token',
            redirect_uri: 'https://area-georges.herokuapp.com/microsoftOauthcallback',
            nonce: '901cb4ca-b862-4029-9306-e5cd0f6d9f86',
        },
    });

    // console.log(data)
    // var token = parseUrl(data).access_token

    // console.log("token = ", token)

    // const tokenObj = {
    //     userId: 'waiting',
    //     service: 'Github',
    //     widget: 'TMP',
    //     token: token
    // }
    // newToken.newToken(tokenObj);
    return
};




module.exports = function (app) {

    app.get('/microsoftOauth', (req, res) => {

        res.send("https://login.microsoftonline.com/common/oauth2/authorize?response_type=id_token&client_id=2a66aa67-adb0-4d7b-b058-6b54d5e95203&redirect_uri=https://area-georges.herokuapp.com/microsoftOauthcallback&nonce=901cb4ca-b862-4029-9306-e5cd0f6d9f86")

        const tokenObj = {
            userId: '1',
            service: 'Microsoft',
            widget: '*',
            token: "waiting"
        }
        newToken.newToken(tokenObj);

    });


    app.get('/microsoftOauthcallback', (req, res) => {


        // getMicrosoftAccessToken(req.body.id_token);



        // fetch('https://login.microsoftonline.com/common/oauth2/token?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiIyYTY2YWE2Ny1hZGIwLTRkN2ItYjA1OC02YjU0ZDVlOTUyMDMiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC85MDFjYjRjYS1iODYyLTQwMjktOTMwNi1lNWNkMGY2ZDlmODYvIiwiaWF0IjoxNjE0OTk1MjU1LCJuYmYiOjE2MTQ5OTUyNTUsImV4cCI6MTYxNDk5OTE1NSwiYWlvIjoiQVVRQXUvOFRBQUFBMTNhOFRyRkNWWHlIanJGdmZqUk1CK2xENHNoQnBGT3F2a0NLNysrQUFWQXlMOHE5dnVFNUlYbER1Y1B1cVNPbDhNcmtBWkRvdDZFU0pQSThla1NBVkE9PSIsImFtciI6WyJwd2QiLCJtZmEiXSwiZmFtaWx5X25hbWUiOiJBbHZlcyBjYXJkb3NvIiwiZ2l2ZW5fbmFtZSI6IkFudG9uaW4iLCJpbl9jb3JwIjoidHJ1ZSIsImlwYWRkciI6IjEwOS4yMjEuMjQzLjI0MCIsIm5hbWUiOiJBbnRvbmluIEFsdmVzIGNhcmRvc28iLCJub25jZSI6IjkwMWNiNGNhLWI4NjItNDAyOS05MzA2LWU1Y2QwZjZkOWY4NiIsIm9pZCI6IjI1MGMxN2MzLWQ4MzYtNGQ3Yi05ZTZhLWUxNzNiZmYwZjgyZiIsIm9ucHJlbV9zaWQiOiJTLTEtNS0yMS0xNTUyNDM1Mjc3LTE1OTY0OTU3OTUtMzA4OTYxMzczMS0zMDc3NSIsInJoIjoiMC5BQUFBeXJRY2tHSzRLVUNUQnVYTkQyMmZobWVxWmlxd3JYdE5zRmhyVk5YcFVnTjBBQW8uIiwic3ViIjoieGZnQklzSlB1NXNNNXRzUVRxblFYUXA3UHhodHdadGE2Y3NPelpKWDhJVSIsInRpZCI6IjkwMWNiNGNhLWI4NjItNDAyOS05MzA2LWU1Y2QwZjZkOWY4NiIsInVuaXF1ZV9uYW1lIjoiYW50b25pbi5hbHZlcy1jYXJkb3NvQGVwaXRlY2guZXUiLCJ1cG4iOiJhbnRvbmluLmFsdmVzLWNhcmRvc29AZXBpdGVjaC5ldSIsInV0aSI6ImMxeGl0TFlQVWtDVndEWnVIQ2dHQUEiLCJ2ZXIiOiIxLjAifQ.H8raT3BsfbZOoFIJ6E7nyiV9ErkWB5FRdUDa6UWkzQS0NglHSdAJI3VjlGKBRaMGjDuTYesDoKKshUzd-QyKXXFUC0BkWaxyLLYcEaX8uk88pXOgAbehhH2Ui_nlM_G6FTS3Y3q1p2_nYZQB-8Q7MU1eDY30_kG22ryqlJ4Yu2MoZO9b0GQhk0H9i7Ze12Mt103p5ioQKLcb-nxv966aP3uF40UfSArVp9-q5LhzfLMviT6U2h9GhjW10fPWC3e7_Vx86H_TxMS7oEKNUPso-LYBCw-T2Wii2B59Ig9vF_SQ8VqYBgeCSPCM1aQAHTIyOwl8tmoVXLKdEbJaoLFZcg&session_state=689f12e6-f2b2-4f40-88e6-9eda9da47a58', {
        //   method: 'POST'
        // }).then(res => {
        //   console.log(res)
        // }).catch(err => {
        //   console.log(err)
        // });

        return res.redirect('https://ayworld.space/Html/Area_links.html')
    });
}