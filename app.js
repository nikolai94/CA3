var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var partials = require('./routes/partials');
var facade = require('./model/facade');
var session = require("express-session");

// hej
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.locals.pretty = true;

 
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());



app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/partials', partials);

app.use(session({secret: 'very_sercret_3162735', saveUninitialized: true, resave: true}));


app.use(function (req, res, next) {
    var userName = req.session.userName;

    if (typeof(userName) !== "undefined") {
        next();
    }
    else
    {
        userName = req.body.userName;
        var password = req.body.password;

        if (typeof(userName) !== "undefined" && typeof(password !== "undefined"))
        {
            facade.checkIfUserExists(userName, password, function (err, result) {
                if (err || result === false) {
                    req.session.loginerror = "Wrong password or user name";
                }
                else {
                    req.session.userName = userName;
                    delete req.session.req.session.loginerror;
                }

                return res.render("main.ejs", {user: userName});
            })
        }
        else {
            req.url = "/login";
            return next();
        }
    }
});












// catch 404 and forward to error handler
app.use(function(req, res, next) {
   // var err = new Error('Not Found');
    //err.status = 404;
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end(JSON.stringify("URL does not exist"));
    //qnext(err);
});

// error handlers

// development error handler will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler. No stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
