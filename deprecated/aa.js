'use strict';
const debug = true;
const fs = require('fs');
const { TelegramBot } = require('telebotframework');
const { InputFile } = require('teleapiwrapper').DataTypes;
const bottoken = '189472480:AAHfwwOrPLbqBYijmAnj9lct71pNhGM6i4o';
const bot = new TelegramBot(process.env.TOKEN || bottoken);
const https = require('https');
const request = require('request');

// Botmagic happens here lmao
bot.startLongpolling();

bot.on('photo', msg => {
    let ass;
    https.get('https://api.telegram.org/bot' + bottoken + '/getFile?file_id=' + msg._fileId, res => {
        let data = '';
        res.on('data', d => data += d);
        res.on('end', () => {
            data = JSON.parse(data)
                .result;
            if (debug) console.log(data);
            ass = data.file_path;
            request.defaults({encoding: null}).get('https://api.telegram.org/file/bot' + bottoken + '/' + ass, function(error, response, body) {
                if (!error && response.statusCode == 200) {
                    let pic = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
                    let str = '<img src="' + pic + '"/>'; 
                    fs.appendFile('./test.html', str);
                }
            });
        });
    });
});
