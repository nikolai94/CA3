var mongoose = require( 'mongoose' );


//Uncomment if you are going to use a local instance or add connection details for your account on MongoLab
var dbURI = 'mongodb://localhost/quotes';

mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

process.on('SIGINT', function() {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through app termination');
    process.exit(0);
  });
});

/** Add SCHEMAS HERE ** */
// schema Users
var userSchema = new mongoose.Schema({
    firstName : {type : String, unique : true},
    lastName : String,
    userName : String,
    phone : Number,
    passWord : String

});
//quotes schema
var quoteSchema = new mongoose.Schema({
    topic : {type : String},
    author : String,
    reference : String,
    quote : String
});
//schema RemoteServers
var remoteServers = new mongoose.Schema({
    URL : {type : String},
    topic : String,
    authors : String

});

mongoose.model("user", userSchema);
mongoose.model("quotes", quoteSchema);
mongoose.model("remoteserver", remoteServers);
