//npm install express axios

'use strict';
const express = require('express');  
const app = express(); 
const axios = require('axios');

const uri = 'https://api.covid19api.com/summary';

app.get('/differenceconfirmed', async function(req, res) {
    let objectArr = [];
    const response = await axios.get(uri)
        .then(response => {
            const countrySpec = response.data.Countries;
            for (var i =0; i < countrySpec.length; i++){
                const country = {
                    'Country': countrySpec[i].Country,
                    'TotalConfirmed': countrySpec[i].TotalConfirmed
                };
                objectArr.push(country);
            }
        })
        .catch(error => {
            console.log(error);
        });
    let n = objectArr.length-1;
        
    let percentage = [];
    objectArr.sort((a,b) => (a.TotalConfirmed < b.TotalConfirmed) ? 1 : -1);

    //Percet Difference Math
    let percent = Math.abs(objectArr[0].TotalConfirmed - objectArr[n].TotalConfirmed);
    percent /= ((objectArr[0].TotalConfirmed + objectArr[n].TotalConfirmed) / 2);
    percent *= 100;

    const difference = {
        'CountryWithHighest': objectArr[0].Country,
        'CountryWithLowest': objectArr[n].Country,
        'PercentDifference': percent,
    };
    percentage.push(difference);

    res.send(percentage);
});

const server = app.listen(8081, function () {
    const port = server.address().port;
    
    console.log("API 3 listening at http://localhost:%s/differenceconfirmed", port);
});