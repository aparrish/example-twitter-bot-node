#Example Twitter Bots!

By [Allison Parrish](http://www.decontextualize.com/)

Hey! This repository contains a number of simple Twitter
bots written in node.js. You can run almost all of these bots by installing the
appropriate libraries (with `npm install`) and then run the `bot.js` file in
the relevant directory like so:

    node bot.js APP_KEY APP_SECRET ACCESS_TOKEN TOKEN_SECRET

... replacing `APP_KEY` with your application key, `APP_SECRET` with your
application secret, `ACCESS_TOKEN` with your user's access token, and
`TOKEN_SECRET` with your user's access token secret.

Descriptions of individual bots are available in each directory.

##But where do I get these keys, tokens, and secrets?

That's a good question! [Here's a good walkthrough](https://github.com/aparrish/everywordbot#obtaining-twitter-authorization-credentials).

This repository includes an interactive command-line script, `get_tokens.js`,
which will guide you through the process of obtaining an access token and
token secret for a user with a given Twitter application.

##License

[CC0](https://creativecommons.org/about/cc0).

