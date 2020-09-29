//require express
var express = require('express');

//require body-parser
var bodyParser = require('body-parser');

//create express object, call express
var app = express();

//get port info
const port = process.env.PORT || 3000;

//tells app to use ejs for templates
app.set('view engine', 'ejs');

//make styles public
app.use(express.static("public"));

//tell app to use body-parser
app.use(bodyParser.urlencoded({extended: true}));

//couple of items todo
var tasks = ["go to class", "take out the trash"];

//completed items
var completed = ["extra work"];

//get home page /
app.get('/', function(req, res){
    //return something to home page
    res.render('index', {tasks: tasks}); //add completed variable to ejs
});

//add post method /addtask
app.post('/addtask', function(req, res){
    var newTask = req.body.newtask;
    tasks.push(newTask);
    //return index
    res.redirect('/');
});

//remove post method /removetask
app.post('/removetask', function(req, res){
    var removeTask = req.body.check;
    //push to completed
    if(typeof removeTask === 'string'){
        tasks.splice(tasks.indexOf(removeTask), 1);
    }else if(typeof removeTask === 'object'){
        for (var i = 0; i < removeTask.length; i++){
            tasks.splice(tasks.indexOf(removeTask[i]), 1);
        }
    }
    res.redirect('/');
});

//server setup
app.listen(port, function(){
    console.log('Listening on ' + port)
});