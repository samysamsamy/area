'use strict';

const Actions = require('./Actions/ComputeActions')
const debugLog = require('./Debug/debugLog')
const express = require('express')
const computeReaction = require('./Reactions/ComputeReactions')
const app = express()
const port = process.env.PORT || 8080
const bodyParser = require('body-parser');
var dateFormat = require('dateformat');
app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require("mysql");

var con = mysql.createPool({
  host: "sql189.main-hosting.eu",
  user: "u177508093_areaAdmin",
  password: "1~9Y&UBe",
  database: "u177508093_area"
});

const fs = require('fs');
const fileName = './about.json';
const file = require(fileName);


function updateAbout() {
  let ts = Date.now();

  let content = JSON.parse(fs.readFileSync('./about.json', 'utf8'));

  console.log("Current time " + content.server.current_time)

  content.server.current_time = ts;
  console.log("New time " + content.server.current_time)

  fs.writeFileSync('./about.json', JSON.stringify(content));
}


function areaLoop() {
  updateAbout()

  con.query("SELECT * FROM area", function (err, result) {
    if (err) throw err;
    console.log("------------------------------------------ AREAS loop | " + dateFormat(new Date(), "yyyy-mm-dd h:MM:ss"))

    result.forEach(function (item) {
      console.log("")
      debugLog.debugLog(item.areaName, "Checking Area")
      debugLog.debugLog(item.areaName, "")
      if (item.areaState == "ongoing") {
        if (item.serviceAction == "valide") {
          computeReaction.computeReaction(item)
        } else {
          debugLog.debugLog(item.areaName, "Area status : Ongoing")
          Actions.computeAction(item)
        }
      } else {
        debugLog.debugLog(item.areaName, "Area status : Paused")
      }
      console.log("")
    });
  });
}


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send('<h1>Area Server</h1>');
})

app.get('/about.json', (req, res) => {
  res.header("Content-Type", 'application/json');
  res.send(JSON.parse(fs.readFileSync('./about.json', 'utf8')));
})

app.get('/documentation', (req, res) => {
  res.redirect('https://documenter.getpostman.com/view/14833207/Tz5qZHF9')
})

require('./Database/Areas/routes')(app);
require('./Database/Users/routes')(app);
require('./Database/Token/routes')(app);

require('./Auth/Discord/routes')(app);
require('./Auth/Github/routes')(app);
require('./Auth/Youtube/routes')(app);
require('./Auth/Trello/routes')(app);
require('./Auth/Microsoft/routes')(app);
require('./Auth/Spotify/routes')(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


setInterval(function () {
  areaLoop()
}, 10000)

areaLoop()
