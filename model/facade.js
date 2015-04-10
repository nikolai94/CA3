require("./db");

var mong = require("mongoose");

var User = mong.model("user");
var Quotes = mong.model("quotes");
var RemoteServers = mong.model("remoteserver");


var brugerOpret = [
    {firstName: "TestNavn", lastName: "testLastName",userName :"testUser",phone : 12345678,passWord:"1234Pass"},
    {firstName: "aabb", lastName: "bbaa",userName :"aabb90",phone : 87654321,passWord:"aabbPass"}
];

var quotesOpret = [
    { topic : "Work", author : "Pope paul vi", reference : "http://www.brainyquote.com", quote : "All life demands struggle. Those who have everything given to them become lazy, selfish, and insensitive to the real values of life. The very striving and hard work that we so constantly try to avoid is the major building block in the person we are today."},
    { topic : "Work", author : "Confucius", reference : "http://www.brainyquote.com", quote : "Choose a job you love, and you will never have to work a day in your life."},
    { topic : "Wisdom", author : "Audrey Hepburn", reference : "http://www.brainyquote.com", quote : "For beautiful eyes, look for the good in others; for beautiful lips, speak only words of kindness; and for poise, walk with the knowledge that you are never alone"},
    { topic : "Wisdom", author : "John C Maxwell", reference : "http://www.brainyquote.com", quote : "A man must be big enough to admit his mistakes, smart enough to profit from them, and strong enough to correct them."}
];

//user
function createUser(data){
    User.create(data,function(err,user){
        if(err){
        return console.log(err);
        }
        return console.log(user);

    });
}

function createQuote(data,callback){
    Quotes.create(data,function(err,quote){
        if(err){
            return callback(err);
        }

        callback(null,quote);

    })
};

    function findAllTopic(callback){

       Quotes.distinct('topic',function(err,result){

            if(err)
                return callback(err);

            callback(null,result);
        })
    };


function findAllQuotes(callback){

    Quotes.find(function(err,result){

        if(err)
            return callback(err);

       // callback(null,result);
        console.log(result);
    })
};





function findQuotesOnTopic(topic, callback){

   Quotes.find({ 'topic': topic }, function (err, result) {
       if (err) return callback(err);

      /* if (!result.length) {
           callback(null, "Topic does not exist");
       }*/
        callback(null, result);


    });
}


function checkIfUserExists(user,password,callback){
    User.findOne({userName : user },function(err,findUser){
        if(err) {
            return callback(err);
        }
        if(findUser != null && findUser.passWord === password){
            callback(null,true);
        } else
        {
            callback(null,false);
        }
    })
}

function delQuotes(id,callback) {


    Quotes.remove({ _id: id }, function(err) {
        if (!err) {
            return 'notification!';
        }
        else {
            return 'error';
        }
    });

}


/*
console.log(findUserOnUsername('aabb90',function(res){
    console.log(res);
}));
*/



module.exports = {
getAllTopic : findAllTopic,
    createQuote : createQuote,
    findAllQuotes : findAllQuotes,
    findQuotesOnTopic : findQuotesOnTopic,
    checkIfUserExists : checkIfUserExists,
    createUser: createUser,
    delQuotes : delQuotes
}









