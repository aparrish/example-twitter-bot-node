var http = require('http');
var express = require('express');
var twilio = require('twilio');

var app = express();

app.get('/sms', function(req, res) {
    var input = req.query.Body;
    var twiml = new twilio.TwimlResponse();
    twiml.message(
        "Your message had " + input.length.toString() + " character(s)! Wow!!");
    res.writeHead(200, {"Content-Type": "text/xml"});
    res.end(twiml.toString());
});

http.createServer(app).listen(4000, function() {
    console.log("Express server listening on port 4000");
});
