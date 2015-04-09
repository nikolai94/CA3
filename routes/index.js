var express = require('express');
var router = express.Router();
var facade = require("../model/facade");
var bodyParser = require('body-parser');




router.get('/api/quote', function(req,res,next)
{
    facade.getAllTopic(function(err,allQuotes){
        if(err) {return next(err);}

        res.send(JSON.stringify(allQuotes));
    res.end("");


    })
});


router.get('/api/quote/:topic', function(req,res,next)
{
    var topic =  req.params.topic;
    facade.findQuotesOnTopic(topic,function(err,Quotes){
        if(err)
            return next(err);
        if(!Quotes.length){
            res.writeHead(400, {'Content-Type': 'text/plain'});
            res.end(JSON.stringify("Topic does not exist"));
        }
        else{
            res.send(JSON.stringify(Quotes));
        }


    })
    //res.send(par);
});



router.get('/api/quote/:topic/:ran', function(req,res,next)
{

    var topic =  req.params.topic;
    var ran =  req.params.ran;

    if(ran == "random"){

        facade.findQuotesOnTopic(topic,function(err,Quotes){
            if(err)
                return next(err);
            if(!Quotes.length){
                res.writeHead(400, {'Content-Type': 'text/plain'});
                res.end(JSON.stringify("Topic does not exist"));
            }
            else{
                var randomNum = Math.floor(Math.random() * Quotes.length);
                res.send(JSON.stringify(Quotes[randomNum]));
            }


        })

    }//close if

    //res.send(topic+" -- "+ran);
});



router.post('/api/quote', function(req, res, next) {
    var theJoke = req.body;
    //var obj = JSON.parse(theJoke);
    /*jokeFacade.addJoke({joke: theJoke},function(err,newJoke){
        if(err)
            return next(err);
        res.redirect("/addJoke");
    })*/
    //res.send(theJoke);

    facade.createQuote(theJoke ,function(err, newJoke){
        if(err)
            return next(err);
    })


    res.send(theJoke.topic);

});



/* GET home page. */
router.get('/', function (req, res) {
  //Will be true when the "login" part has been completed
  if (typeof req.session != "undefined" && typeof req.session.user != "undefined") {
    var user = req.session.user;
    res.render("main.ejs", {user: user});
  }
  else {
    res.render("main.ejs", {user: user});
  }
});

module.exports = router;


