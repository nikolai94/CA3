require("./db");

var mong = require("mongoose");

var User = mong.model("user");
var Quotes = mong.model("quotes");
var RemoteServers = mong.model("remoteserver");


/*var data = [
    {firstName: "TestNavn", lastName: "testLastName",userName :"testUser",phone : 12345678,passWord:"1234Pass"},
    {firstName: "aabb", lastName: "bbaa",userName :"aabb90",phone : 87654321,passWord:"aabbPass"}
];*/

//user
function createUser(data){
    User.create(data,function(err,user){
        if(err){
        return console.log(err);
        }

        return console.log(user);

    });
}

function findAllUser(){
    User.find(function(err,result){
        if(err)
            return console.log(err);

        console.log(result);
    });
    return result;
}


function findUserOnUsername (username,callback){

    User.findOne({ 'userName': username }, function (err, result) {
        if (err) return handleError(err);
        //console.log(result.firstName) // Space Ghost is a talk show host.
        callback = result.firstName;
    });
}

console.log(findUserOnUsername('aabb90',function(res){
    console.log(res);
}));


















