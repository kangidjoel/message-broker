// alternate 1
// const lib = require("./get_user_tweets");
// lib.getUserTweets();

// alternative 2 using post 
var axios   = require('axios');

function run(twitter, telegram){
    axios(twitter.config)
    .then(function (response) {
        var ret = twitter.tweetChecker(response.data.meta.newest_id);
        if (ret){
            console.log(new Date() + ' Sending message...');
            telegram.sendMessage(response.data.data[0].text);        
        }
    })
    .catch(function (error) {
    console.log(error);
    });
}

module.exports = { run };