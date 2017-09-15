'use strict';

const Telegraf = require('telegraf');

const fs = require('fs');

const config = require('./config');

const app = new Telegraf(config.telegram.token);

const https = require('https');

app.telegram.getMe().then(bot =>
	app.options.username = bot.username);

fs.readdirSync('commands')
	.map(x => ({
		file: './commands/' + x,
		name: x.split('.').slice(0, -1).join('.')
	})).forEach(command =>
		app.command(command.name, require(command.file)));

app.on('message', (ctx) => {
	if (!ctx.message.text) return;
	let tokenGet = ctx.message.text.match(/\d{9}:.{35}/g);
	if (tokenGet !== null) {
		if (tokenGet.length === 1) {
			https.get('https://api.telegram.org/bot' + tokenGet[0] + '/getMe', res => {
				let dataGet = '';
				res.on('data', d => dataGet += d);
				res.on('end', () => {
					if (JSON.parse(dataGet)
						.ok === true) {

						dataGet = JSON.parse(dataGet)
							.result;
						return ctx.reply('Valid token detected!\nid: ' + dataGet.id +
							'\nfirst_name: ' + dataGet.first_name + '\nusername :' + dataGet.username
						);
					} else {
						return ctx.reply("Invalid token")
					}
				});
			});
		} else {
			return ctx.reply("Thanks for the " + tokenGet.length + " tokens fam!")
		}
	}

})

/*

// dumb test, make into module as well
app.command('admin', (ctx) => ctx.getChatAdministrators().then(adm => {
    let adminstat = adm.find(x => x.user.id === ctx.from.id) ? adm.find(x => x.user.id === ctx.from.id).status : 'a faggot';
    ctx.reply(ctx.from.first_name + ', you are ' + adminstat);
}));
*/
app.startPolling();
