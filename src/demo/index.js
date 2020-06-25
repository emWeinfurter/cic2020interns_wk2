//npm install express axios

'use strict';
const express = require('express');  
const app = express(); 
const Countries = require('./object');
const axios = require('axios');

const uri = 'https://api.covid19api.com/summary';

//Top 10 Highest Total Recovered Cases
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
    res.send(objectArr.slice(0, 10));
});

//Top 10 Lowest New Confirmed Cases
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

//Percentage Between Total Confirmed (most and least)
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

    let percent = Math.abs(percentage[0].TotalConfirmed - percentage[1].TotalConfirmed);
    percent /= ((percentage[0].TotalConfirmed + percentage[1].TotalConfirmed) / 2);
    percent *= 100;

    const difference = {'PercentDifference': percent};
    percentage.push(difference);

    res.send(percentage);
});

//Percentage of Total by Country
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
    
    console.log("API 1 listening at http://localhost:%s/", port);
});