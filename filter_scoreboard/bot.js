var twitterAPI = require('node-twitter-api');

var consumerKey = process.argv[2];
var consumerSecret = process.argv[3];
var accessToken = process.argv[4];
var tokenSecret = process.argv[5];

var pythonScore = 0;
var javascriptScore = 0;

var twitter = new twitterAPI({
    consumerKey: consumerKey,
    consumerSecret: consumerSecret});

// the "filter" stream allows you to track specific terms. the onData
// callback is called whenever a tweet with that term appears.
twitter.getStream("filter", {"track": "javascript,python"}, accessToken,
        tokenSecret, onData);

// tweet score every five minutes (1000 milliseconds * 60 seconds * 5 minutes)
setInterval(tweetCurrentScore, 1000 * 60 * 5);

function onData(error, streamEvent) {
    // skip if empty
    if (Object.keys(streamEvent).length === 0) {
        return;
    }
    var text = streamEvent['text'].toLowerCase();
    if (text.indexOf('python') != -1) {
        pythonScore++;
    }
    if (text.indexOf('javascript') != -1) {
        javascriptScore++;
    }
}

function tweetCurrentScore() {
    var updateText = "current score: Python " + pythonScore + ", JavaScript " + javascriptScore;
    twitter.statuses(
        "update",
        {"status": updateText},
        accessToken,
        tokenSecret,
        function (err, data, resp) { console.log(err); }
    );
}
