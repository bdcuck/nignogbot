'use strict';

const { commandText } = require('../utils');

module.exports = ({ reply, message }) => {
	if (commandText(message)){ 
        return reply(`
        Message length: ${commandText(message).length}
        Twat characters remaining: ${commandText(message).length - 280}`);
    }
    return reply(`You forgot your message you bunghole.`);
};
