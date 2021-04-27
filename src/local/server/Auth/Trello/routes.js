const queryString = require('query-string');

const newToken = require('../../Database/Token/newToken');

    // https://trello.com/1/authorize?key=b51b6d62f813b1f0ae55bf2a72f7cdf4&scope=read%2Cwrite&name=Area&expiration=never&response_type=token



function parseUrl(url) {
    var args = url.split("&")
    var result = {}
    args.forEach(elem => {
      result[elem.split("=")[0]] = elem.split("=")[1]
    });
    return result
  }
  
  
  module.exports = function (app) {
    app.post('/trelloOauth', (req, res) => {

      console.log("test")

      const stringifiedParams = queryString.stringify({
        key: "b51b6d62f813b1f0ae55bf2a72f7cdf4",
        scope: ['read', 'write', 'account'].join(','),
        name: 'Area',
        type: 'popup',
        expiration: 'never',
        response_type: 'token',
        callback_method: "fragment",
        return_url: 'https://area-georges.herokuapp.com/Html/Services/Trello/auth.html'
      });
      const githubLoginUrl = `https://trello.com/1/authorize?${stringifiedParams}`;
      const tokenObj = {
        userId: req.body.userID,
        service: 'Trello',
        widget: '*',
        token: 'waiting'
      }


      newToken.newToken(tokenObj);
      res.send(JSON.stringify(githubLoginUrl))
    });
  
    app.post('/trelloOauth2callback', (req, res) => {

        console.log(req.body.token)


      const tokenObj = {
        userId: 'waiting',
        service: 'Trello',
        widget: '*',
        token: req.body.token.split('=')[1]
      }
      newToken.newToken(tokenObj);
      return res.redirect('https://area-georges.herokuapp.com/Html/Area_links.html')
    });
  }