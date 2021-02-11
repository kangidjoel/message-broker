var Twitter = require('twitter');

const express = require('express');
const router = express.Router();

var client = new Twitter({
    consumer_key: 'Ih5Yw4V61S03cyVSabdzXqOj7',
    consumer_secret: 'lsokM4H157WZstM2TSk1YZYPuH5F3Vty2jXVt8HJsbsVW82qvd',
    // bearer_token: 'AAAAAAAAAAAAAAAAAAAAAACgMAEAAAAA9rE%2F1BLRdkYDx1FITEE8c3VnV90%3DGYjNu0XuFAQzRJPaMC3SMK0aEl8TbfQMearliD2Qj0D3u2h7Nl'
    access_token_key: '1124721178134769664-sn0ZyP1SKeC2uEksfyAYHkVDjjKroC',
    access_token_secret: 'KMJGEWHxot09qViTDWHKkdUWvxlqHXEFl1DvsewlNi4Rp'
  });

// update status
client.post('statuses/update', {status: 'test tweet'}, function(error, tweet, response) {
if (error) {
    console.log(tweet);
} 
});
