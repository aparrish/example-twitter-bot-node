var twitterAPI = require('node-twitter-api');

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

    // a few different cases.
    // case 1: if the object is empty, simply return
    if (Object.keys(streamEvent).length === 0) {
        return;
    }

    // "event" key present for favorites and new followers
    else if (streamEvent.hasOwnProperty('event')) {
        var sourceHandle = streamEvent['source']['screen_name'];
        // a new follower!
        if (streamEvent['event'] == 'follow') {
            console.log("followed by @" + followerHandle);
            twitter.statuses(
                "update",
               {"status": "thank you for following, @" + followerHandle},
               accessToken,
               tokenSecret,
               function (err, data, resp) { console.log(err); }
            );
        }
        else if (streamEvent['event'] == 'favorite') {
            var favoritedTweetId = streamEvent['target']['id_str'];
            var screenName = streamEvent['source']['screen_name'];
            console.log("tweet id ",
                    favoritedTweetId,
                    " favorited by @",
                    screenName);
            twitter.statuses(
                "update",
               {"status": "thanks for favoriting my tweet, @" + screenName},
               accessToken,
               tokenSecret,
               function (err, data, resp) { console.log(err); }
            );
        }
    }

    // 'direct_message' key indicates this is an incoming direct message
    else if (streamEvent.hasOwnProperty('direct_message')) {
        var dmText = streamEvent['direct_message']['text'];
        var senderName = streamEvent['direct_message']['sender']['screen_name'];
        // streaming API sends us our own direct messages! skip if we're
        // the sender.
        if (senderName == myScreenName) {
            return;
        }
        // send a response!
        twitter.direct_messages(
            'new',
            {
                "screen_name": senderName,
                "text": "you just said '" + dmText + "'!"
            },
            accessToken,
            tokenSecret,
            function (err, data, resp) { console.log(err); }
        );
    }

    // otherwise, this was probably an incoming tweet. we'll check to see if
    // it starts with the handle of the bot and then send a response.
    else if (streamEvent.hasOwnProperty('text')) {
        if (streamEvent['text'].startsWith("@"+myScreenName+" ")) {
            var tweetId = streamEvent['id_str'];
            var tweeterHandle = streamEvent['user']['screen_name'];
            twitter.statuses(
                "update",
               {"status": "@" + tweeterHandle + " haha nice!",
                "in_reply_to_status_id": tweetId},
               accessToken,
               tokenSecret,
               function (err, data, resp) { console.log(err); }
            );
        }
    }

    // if none of the previous checks have succeeded, just log the event
    else {
        console.log(streamEvent);
    }
}
