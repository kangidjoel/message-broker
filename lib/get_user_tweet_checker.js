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
        console.log(new Date() + ' Menulis tweet_id terbaru...');
        // writing to file
        global.updateTweetId(tweet_id);
        global.tweet_id = tweet_id;
        return true;
    }
    return false;
}

function tweetCheckerDB(tweet_params){
  var ret = false
  const conn = global.dbConnect()
  var qry = "SELECT 1 FROM tweet_obj WHERE tweet_id = " + tweet_params[0] + " OR LOWER(tweet_msg) LIKE LOWER('"+tweet_params[1].split("http")[0]+"%')"
  var values = tweet_params

  conn.query(qry,  (err,res) => {
    if (err) {
      console.log(err.stack)
      this.ret = 0;
    } else {
      this.ret = (res.rowCount>0) ? false : true
      if(this.ret){
        saveToDB(tweet_params);
      }
    }
  })

  return this.ret
}

async function saveToDB(tweet_params){
  console.log(new Date() + ' Simpan ke basis data...')
  var qry = 'INSERT INTO tweet_obj(tweet_id,tweet_msg) VALUES($1,$2) RETURNING *'
  var values = tweet_params
  const conn = global.dbConnect()
  try {
    const res  = await conn.query(qry, values)
    console.log(new Date() + ' Selesai simpan')
  } catch (err) {
    console.log('Error '+err.stack)
  }
}

module.exports = { tweetChecker, tweetCheckerDB, config };