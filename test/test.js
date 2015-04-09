global.TEST_DATABASE = "mongodb://localhost/TestDataBase_xx1243";
require("../model/db");

var facade = require("../model/facade");
var mongoose = require("mongoose");
var Quotes = mong.model("quotes");
var should = require("should");
//var assert = require("assert");

//findAllTopic
describe ('Quotes', function(){
    var testQuotes = [{Quotes: "quotes1"}, {Quotes: "quotes2"}, {Quotes: "quotes3"}]

    beforeEach(function (done){
        Quotes.remove({}, function () {
            Quotes.create(testQuotes, function (err, newQuotes) {
                done();
            })
        });
    });
    after(function (done) {
        //Uncomment the lines below to completely remove the test database after the tests
        if (global.TEST_DATABASE) {
            mongoose.connection.db.dropDatabase();
        }
        done();
    });
    it("should find 3 Quotes", function (done) {
        facade.findAllQuotes(function (err, quotes) {
            if (err) throw err;
            quotes.length.should.equal(3);
            done();
        })
    });
    it("should pass", function (){
        done();
    });
});
