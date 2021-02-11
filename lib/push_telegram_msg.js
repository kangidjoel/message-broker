require('dotenv').config(); // get .env var

const Slimbot = require('slimbot');
const slimbot = new Slimbot(process.env.TELEGRAM_BOT_TOKEN);
const chat_id = process.env.TELEGRAM_CHAT_ID;

function sendMessage(message) {
    slimbot.sendMessage(chat_id, message)
        .then(message => {
            console.log(new Date() + ' Message sent!');
    });
    return ;
}

module.exports = { sendMessage };