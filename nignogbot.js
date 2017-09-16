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
		app.command(command.name, require(command.file)));

app.hears(...require('./modules/tokenGet'));

app.on([
	'new_chat_members',
	'new_chat_member',
	'new_chat_participant'
], ({ message, reply }) =>
	message.new_chat_member.is_bot &&
	message.new_chat_member.username !== app.options.username &&
	reply('⚠️ Bot detected!'));

/*
// dumb test, make into module as well
app.command('admin', (ctx) => ctx.getChatAdministrators().then(adm => {
    let adminstat = adm.find(x => x.user.id === ctx.from.id)
    	? adm.find(x => x.user.id === ctx.from.id).status
	: 'a faggot';
    ctx.reply(ctx.from.first_name + ', you are ' + adminstat);
}));
*/
app.startPolling();
