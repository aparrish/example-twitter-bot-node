This is a sample bot that shows how to use the Search API to create a corpus of
text and then creatively compose text based on that corpus. It searches for the
phrase `bots are` on Twitter and attempts to construct a first-person plural
sentence based on the results. It keeps track of the ID of the most recent
matching tweet to ensure fewer repeats. Best to run it in cron once or twice a
day or so.
