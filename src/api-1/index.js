'use strict';
const express = require('express');  
const app = express(); 
const Countries = require('./object');
const axios = require('axios');

const uri = 'https://api.covid19api.com/summary';

app.get('/totalrecovered', async function(req, res) {
    const response = await axios.get(uri)
        .then(response => {
            const country = response.data.Countries;
            const countryArr = country.map(item => {
                const object = new Countries(item.Country, item.TotalRecovered);
                console.log(object);
            })
        })
        .catch(error => {
            console.log(error);
        });
    //res.send(response);
});

const server = app.listen(8081, function () {
    const port = server.address().port;
    
    console.log("API 1 listening at http://localhost:%s/totalrecovered", port);
});