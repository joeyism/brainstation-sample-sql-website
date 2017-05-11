var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(':memory:');
var q = require("q");

var users = [ 
    { "last_name": "Sham", "first_name": "Joey" },
    { "last_name": "Syed", "first_name": "Nabeel" } 
];
var comments = [{ id: 0, userid: 0, comment: "First Comment!" }];

db.serialize(function(){

    db.run("CREATE TABLE users (id int, last_name varchar(30), first_name varchar(30))");

    var stmt = db.prepare("INSERT INTO users VALUES (?, ?, ?)")
    users.forEach(function(user, i){
        stmt.run(i, user.last_name, user.first_name); 
    });
    stmt.finalize();

    db.run("CREATE TABLE comments(id int, userid int, comment varchar(200))");

    stmt = db.prepare("INSERT INTO comments VALUES (?, ?, ?)");
    comments.forEach(function(comment, i){
        stmt.run(i, comment.userid, comment.comment); 
    });
    stmt.finalize();

});

module.exports = {
    getUsers: function(callback){
        var result = [];
        db.each("select * from users", function(err, row){
            if (err){
                console.error(err);
                callback(err);
                return
            }
            result.push(row);
        }, function(){
            callback(null, result);
        });
    },

    addUser: function(user, cb){
        users.push(user);
        var query = "INSERT INTO users VALUES (" + users.length + 
               ", '" + user.last_name + 
               "', '"+ user.first_name + "')";
        console.log(query);

        db.run(query);
        cb();
    },

    addComment: function(opt, cb){
        comments.push(opt.comment);
        var query = "INSERT INTO comments VALUES (" + comments.length +
            ", " + opt.currentuser.id +
            ", '"+ opt.comment + "')";
        console.log(query);
        db.run(query);
        cb();
    },
    
    getComments: function(cb){
        var result = [];
        db.each("select * from comments join users where users.id = comments.userid", function(err, row){
            if (err){
                console.log(err);
                cb(err);
                return
            }
            result.push(row);
        }, function(){
            cb(null, result);  
        });
    }


};

