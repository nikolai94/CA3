var express = require('express');
var router = express.Router();
var facade = require("../model/facade");

router.get('/api/quote', function(req,res,next)
{

    facade.getAllTopic(function(err,allQuotes){
        if(err) {return next(err);}

        res.send(JSON.stringify(allQuotes));
    res.end("");


})

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


