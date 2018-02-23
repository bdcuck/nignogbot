'use strict';

const { commandText } = require('../utils');

module.exports = ({ reply, message }) => {
	if (commandText(message)){ 
        const msgLength = (commandText(message) + message.from.first_name + ' - ').length - 280
        return reply(`
        Message length: ${commandText(message).length}
        Twat characters ${msgLength < 0 ? 'remaining: ' + Math.abs(msgLength) : 'exceeded by: ' + Math.abs(msgLength)}`);
    }
    return reply(`You forgot your message you bunghole.`);
};

module.exports.help = 'Check message length before using /twat';
