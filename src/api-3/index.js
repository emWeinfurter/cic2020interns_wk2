'use strict';
const express = require('express');  
const app = express(); 
const Countries = require('./object');
const axios = require('axios');

const uri = 'https://api.covid19api.com/summary';

app.get('/differenceconfirmed', async function(req, res) {
    let objectArr = [];
    const response = await axios.get(uri)
        .then(response => {
            const countrySpec = response.data.Countries;
            const countryArr = countrySpec.map(index => {
                const country = new Countries();
                Object.assign(country, index);
                objectArr.push(country);
            })
        })
        .catch(error => {
            console.log(error);
        });
        
    let percentage = [];
    objectArr.sort((a,b) => (a.TotalConfirmed < b.TotalConfirmed) ? 1 : -1);
    percentage.push(objectArr[0]);

    objectArr.sort((a, b) => (a.TotalConfirmed > b.TotalConfirmed) ? 1 : -1);
    percentage.push(objectArr[0]);

    res.send(percentage);
});

const server = app.listen(8081, function () {
    const port = server.address().port;
    
    console.log("API 1 listening at http://localhost:%s/differenceconfirmed", port);
});