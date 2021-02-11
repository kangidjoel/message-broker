require('dotenv').config(); // get .env var

var global    = require("./global_functions");
const userId  = process.env.TWITTER_USER_ID;
const baseURL = process.env.TWITTER_API.replace('userId', userId);

var config = {
    method: 'get',
    url: baseURL,
    headers: { 
      'Authorization': 'Bearer '+process.env.TWITTER_BEARER_TOKEN, 
    }
  };

function tweetChecker(tweet_id) {
    if(tweet_id && global.tweet_id.toString().trim()!=tweet_id){
        console.log(new Date() + ' Writing tweet newest_id...');
        // writing to file
        global.updateTweetId(tweet_id);
        global.tweet_id = tweet_id;
        return true;
    }
    return false;
}

module.exports = { tweetChecker, config };