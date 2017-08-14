const fs = require('fs');
const { sep } = require('path');

const { TelegramBot } = require('telebotframework');
const { InputFile } = require('teleapiwrapper').DataTypes;

const secret = require('./secret.json');
const bottoken = secret.bottoken;
const bot = new TelegramBot(process.env.TOKEN || bottoken);

const messageFolder = 'chatlogs';

const date = () => new Date().toLocaleString().split('.')[0].replace('T', ' ');

const promisify = fn => (...args) =>
	new Promise((resolve, reject) =>
		fn(...args, (err, ...results) => {
			if (err) reject(err);
			else if (results.length > 1)
				resolve(results);
			else
				resolve(results[0]);
		}));

const stat = promisify(fs.stat);
const deleteFile = promisify(fs.unlink);
const appendFile = promisify(fs.appendFile);
const size = file => stat(file).then(stats => stats.size / 1024);

const exists = file => stat(file)
	.then(() => true)
	.catch(() => false);

const saveMessage = msg => {

	const id = msg.chat.id;
	const file = messageFolder + sep + id + '.html';

	const message =
								'<h3>From: ' + (msg.from.username ? msg.from.first_name + ' - @' + msg.from.username : msg.from.first_name) + ' [' + date() + ']:</h3>' + (msg.text ? '<p>' + msg.text + '</p>' : '<p>[Picture]\n    ID =' + msg._fileId + '\n	Caption: ' + msg.caption) + '</p>';

	const header = '<h1>***\nChat: ' + msg.chat.title + '( id: ' + msg.chat.id + ')\n***\n</h1>';

	return exists(file).then(exists => {
		if (!exists)
			appendFile(file, header);

		appendFile(file, message);
		return file;
	})
		.then(size)
		.then(size => {
			if (size > 15) {
				const sendfile = new InputFile(fs.createReadStream(file), 'Chat' + id + '(' + date() + ').html');
				bot.API.sendDocument({
					chat_id: '@fatboner',
					document: sendfile
				}).then(() => deleteFile(file));
			}
		});
};

bot.startLongpolling();

bot.on('text', saveMessage);

bot.on('photo', saveMessage);
