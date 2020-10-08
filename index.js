//require express
var express = require('express');
//require body-parser
var bodyParser = require('body-parser');
// require mongoos
var mongoose = require("mongoose");
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

//Connection Information for Mongo
const Todo = require('./models/todo.model');
const mongoDB =  'mongodb+srv://BBarker12:pEntEOIzud4MgLgK@cluster0.4pbhi.mongodb.net/todolist?retryWrites=true&w=majority'
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//couple of items todo
var tasks = [];
//completed items
var completed = [];

//get home page /
app.get('/', function(req, res){
    //query to mongoDB for todos
    Todo.find(function(err, todo){
        if(err){
            console.log(err);
        }else{
            tasks = [];
            completed = [];
            for(i = 0; i< todo.length; i++){
                if(todo[i].done){
                    completed.push(todo[i].item)
                }else{
                    tasks.push(todo[i])
                }
            }
        }
    });
    //return something to home page
    res.render('index', {tasks: tasks, completed: completed}); //add completed variable to ejs
});

//add post method /addtask
app.post('/addtask', function(req, res){
    let newTodo = new Todo({
        item: req.body.newtask,
        done: false
    })
    newTodo.save(function(err, todo){
        if (err){
            console.log(err)
        } else {
            //return index
            res.redirect('/');
        }
    });
});

//remove post method /removetask
app.post('/removetask', function(req, res){
    var id = req.body.check;
     if(typeof id === 'string'){
         Todo.updateOne({_id: id},{done:true},function(err){
             if(err){
                 console.log(err)
             }
         })
     }else if(typeof id === 'object'){
         for (var i = 0; i < id.length; i++){
             Todo.updateOne({_id: id[i]},{done:true},function(err){
                 if(err){
                     console.log(err)
                 }
             })
         }
     }
     res.redirect('/');
 });

 app.post('/deleteTodo', function(){
     // write the function for delete using ID
     // handle for single and multiple delete requests (req.body.delete)
     // Todo.deleteOne(id, function(err){})
 })

//server setup
app.listen(port, function(){
    console.log('Listening on ' + port)
});