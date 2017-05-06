var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(':memory:');
var q = require("q");

var users = [ 
    { "last_name": "Sham", "first_name": "Joey" },
    { "last_name": "Syed", "first_name": "Nabeel" } 
];

db.serialize(function(){

    db.run("CREATE TABLE users (id int, last_name varchar(30), first_name varchar(30))");

    var stmt = db.prepare("INSERT INTO users VALUES (?, ?, ?)")
    users.forEach(function(user, i){
        stmt.run(i, user.last_name, user.first_name); 
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
    }


};

