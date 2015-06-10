#An Example Twitter Bot

By [Allison Parrish](http://www.decontextualize.com/)

Written for node.js. Hey! Replace the `generateTweet()` function in `bot.js`
with a tweet-generating algorithm of your choice, and then schedule it to run
as a cron job using a command line like this:

    node bot.js APP_KEY APP_SECRET ACCESS_TOKEN TOKEN_SECRET

... replacing `APP_KEY` with your application key, `APP_SECRET` with your
application secret, `ACCESS_TOKEN` with your user's access token, and
`TOKEN_SECRET` with your user's access token secret.

##But where do I get these keys, tokens, and secrets?

That's a good question! [Here's a good walkthrough](https://github.com/aparrish/everywordbot#obtaining-twitter-authorization-credentials).

This repository includes an interactive command-line script, `get_tokens.js`,
which will guide you through the process of obtaining an access token and
token secret for a user with a given Twitter application.

##License

[CC0](https://creativecommons.org/about/cc0).

