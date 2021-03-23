// alternate 1
// const lib = require("./get_user_tweets");
// lib.getUserTweets();

// alternative 2 using post 
var axios   = require('axios');

function run(twitterSource, telegram, twitterDest){
    axios(twitterSource.config)
    .then(function (response) {
        var newest_id = response.data.meta.newest_id;
        var ret = twitterSource.tweetChecker(newest_id);
        var msg = response.data.data[0].text
                    + "\n\nLihat lebih detil:\n"
                    +'https://twitter.com/'+ process.env.TWITTER_USER_ID
                    +'/status/'
                    +newest_id;
        if (ret){
            console.log(new Date() + ' Mengirim pesan ke telegram...');
            telegram.sendMessage(msg);

            console.log(new Date() + ' Mengirim pesan ke twitter...');
            twitterDest.sendUpdate(msg);
        }
    })
    .catch(function (error) {
    console.log(error);
    });
}

module.exports = { run };