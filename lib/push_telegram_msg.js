require('dotenv').config(); // get .env var

const Slimbot = require('slimbot');
const slimbot = new Slimbot(process.env.TELEGRAM_BOT_TOKEN);
const chat_id = process.env.TELEGRAM_CHAT_ID;

function sendMessage(message) {
    chat_id.split(",").forEach(id => {
        slimbot.sendMessage(id, message)
        .then(message => {
            console.log(new Date() + ' Informasi sudah terkirim!');
        });
    });
    
    return ;
}

module.exports = { sendMessage };