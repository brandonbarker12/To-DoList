//require express
var express = require('express');

//create express object, call express
var app = express();

//tells app to use ejs for templates
app.set('view engine', 'ejs');

//get home page /
app.get('/', function(req, res){
    //return something to home page
    res.send('Hello World');
});

//server setup
app.listen(3000, function(){
    console.log('Listening!')
});