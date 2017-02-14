var twitterAPI = require('node-twitter-api');
var fs = require('fs');
var wordfilter = require('wordfilter'); // simple check for offensive language
var shuffle = require('shuffle-array'); // for selecting random array items
var util = require('util');

function main() {
    var consumerKey = process.argv[2];
    var consumerSecret = process.argv[3];
    var accessToken = process.argv[4];
    var tokenSecret = process.argv[5];

    var twitter = new twitterAPI({
        consumerKey: consumerKey,
        consumerSecret: consumerSecret});

    var sinceId = fs.readFileSync("since_id.txt").toString();
    if (!sinceId) {
        sinceId = 0;
    }

    twitter.search(
        {"q": '"bots are"',
         "since_id": sinceId,
         "result_type": "recent",
         "count": 100},
        accessToken,
        tokenSecret,
        function(error, data, response) {
            if (error) {
                console.log("something went wrong: " + util.inspect(error));
            }
            var statuses = data['statuses'];
            var descriptions = [];
            for (var i = 0; i < statuses.length; i++) {
                var thisText = statuses[i]['text'];
                // find where in the string "bots are" occurs
                var prefixIndex = thisText.indexOf("bots are ");
                if (prefixIndex != -1) {
                    // extract the rest
                    var restOfStringStart = prefixIndex + 9;
                    var desc = thisText.substring(restOfStringStart);
                    // remove a period if present
                    if (desc.endsWith(".")) {
                        desc = desc.slice(0, -1);
                    }
                    // use only clean, short descriptions
                    if (isClean(desc)) {
                        descriptions.push(desc);
                    }
                }
            }

            if (descriptions.length > 0) {
                // randomize and get up to the first three
                shuffle(descriptions);
                var firstFew = descriptions.slice(0, 3);
                var tweetText = "we are " + firstFew.join(", ");

                // update status with tweet text
                twitter.statuses("update",
                    {"status": tweetText},
                    accessToken,
                    tokenSecret,
                    function(error, data, response) {
                        if (error) {
                            console.log("error: " + util.inspect(error));
                        }
                    }
                );
            }

            // if we found any new statuses, update our since_id.txt with
            // the latest status
            if (statuses.length > 0) {
                sinceId = statuses[0].id_str;
                fs.writeFileSync("since_id.txt", sinceId, "utf8");
            }

        }
    );

}

function isClean(s) {
    if (s.indexOf('@') == -1 && s.indexOf('#') == -1 && s.length < 25
            && !wordfilter.blacklisted(s)) {
        return true;
    }
    else {
        return false;
    }
}

main();

