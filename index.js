var express = require('express');
var path = require('path');
var app = express();
var db = require("./db");
var bodyParser = require('body-parser')


app.use(bodyParser());

app.use('/', express.static(path.join(__dirname, 'build')));

app.get('/api', function (req, res) {
    res.send('Hello World!')

});

app.get('/api/users', function(req, res){
    db.getUsers(function(err, result){
        res.send(result);
    });
});

app.post('/api/user', function(req, res){
    db.addUser(req.body, function(){
        res.send();
    });
})

app.post('/api/comment', function(req, res){
    db.addComment(req.body, function(){
        res.send();
    });
});

app.get('/api/comments', function(req, res){
   db.getComments(function(err, result){
        res.send(result); 
   }); 
});


app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
