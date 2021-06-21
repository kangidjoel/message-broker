// alternate 1
// const lib = require("./get_user_tweets");
// lib.getUserTweets();

// alternative 2 using post 
var axios   = require('axios');

function run(twitterSource, telegram){
    axios(twitterSource.config)
    .then(function (response) {
        var newest_id = response.data.meta.newest_id;
        var msg = response.data.data[0].text;
        /* pengecekan tweet_id menggunakan file
        var res = twitterSource.tweetChecker(newest_id);*/
        // pengecekan tweet_id menggunakan database
        var res = twitterSource.tweetCheckerDB([newest_id,msg]);
        
        if (response.data.data) {
            if(res){
                msg = response.data.data[0].text
                    + "\n\nLihat lebih detil:\n"
                    + 'https://twitter.com/'+ process.env.TWITTER_USER_ID
                    + '/status/'
                    + newest_id;
                sendMsg(telegram, msg);
            }
        }
    })
    .catch(function (error) {
        console.log(error);
    });
}

function sendMsg(telegram, msg){
    console.log(new Date() + ' Mengirim pesan ke telegram...');
    telegram.sendMessage(msg);    
}


module.exports = { run };