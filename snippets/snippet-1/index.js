//npm install express
'use strict';
const express = require('express');  
const app = express(); 
const request = require('request');
const util = require('util');

const uri = 'https://api.covid19api.com/summary';

app.get('/snippet-1', function(req, res) {  
    req.pipe(request(util.format('%s', uri))).pipe(res);
});
 
const server = app.listen(8081, function () {
    const host = server.address().address;
    const port = server.address().port;
    
    console.log("Snippet 1 listening at http://%s:%s/snippet-1", host, port);
});
