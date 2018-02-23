'use strict';

const { commandText, caps } = require('../utils');

module.exports = ({ replyWithPhoto, message }) => {
	let spongemock = message.reply_to_message ? message.reply_to_message.text : commandText(message);
	let id = message.reply_to_message ? message.reply_to_message.message_id : message.message_id;
	if (!spongemock) spongemock =
								'I\'m too retarded to type some text';
	spongemock = caps(spongemock);
	replyWithPhoto('http://i1.kym-cdn.com/entries/icons/original/000/022/940/spongebobicon.jpg', { caption: spongemock, reply_to_message_id: id });
};

module.exports.help = 'Spongebob cancer. Reply to a message with /sponge or type /sponge [message]';
