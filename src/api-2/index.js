//npm install express axios

'use strict';
const express = require('express');  
const app = express(); 
const axios = require('axios');

const uri = 'https://api.covid19api.com/summary';

app.get('/newconfirmed', async function(req, res) {
    let objectArr = [];
    const response = await axios.get(uri)
        .then(response => {
            const countrySpec = response.data.Countries;
            for (var i =0; i < countrySpec.length; i++){
                const country = {
                    'Country': countrySpec[i].Country,
                    'NewConfirmed': countrySpec[i].NewConfirmed
                };
                objectArr.push(country);
            }
        })
        .catch(error => {
            console.log(error);
        });
    objectArr.sort((a, b) => (a.NewConfirmed > b.NewConfirmed) ? 1 : -1);
    res.send(objectArr.slice(0, 10));
});

const server = app.listen(8081, function () {
    const port = server.address().port;
    
    console.log("API 2 listening at http://localhost:%s/newconfirmed", port);
});