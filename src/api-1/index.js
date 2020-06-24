'use strict';
const express = require('express');  
const app = express(); 
const Countries = require('./object');
const axios = require('axios');

const uri = 'https://api.covid19api.com/summary';

app.get('/totalrecovered', async function(req, res) {
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
    objectArr.sort((a, b) => (a.TotalRecovered < b.TotalRecovered) ? 1 : -1);
    let outArr = [];
    for (var i = 0; i <=10; i++){
        outArr[i] = objectArr[i].Country;
    }
    res.send(outArr);
});

const server = app.listen(8081, function () {
    const port = server.address().port;
    
    console.log("API 1 listening at http://localhost:%s/totalrecovered", port);
});