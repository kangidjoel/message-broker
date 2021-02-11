var app     = require("./run.js")
var twitter = require("./lib/get_user_tweet_checker");
var telegram= require("./lib/push_telegram_msg");
var global  = require("./lib/global_functions");

const main = async (twitter,telegram) => {
    while(true) {
        await global.delay(3000);
        await app.run(twitter,telegram);
    }
}

console.log(new Date() + ' Initiating tweet id ');

global.tweet_id = global.readFile(process.env.LOCAL_FILENAME);

console.log( new Date() + ' tweet id ' + global.tweet_id);

let resp = main(twitter,telegram);
