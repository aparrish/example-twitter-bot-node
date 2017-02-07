var twitterAPI = require('node-twitter-api');
var RiTa = require('rita').RiTa;

var consumerKey = process.argv[2];
var consumerSecret = process.argv[3];
var accessToken = process.argv[4];
var tokenSecret = process.argv[5];
var myScreenName = process.argv[6];

var twitter = new twitterAPI({
    consumerKey: consumerKey,
    consumerSecret: consumerSecret});

twitter.getStream("user", {}, accessToken, tokenSecret, onData);

function onData(error, streamEvent) {
    if (streamEvent.hasOwnProperty('direct_message')) {
        var dmText = streamEvent['direct_message']['text'];
        var senderName = streamEvent['direct_message']['sender']['screen_name'];
        // streaming API sends us our own direct messages! skip if we're
        // the sender.
        if (senderName == myScreenName) {
            return;
        }
        var outgoingText;
        var noun = getRandomNoun(dmText);
        if (noun) {
            outgoingText = "sorry, I don't know anything about " + noun + ". ";
            var anotherNoun = getRandomNoun(dmText);
            outgoingText += "tell me more about " + anotherNoun + "?";
        }
        else {
            outgoingText = "haha okay tell me more?";
        }
        // send a response!
        twitter.direct_messages(
            'new',
            {
                "screen_name": senderName,
                "text": outgoingText
            },
            accessToken,
            tokenSecret,
            function (err, data, resp) { console.log(err); }
        );
    }
}

function getRandomNoun(text) {
    var tagged = RiTa.getPosTagsInline(text);
    var taggedWords = tagged.split(" ");
    var nouns = [];
    for (var i = 0; i < taggedWords.length; i++) {
        var parts = taggedWords[i].split("/");
        if (parts[1] == 'nn' || parts[1] == 'nns') {
            nouns.push(parts[0]);
        }
    }
    if (nouns.length > 0) {
        return nouns[Math.floor(Math.random()*nouns.length)];
    }
    else {
        return "";
    }
}
