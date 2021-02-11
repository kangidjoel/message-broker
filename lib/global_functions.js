require('dotenv').config(); // get .env var

const fs     = require('fs'); // file server
var tweet_id = null;

function updateTweetId(newest_tweet_id){
    writeFile(process.env.LOCAL_FILENAME, newest_tweet_id);
}
// reading a file
function readFile(filename){
    try {
        const text = fs.readFileSync(filename, 'utf8')
        return text;
      } catch (err) {
        console.error(err)
      }
}

// writing to file
function writeFile(filename, content){
    fs.writeFile(filename, content, function (err) {
        if (err) return false;
    });
}

// delay request
function delay(t, val) {
    console.log(new Date() + ' Waiting newer status...');
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve(val);
        }, t);
    });
}

module.exports = {tweet_id, updateTweetId, readFile, delay };