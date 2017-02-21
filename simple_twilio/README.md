This is a simple Twilio bot that responds to SMS messages. All it does is tell
you the number of characters that you sent to it.  To configure a Twilio
number, follow [these
instructions](https://www.twilio.com/docs/guides/sms/how-to-receive-and-reply-in-node-js#configure-your-webhook-url)
and run this server somewhere that Twilio can access it (e.g., on a VPS or via
localtunnel). Make sure to use HTTP GET as the message format, not HTTP POST.
