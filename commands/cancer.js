'use strict';

const { commandText, niggerify } = require('../utils');

module.exports = ({ message, reply }) => {
    if(!commandText(message)) return reply('🅿️🅾️🅾️🅿️🤪🆑ℹ️✝️');
    return reply(niggerify(commandText(message), 4096));
}
