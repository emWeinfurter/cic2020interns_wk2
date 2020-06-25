//npm install express axios

'use strict';
const express = require('express');  
const app = express(); 
const axios = require('axios');

const uri = 'https://api.covid19api.com/summary';

app.get('/percentageconfirmed', async function(req, res) {
    let objectArr = [];
    const response = await axios.get(uri)
        .then(response => {
            const countrySpec = response.data.Countries;
            const globalSpec = response.data.Global.TotalConfirmed;
            for (var i =0; i < countrySpec.length; i++){
                let percent = countrySpec[i].TotalConfirmed/globalSpec * 100;
                const country = {
                    'Country': countrySpec[i].Country,
                    'PercentageConfirmed': percent
                };
                objectArr.push(country);
            };
        })
        .catch(error => {
            console.log(error);
        });
    objectArr.sort((a, b) => (a.PercentageConfirmed < b.PercentageConfirmed) ? 1 : -1)

    res.send(objectArr);
});

const server = app.listen(8081, function () {
    const port = server.address().port;
    
    console.log("API 1 listening at http://localhost:%s/percentageconfirmed", port);
});