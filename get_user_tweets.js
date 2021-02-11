require('dotenv').config(); // get .env var

// Get User Tweet timeline by user ID
// https://developer.twitter.com/en/docs/twitter-api/tweets/timelines/quick-start
const needle    = require('needle');
const fs        = require('fs'); // file server

// this is the ID for @TwitterDev
const userId    = process.env.TWITTER_USER_ID;
const url       = `https://api.twitter.com/2/users/${userId}/tweets`;

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const bearerToken = process.env.TWITTER_BEARER_TOKEN;

const getUserTweets = async () => {
    let userTweets = [];

    // we request the author_id expansion so that we can print out the user name later
    let params = {
        "max_results": 100,
        "tweet.fields": "created_at",
        "expansions": "author_id"
    }

    const options = {
        headers: {
            "User-Agent": "v2UserTweetsJS",
            "authorization": `Bearer ${bearerToken}`
        }
    }

    // let hasNextPage = true;
    let nextToken = null;
    let userName;
    console.log("Retrieving Tweets...");
    
    while(true){

        let resp = await getPage(params, options, nextToken);
        
        if (resp && resp.meta && resp.meta.result_count && resp.meta.result_count > 0) {
            userName = resp.includes.users[0].username;
            if (resp.data) {
                userTweets.push.apply(userTweets, resp.data);
                userTweets=userTweets[0];
                // userTweets.length < 1 ? '' : console.log(userTweets);
                // console.log(new Date() + `Tweets from ${userName} (user ID ${userId})!`);
            }
            userTweets = [];
            // return userTweets;
        } 
    }
}

// delay request
function delay(t, val) {
    console.log(new Date() + 'Waiting newer status...');
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(val);
        }, t);
    });
}

const getPage = async (params, options, nextToken) => {
    await delay(3000);

    if (nextToken) {
        params.pagination_token = nextToken;
    }

    try {
        const resp = await needle('get', url, params, options);

        if (resp.statusCode != 200) {
            console.log(`${resp.statusCode} ${resp.statusMessage}:\n${resp.body}`);
            return;
        }
        // file checker
        var ret = tweetIdChecker(resp);
        if (ret)
            return resp.body;
        return ;
    } catch (err) {
        throw new Error(`Request failed: ${err}`);
    }
}

function tweetIdChecker(resp) {
    var newest_id   = resp.body.meta.newest_id;
    var text        = readFile().split('=')[1];
    var content     = 'TWEET_ID=' + newest_id;

    if(text.toString().trim()!=newest_id){
        console.log('writing tweet newest_id...');
        // writing to file
        fs.writeFile('last_tweet_id', content, function (err) {
            if (err) return false;
            
        });
        return true;
    }
    return false;
}

function readFile(){
    try {
        const text = fs.readFileSync('last_tweet_id', 'utf8')
        return text;
      } catch (err) {
        console.error(err)
      }
}

// export function to be used in another file
module.exports = { getUserTweets };