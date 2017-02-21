var fs = require('fs');
var http = require('http');
var express = require('express');
var twilio = require('twilio');
var shuffle = require('shuffle-array'); // for drawing cards at random

var app = express();

var tarotData = JSON.parse(fs.readFileSync("tarot_interpretations.json"));

app.get('/sms', function(req, res) {
    var cardCount = parseInt(req.query.Body);
    var twiml = new twilio.TwimlResponse();
    if (!cardCount) {
        twiml.message("I didn't understand that. How many cards do you want?");
    }
    else if (cardCount > 3) {
        twiml.message("Too many cards. Try 1, 2 or 3.");
    }
    else {
        // the .slice() method returns a copy of the underlying array.
        // we want a copy so we don't mess with the original data.
        var cards = tarotData['tarot_interpretations'].slice();
        shuffle(cards);

        // now, put together the response text based on the cards drawn.
        var names = [];
        for (var i = 0; i < cardCount; i++) {
            names.push(cards[i].name);
        }
        // randomly choose between the various interpretative fields in the
        // tarot json.
        var interpretations = [];
        for (var i = 0; i < cardCount; i++) {
            var x = Math.random();
            if (x < 0.333) {
                interpretations.push("* " + choice(cards[i].keywords));
            }
            else if (x < 0.666) {
                interpretations.push("* " + choice(cards[i].meanings.light));
            }
            else {
                interpretations.push("* " + choice(cards[i].meanings.shadow));
            }
        }
        var message = names.join(", ") + "\n\n";
        message += interpretations.join("\n");
        twiml.message(message);
    }
    res.writeHead(200, {"Content-Type": "text/xml"});
    res.end(twiml.toString());
});

http.createServer(app).listen(4000, function() {
    console.log("Express server listening on port 4000");
});

function choice(t) {
    return t[Math.floor(Math.random()*t.length)];
}
