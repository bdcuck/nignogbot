'use strict';

const Telegraf = require('telegraf');
const fs = require('fs');
const config = require('./config');

const app = new Telegraf(config.telegram.token);

const log = require('./modules/log').register(app);

app.telegram.getMe().then(bot =>
	app.options.username = bot.username);

fs.readdirSync('commands')
	.map(x => ({
		file: './commands/' + x,
		name: x.split('.').slice(0, -1).join('.')
	})).forEach(command =>
		app.command(command.name, require(command.file)).catch((err) => console.log(err)));

app.hears(...require('./modules/tokenGet'));
app.hears(/\b(r8)\b/i, ({ reply }) => reply(`${(~~(Math.random() * 11) + 1)}/10`));

app.on('message', (ctx) => {
	if(!ctx.message.forward_from_chat) return;
	if(ctx.message.forward_from_chat.id === -1001089079027){
		
		ctx.getChatAdministrators().then(adm => {
			let warn = '⚠️⚠️⚠️⚠️⚠️\n';
			adm.forEach(x => {
				warn += ('@' + x.user.username + '\n');
			})
			warn += '⚠️⚠️⚠️⚠️⚠️\nPiece of shit arab .apk spam detected!'
			ctx.reply(warn);
		})
	}
}); 

app.on(['new_chat_members', 'new_chat_member', 'new_chat_participant'], ({ message, reply }) => {
	if(message.new_chat_member.is_bot && message.new_chat_member.username !== app.options.username && reply('⚠️ Bot detected!')) return;
	if(message.new_chat_member.language_code){
	if(message.new_chat_member.language_code === 'nl-NL' && reply('⚠️ Piece of shit Dutch stonerfag detected')) return;
	let arab = message.new_chat_member.language_code.match(/ar/g);
	if(arab === null) arab = [];
	if(arab.indexOf('ar') !== -1 && reply('⚠️ MUSLIM ARAB NIGGER SHIT DETECTED!')) return;
		}
	}
)

app.startPolling();
