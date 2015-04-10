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

    facade.createQuote(theJoke ,function(err, newJoke){
        if(err)
            return next(err);
    })


    res.send(theJoke.topic);

});


router.post('/addQuoteToDB', function(req, res, next) {
    var topic =  req.body.topic;
    var author =  req.body.author;
    var reference =  req.body.reference;
    var quote =  req.body.quote;

    var quoteObject = {topic : topic, author : author, reference : reference, quote : quote};

    facade.createQuote(quoteObject,function(err, newQuote){
        if(err)
            return next(err);
        console.log('newQuote:'+newQuote);
    });
    res.redirect("/");

});


router.post('/delQuoteInDB', function(req, res, next) {
    var id =  req.body.quoteId;
    res.send("Test"+id);
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

router.put('/api/quote/:topic/:id', function (reg, res) {
facade.updateQuote(reg.params.id,reg.body.quote, function (err,data) {
if(err){ res.send(JSON.stringify(err));}
})
});


module.exports = router;


