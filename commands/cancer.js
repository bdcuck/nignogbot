'use strict';

const { commandText, niggerify } = require('../utils');

module.exports = ({ message, reply }) => {
    const msg = commandText(message.reply_to_message) | commandText(message)
    if(!msg) return reply('🅿️🅾️🅾️🅿️🤪🆑ℹ️✝️');
    return reply(niggerify(msg, 4096));
}
