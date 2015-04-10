var express = require('express');
var fs = require('fs');
var request = require("request");
var bodyParser = require('body-parser');



//var jokes = require("../model/jokes");

var router = express.Router();

var path = __dirname.substr(0,__dirname.lastIndexOf("\\"));  //Remove the routes part
/*
router.get('/', function(req, res, next) {
    res.render('index', { user: req.session.userName });
});
*/

router.get('/home', function(req, res) {
   res.render('home',{quote: {"quote" : "A clear conscience is usually the sign of a bad memory", "author"  :  "Unknown", category: "general"}});
});

router.get('/cat/:topic', function(req, res) {

    var topic =  req.params.topic;

    var getTopic = {
        url: "http://localhost:4000/api/quote/"+topic,
        method: 'GET',
        json: true
    };

    request(getTopic, function (error, response, body) {
        if(!error && response.statusCode === 200){
            return res.render('quotes',{quote: body});
        }
    });
    //res.render('quotes',{quote: "test tester test..."});
});



router.get('/pageA', function(req, res) {
    var getTopic = {
        url: "http://localhost:4000/api/quote",
        method: 'GET',
        json: true
    };

    request(getTopic, function (error, response, body) {
        if(!error && response.statusCode === 200){
            return res.render('jadeA',{text: body});
        }
    });

  });




router.get('/addQuote', function(req, res) {
    res.render('addQuote');
});


router.get('/delQuote', function(req, res) {
    res.render('delQuote');
});


router.get('/signUp', function(req, res) {
   res.render('signUp');
  });

router.get('/pageB', function(req, res) {
   res.render('jadeB');
  });

router.get('/login', function(req, res) {
   res.render('login');
  });

module.exports = router;