'use strict';

const Telegraf = require('telegraf');

const fs = require('fs');

const config = require('./config');

const app = new Telegraf(config.telegram.token);

app.telegram.getMe().then(bot =>
	app.options.username = bot.username);

fs.readdirSync('commands')
	.map(x => ({
		file: './commands/' + x,
		name: x.split('.').slice(0, -1).join('.')
	})).forEach(command =>
		app.command(command.name, require(command.file)));
/*

// dumb test, make into module as well
app.command('admin', (ctx) => ctx.getChatAdministrators().then(adm => {
    let adminstat = adm.find(x => x.user.id === ctx.from.id) ? adm.find(x => x.user.id === ctx.from.id).status : 'a faggot';
    ctx.reply(ctx.from.first_name + ', you are ' + adminstat);
}));
*/
app.startPolling();
