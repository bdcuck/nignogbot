'use strict';

const { commandText, niggerify } = require('../utils');

module.exports = ({ message, reply }) => {
    const msg = message.reply_to_message ? message.reply_to_message.text : commandText(message);
    if(!msg) return reply('🅿️🅾️🅾️🅿️🤪🆑ℹ️✝️');
    return reply(niggerify(msg, 4096));
}

module.exports.help = 'Turn messages into cancer. Usage: /cancer [message] or reply to message wth /cancer';
