var axios = require("axios").default;
const computeReactions = require('../Reactions/ComputeReactions')


exports.covid = function (country)
{
    var options = {
        method: 'GET',
        url: 'https://covid-19-data.p.rapidapi.com/report/country/name',
        params: {date: '2020-04-01', name: counrty},
        headers: {
            'x-rapidapi-key': '046b24c453msh379485b04d2a6dep1eb29bjsn11ffab62e89c',
            'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
        }
    };

    axios.request(options).then(function (response) {
        console.log(response.data[0]);
    }).catch(function (error) {
        console.error(error);
    });
}