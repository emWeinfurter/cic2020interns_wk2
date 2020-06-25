//npm install express axios

'use strict';
const express = require('express');  
const app = express(); 
const Countries = require('./object');
const axios = require('axios');

const uri = 'https://api.covid19api.com/summary';

app.get('/newconfirmed', async function(req, res) {
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
    objectArr.sort((a, b) => (a.NewConfirmed > b.NewConfirmed) ? 1 : -1);
    res.send(objectArr.slice(0, 10));
});

const server = app.listen(8081, function () {
    const port = server.address().port;
    
    console.log("API 1 listening at http://localhost:%s/newconfirmed", port);
});