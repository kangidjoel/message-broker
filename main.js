/**/
var app             = require("./run.js")
var twitterSource   = require("./lib/get_user_tweet_checker");
var twitterDest     = require("./lib/post_tweet_update");
var telegram        = require("./lib/push_telegram_msg");
var global          = require("./lib/global_functions");

const main = async (twitterSource,telegram,twitterDest) => {
    while(true) {
        await global.delay(3000);
        await app.run(twitterSource,telegram,twitterDest);
    }
}

console.log(new Date() + ' Inisialisasi tweet_id ');

global.tweet_id = global.readFile(process.env.LOCAL_FILENAME);

console.log( new Date() + ' tweet id ' + global.tweet_id);

main(twitterSource,telegram,twitterDest);

/*============================================
var runner = require("child_process");
var phpScriptPath = "php_script/php_call.php";
var argsString = "value1,value2,value3";
runner.exec("php " + phpScriptPath + " " +argsString, function(err, phpResponse, stderr) {
 if(err) console.log(err); // log error 
console.log( phpResponse );
});
*/