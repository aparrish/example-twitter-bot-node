// a twitter bot!

var twitterAPI = require('node-twitter-api');
var util = require('util');

function choice(list) {
    return list[Math.floor(Math.random() * list.length)];
}

function generateTweet() {
    var meat = ["beef", "turkey", "veggie", "tofu", "black-bean", "buffalo"];
    var cheese = ["swiss", "gouda", "cheddar", "monterey jack", "brie"];
    var bun = ["brioche", "sesame-seed", "whole wheat"];
    var toppings = ["lettuce", "red onion", "tomatoes"];
    var condiments = ["mustard", "ketchup", "mayo", "sriracha",
        "garlic aioli"];
    return "a " + choice(meat) + " burger with " + choice(cheese) + ", " +
        choice(toppings) + " and " + choice(condiments) + " on a " +
        choice(bun) + " bun";
}

function main() {
    var accessToken = process.argv[4];
    var tokenSecret = process.argv[5];

    var twitter = new twitterAPI({
        consumerKey: process.argv[2],
        consumerSecret: process.argv[3]});

    twitter.statuses("update",
        {"status": generateTweet()},
        accessToken,
        tokenSecret,
        function(error, data, response) {
            if (error) {
                console.log("something went wrong: " + util.inspect(error));
            }
        }
    );
}

main();

