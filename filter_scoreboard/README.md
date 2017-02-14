This bot uses the `filter` endpoint of the Stream API to track two keywords:
`javascript` and `python`. Based on incoming tweets, it keeps "score" of how
often each term occurs. Occasionally, it tweets the current score. (Note: the
score is not persistent in this example; it'll reset whenever you restart the
bot.)
