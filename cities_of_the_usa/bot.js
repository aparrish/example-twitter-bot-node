// a twitter bot!

var twitterAPI = require('node-twitter-api');
var util = require('util');
var fs = require('fs');

function main() {
    var consumerKey = process.argv[2];
    var consumerSecret = process.argv[3];
    var accessToken = process.argv[4];
    var tokenSecret = process.argv[5];

    var twitter = new twitterAPI({
        consumerKey: consumerKey,
        consumerSecret: consumerSecret});

    var citiesData = JSON.parse(fs.readFileSync("us_cities.json"));
    var cities = citiesData["cities"];

    var counter = parseInt(fs.readFileSync("counter.txt").toString());

    twitter.statuses("update",
        {"status": cities[counter].city},
        accessToken,
        tokenSecret,
        function(error, data, response) {
            if (error) {
                console.log("something went wrong: " + util.inspect(error));
            }
        }
    );

    counter++;
    fs.writeFileSync("counter.txt", counter.toString(), "utf8");
}

main();

