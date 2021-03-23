var Twitter = require('twitter');

const express = require('express');
const router = express.Router();

var tweet1 = new Twitter(
  {
    consumer_key: 'Ih5Yw4V61S03cyVSabdzXqOj7',
    consumer_secret: 'lsokM4H157WZstM2TSk1YZYPuH5F3Vty2jXVt8HJsbsVW82qvd',
    // bearer_token: 'AAAAAAAAAAAAAAAAAAAAAACgMAEAAAAA9rE%2F1BLRdkYDx1FITEE8c3VnV90%3DGYjNu0XuFAQzRJPaMC3SMK0aEl8TbfQMearliD2Qj0D3u2h7Nl'
    access_token_key: '1124721178134769664-sn0ZyP1SKeC2uEksfyAYHkVDjjKroC',
    access_token_secret: 'KMJGEWHxot09qViTDWHKkdUWvxlqHXEFl1DvsewlNi4Rp'
  }
);

var tweet2 = new Twitter({
  consumer_key: 'JNdZ1Blh9CcbMUfRFGJXmlXlG',
  consumer_secret: '9dZhSMux56tV2Ir6ky3ZHyePLKkq3DwjVWS1e5zVLUMWFzKh7M',
  access_token_key: '1373851745391050753-I3i9gYsnSoSeOPozuJoUsmrMOZ4B4X',
  access_token_secret: 'G4xqStqZHfVQD5qkK7TCFFuooS4ClfO4apRcwhEiLg4mC'
});

var bots = [tweet2];


function sendUpdate(message) {
  bots.forEach(bot => { 
    // update status
    bot.post('statuses/update', {status: message}, function(error, tweet, response) {
      if (error) {
        console.log(tweet);
      } else {
        console.log('Status telah ter-update');
      }
    });
  })
  return ;
}

module.exports = { sendUpdate };