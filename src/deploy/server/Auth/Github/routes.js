const axios = require('axios');
const queryString = require('query-string');

const debugLog = require('../../Debug/debugLog')
const newToken = require('../../Database/Token/newToken');


function parseUrl(url) {
  var args = url.split("&")
  var result = {}
  args.forEach(elem => {
    result[elem.split("=")[0]] = elem.split("=")[1]
  });
  return result
}

async function getGithubAccessTokenFromCode(code) {
  const { data } = await axios({
    url: 'https://github.com/login/oauth/access_token',
    method: 'get',
    params: {
      client_id: "Iv1.c244a243219988c3",
      client_secret: "036c5286aaa0d989e6d2b80f1af87a414d0603cd",
      redirect_uri: 'https://area-georges.herokuapp.com/githubOauth2callback',
      code,
    },
  });

  var token = parseUrl(data).access_token
  const tokenObj = {
    userId: 'waiting',
    service: 'Github',
    widget: 'TMP',
    token: token
  }
  newToken.newToken(tokenObj);
  return data.access_token;
};

module.exports = function (app) {
  app.post('/githubOauth', (req, res) => {
    const stringifiedParams = queryString.stringify({
      client_id: "Iv1.c244a243219988c3",
      scope: ['user:email', 'repository:issues'].join(','),
    });
    const githubLoginUrl = `https://github.com/login/oauth/authorize?${stringifiedParams}`;
    const tokenObj = {
      userId: req.body.userID,
      service: 'Github',
      widget: 'TMP',
      token: 'waiting'
    }
    newToken.newToken(tokenObj);
    res.send(JSON.stringify(githubLoginUrl))
  });

  app.get('/githubOauth2callback', (req, res) => {
    getGithubAccessTokenFromCode(req.query.code)
    return res.redirect('https://ayworld.space/Html/Area_links.html')
  });
}