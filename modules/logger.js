'use strict';

const fs = require('fs');
const { sep } = require('path');
const { InputFile } = require('teleapiwrapper');
const { date, exists, appendFile, size, deleteFile } = require('../utils');
const config = require('../config.json');

const messageFolder = config.logger.folder;

const saveMessage = bot => msg => {
	const { id } = msg.chat;
	const file = messageFolder + sep + id + '.html';
	const message =
		'<h3>From: ' + (msg.from.username
			? msg.from.first_name + ' - @' + msg.from.username
			: msg.from.first_name) +
		' [' + date() + ']:</h3>' + (msg.text
			? '<p>' + msg.text + '</p>'
			: '<p>[Picture] ID= ' + msg._fileId + '</p>');
	const header = '<h1>***\nChat: ' + (msg.chat.title
		? msg.chat.title + '( id: ' + msg.chat.id + ') '
		: 'Private chat ') + '\n***\n</h1>';
	return exists(file).then(ex => {
		if (!ex)
			appendFile(file, header);
		appendFile(file, message);
		return file;
	})
		.then(size)
		.then(fileSize => {
			if (15 < fileSize) {
				const sendfile = new InputFile(
					fs.createReadStream(file),
					'Chat' + id + '(' + date() + ').html');
				bot.API.sendDocument({
					chat_id: config.logger.chat,
					document: sendfile
				}).then(() => deleteFile(file))
					.catch(() => console.log('Fucking unlink fail'));
			}
		});
};

module.exports = saveMessage;
