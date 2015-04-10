global.TEST_DATABASE = "mongodb://localhost/TestDataBase_xx1243";
require("../model/db");

var facade = require("../model/facade");
var mongoose = require("mongoose");
var Quotes = mongoose.model("quotes");
var User = mongoose.model("user");
var should = require("should");



var quotesOpret = [
    { topic : "Work", author : "Pope paul vi", reference : "http://www.brainyquote.com", quote : "All life demands struggle. Those who have everything given to them become lazy, selfish, and insensitive to the real values of life. The very striving and hard work that we so constantly try to avoid is the major building block in the person we are today."},
    { topic : "Work", author : "Confucius", reference : "http://www.brainyquote.com", quote : "Choose a job you love, and you will never have to work a day in your life."},
    { topic : "Wisdom", author : "Audrey Hepburn", reference : "http://www.brainyquote.com", quote : "For beautiful eyes, look for the good in others; for beautiful lips, speak only words of kindness; and for poise, walk with the knowledge that you are never alone"},
    { topic : "Wisdom", author : "John C Maxwell", reference : "http://www.brainyquote.com", quote : "A man must be big enough to admit his mistakes, smart enough to profit from them, and strong enough to correct them."}
];

var brugerOpret = [
    {firstName: "TestNavn", lastName: "testLastName",userName :"testUser",phone : 12345678,passWord:"1234Pass"},
    {firstName: "aabb", lastName: "bbaa",userName :"aabb90",phone : 87654321,passWord:"aabbPass"}
];


//findAllTopic
describe ('Topic', function(){

    beforeEach(function (done){
        Quotes.remove({}, function () {
            Quotes.create(quotesOpret, function (err, newQuotes) {
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
    it("should find 2 topics", function (done) {

        facade.getAllTopic(function (err, quotess) {
            if (err) throw err;
            quotess.length.should.equal(2);
            done();
        })

    });
    it("should not find 2 equels topics", function (done) {

        facade.getAllTopic(function (err, quotess) {
            if (err) throw err;
            console.log(quotess[1]);
            quotess[1].should.not.equal(quotess[0]);
            done();
        })
    });

});

describe('quotes', function(){

    beforeEach(function (done){
        Quotes.remove({}, function () {
            Quotes.create(quotesOpret, function (err, newQuotes) {
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

    it("should find 2 quotes", function (done) {
        facade.findQuotesOnTopic("Work",function (err, quotess) {
            if (err) throw err;;
            quotess.length.should.equal(2);
            done();
        })
    });

    it("should find 1 specific quote 1 with topic work", function (done) {
        facade.findQuotesOnTopic("Work",function (err, quotess) {
            if (err) throw err;;
            quotess[0].quote.should.equal("All life demands struggle. Those who have everything given to them become lazy, selfish, and insensitive to the real values of life. The very striving and hard work that we so constantly try to avoid is the major building block in the person we are today.")
            done();
        })
    });

    it("should find 1 specific quote 2 with topic work", function (done) {
        facade.findQuotesOnTopic("Work",function (err, quotess) {
            if (err) throw err;;
            quotess[1].quote.should.equal("Choose a job you love, and you will never have to work a day in your life.")
            done();
        })
    });



        it("should add a quote", function (done) {
            var data = { topic : "Work", author : "jonathan", reference : "http://www.brainyquote.com", quote : "Protein til mullerne."};
            facade.createQuote(data, function (err, newquote) {
                if (err) throw err;
                newquote.quote.should.equal("Protein til mullerne.");
                done();
            });

        });
    });


describe ('User', function(){

    beforeEach(function (done){
        User.remove({}, function () {
            User.create(brugerOpret, function (err, newUser) {
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
    it("checker om user findes,returner false", function (done) {

        facade.checkIfUserExists("bob","bob",function (err, user) {
            if (err) throw err;
            user.should.equal(false);
            done();
        })
    });

    it("checker om user findes,returner true", function (done) {

        facade.checkIfUserExists("aabb90","aabbPass",function (err, user) {
            if (err) throw err;
            user.should.equal(true);
            done();
        })
    });

    it("should add a user", function (done) {
        var data = {firstName: "TestNavn", lastName: "testLastName",userName :"Bruger 3",phone : 12345678,passWord:"1234Pass"};
        facade.createUser(data, function (err, newUser) {
            if (err) throw err;
            newUser.userName.should.equal("Bruger 3");
            done();
        });

    });


});