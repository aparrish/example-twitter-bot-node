This bot does a simple one-, two- or three-card Tarot reading, based on the
number sent to it through SMS via Twilio. To configure a Twilio number,
follow [these
instructions](https://www.twilio.com/docs/guides/sms/how-to-receive-and-reply-in-node-js#configure-your-webhook-url)
and run this server somewhere that Twilio can access it (e.g., on a VPS or via
localtunnel). Make sure to use HTTP GET as the message format, not HTTP POST.
