'use strict';

const debug = false;

// Native dependencies
const https = require('https');
const dns = require('dns');

// config.json creation wizard
require('child_process')
	.spawnSync('node', [ 'initialsetup.js' ], { stdio: 'inherit' });

// API shit
const config = require('./config.json');
const { TelegramBot } = require('telebotframework');
const TwitterPackage = require('twitter');
const bot = new TelegramBot(process.env.TOKEN || config.telegram.token);
const Twitter = new TwitterPackage(config.twitter);

// NPM dependencies
const geoip = require('geoip-lite');
const math = require('mathjs');
const pt = require('periodic-table');
const util = require('periodic-table/util');
const pubchem = require('pubchem-access')
	.domain('compound');
const jsdom = require('jsdom/lib/old-api.js');

// Includes
const {
	jokes, help, nigger,
	actions, hitler, weeb,
	nameFirst, nameLast, fortune
} = require('./modules/jsons.js');
const VM = require('./modules/vm.js');
const DrugRPG = require('./modules/drugrpg.js');
const getPubchemImage = require('./modules/pubchemimage.js');

// Global vars and shit
const adminID = [ config.telegram.creator ];
const rpg = new DrugRPG();
const vm = new VM();
let day = 0;
const runningGames = {};

// Global functions and shit
const { date, rand, capitalizeFirstLetter, caps } = require('./utils');

const getRandomName = () => rand(nameFirst) + ' ' + rand(nameLast);

// Logging lmao
const saveMessage = require('./modules/logger')(bot);

// getMe
bot.username = 'bot';
https.get('https://api.telegram.org/bot' + config.telegram.token + '/getMe',
	res => {
		let data = '';
		res.on('data', d => data += d);
		res.on('end', () => {
			data = JSON.parse(data).result;
			if (debug) console.log('/getMe: ', data);
			bot.id = data.id;
			bot.first_name = data.first_name;
			bot.username = data.username;
		});
	});

// Botmagic happens here lmao
bot.startLongpolling();

bot.on('text', saveMessage);

bot.on('text', msg => {

	if (debug) {
		console.log('Date: ' + date());
		console.log('Text: ' + JSON.stringify(msg.text));
		console.log('From: ' + JSON.stringify(msg.from));
		console.log('Chat: ' + JSON.stringify(msg.chat) + '\n');
	}

	if (0 === msg.text.indexOf('/')) {

		const commandArgs = msg.text.split(/\s+/);
		let command = commandArgs.shift();
		[ command ] = command.substr(1).split('@');
		command = command.toLowerCase();
		let commandText = commandArgs.join(' ');
		const { id } = msg.from;
		let text = '';

		switch (command) {

		// Standard bot commands
		case 'start':
			msg.answer('Hello ' + (msg.from.username
				? '@' + msg.from.username
				: msg.from.first_name) +
			', I am @' + bot.username + '\n' + help);
			break;

		case 'help':
			msg.answer('Hello ' + (msg.from.username
				? '@' + msg.from.username
				: msg.from.first_name) +
				'I am @' + bot.username + ' ,created by [@]bdnugget\n' + help);
			break;

		case 'debug':
			bot.API.sendMessage(msg.chat.id,
				'<pre>' + JSON.stringify(msg.rawMessage, null, '  ') + '</pre>',
				'HTML');
			break;

		// Eval JS
		case 'eval':
			if (
				-1 !== commandText.indexOf('setTimeout') &&
				-1 !== adminID.indexOf(id)
			) {
				msg.answer('no setTimeout because fuck you nigger');
			} else {
				let context;
				if (vm.exists(msg.from.id)) {
					context = vm.get(msg.from.id);
					context.stdout.removeAllListeners('data');
					context.stdout.unpipe();
				} else {
					context = vm.create(msg.from.id);
				}
				context.stdout.on('data', data => {
					bot.API.sendMessage(msg.chat.id, String(data));
				});
				context.run(commandText);
			}
			break;

		case 'killeval':
			if (vm.exists(msg.from.id)) {
				vm.destroy(msg.from.id);
				bot.API.sendMessage(msg.chat.id, 'Killed sandbox process');
			} else {
				bot.API.sendMessage(msg.chat.id, 'No process active');
			}
			break;


		case 'killallevals':
			if (-1 === adminID.indexOf(id)) {
				bot.API.sendMessage(msg.chat.id, 'Not authorized');
			} else {
				vm.destroyAll();
				bot.API.sendMessage(msg.chat.id, 'Killed all processes');
			}
			break;

		// General non-trolling
		case 'geoip': {
			let geo = geoip.lookup(commandArgs[0]);
			if (geo)
				bot.API.sendLocation(msg.chat.id, geo.ll[0], geo.ll[1]);
			else
				dns.lookup(commandArgs[0], (err, addr) => {
					if (err) return bot.API
						.sendMessage(msg.chat.id, 'Error: ' + err.message);
					geo = geoip.lookup(addr);
					return geo
						? bot.API.sendLocation(msg.chat.id,
							geo.ll[0], geo.ll[1])
						: bot.API.sendMessage(msg.chat.id, 'Not found');
				});
			break;
		}

		case 'math':
			try {
				const result = math.eval(commandText);
				msg.answer(String(result));
			} catch (err) {
				if (0 < err.message.length)
					msg.answer('Error: ' + String(err.message));
			}
			break;

		// General trolling
		case 'twat':
			if (commandText) {
				const tweet = commandText + ' - ' + msg.from.first_name;
				if (140 >= tweet.length)
					Twitter.post('statuses/update', {
						status: tweet
					}, (err) => {
						if (err)
							msg.answer(err);
						msg.answer(
							'Messaged tweeted https://twitter.com/rambodildo');
					});
				else
					msg.answer('Too long, you boner!');
			} else {
				msg.answer('You forgot your message retard');
			}
			break;

		case 'gayname':
			msg.answer(msg.from.first_name + ' aka ' + getRandomName());
			break;

		case 'monopoly':
			msg.answer('Go to jail.');
			break;

		case 'fortune':
			msg.answer(rand(fortune));
			break;

		case 'lenny':
			bot.API.sendMessage(msg.chat.id, '( ͡° ͜ʖ ͡°)');
			break;

		case 'poopoo':
			for (let i = 0; i < Math.floor(Math.random() * 20); i++)
				text += '\u{1F4A9}';
			msg.answer(text);
			break;

		case 'apple':
			for (let i = 0; i < Math.floor(Math.random() * 20); i++)
				text += 0.5 > Math.random() ? '🍎' : '🍏';
			msg.answer(text);
			break;

		case 'nigger': {
			let commandNumber = parseInt(commandText);
			if (isNaN(commandNumber)) {
				msg.answer('nignog a number');
			} else {
				if (20 < commandNumber) commandNumber = 20;
				let i = 1;

				(function loopDaWoop() {
					setTimeout(() => {
						msg.answer('nigger ' + i);
						i++;
						if (i < commandNumber + 1)
							loopDaWoop();
					}, 1000);
				})();
			}
			break;
		}

		case 'jew':
			for (let i = 0; i < Math.floor(Math.random() * 20); i++)
				text += 0.5 > Math.random() ? '卐' : '卍';
			msg.answer(text);
			break;

		case 'sim':
			day++;
			msg.answer('Day ' + day + ': ' + rand(actions));
			break;

		case 'shout': {
			let userName = msg.from.first_name;
			userName = userName.replace(/Viktor/gi, 'Gay Viktor');
			userName = userName.replace(/Vincent/gi, 'Homo Vincent');
			userName = userName.replace(/Rico/gi, 'Rico the gay cucklord');
			userName = userName.replace(/Zed/gi, 'Zed the niggerfaggot');
			userName = userName.replace(/Panda/gi, 'Pandafaggot');

			const mapObj = {
				'i am': userName + ' is',
				'i\'m': userName + ' is',
				'ik ben': userName + ' is',
				'jeg er': userName + ' er'
			};

			commandText = commandText.toLowerCase();
			const shout = commandText.replace(/i am|i'm|ik ben|jeg er/gi,
				matched => mapObj[matched]);

			text += shout.toUpperCase();
			msg.answer(text + '!!!');
			break;
		}

		case 'n':
			msg.answer(rand(nigger));
			break;

		case 'kek':
			msg.answer(rand(jokes));
			break;

		case 'nignog': {
			let messageTextNig = '';
			for (let i = 1; 20 > i; i++) {
				let string = '';
				if (0 === i % 3)
					string += 'Nig';
				if (0 === i % 5)
					string += ('' === string ? '' : ' ') + 'Nog';
				if ('' === string)
					string += i;
				messageTextNig += string + '\n';
			}
			msg.answer(messageTextNig);
			break;
		}

		case 'sponge': {
			if (!commandText) commandText =
				'I\'m too retarded to type some text';
			const spongemock = caps(commandText);
			bot.API.sendPhoto({
				caption: spongemock,
				chat_id: msg.chat.id,
				photo: 'http://i1.kym-cdn.com/entries/icons/original/000/022/940/spongebobicon.jpg'

			});
			break;
		}

		// Admin only trolling
		case 'heilhitler':
			if (-1 === adminID.indexOf(msg.from.id))
				msg.answer('Heil Hitler');
			else
				for (let i = 0; i < hitler.length; i++)
					bot.API.sendSticker(msg.chat.id, hitler[i]);
			break;

		case 'terribleweebcancer':
			if (-1 === adminID.indexOf(msg.from.id))
				msg.answer('No');
			else
				for (let i = 0; i < weeb.length; i++)
					bot.API.sendSticker(msg.chat.id, weeb[i]);
			break;

		// Gay games
		case 'rpg':
			if ('function' === typeof rpg[commandArgs[0]]) {
				const [ action ] = commandArgs;
				const game = runningGames[msg.from.id] ||
					(runningGames[msg.from.id] = new DrugRPG());
				msg.answer(game[action](commandArgs[1]));
			} else {
				msg.answer(
					'Commands are: buy, make, sell, bribe, dealer and stats');
			}
			break;

		case 'kekget':
			for (let i = 0; i < Math.floor(Math.random() * 20); i++)
				text += 0.5 > Math.random() ? 'K' : 'E';
			if ('KEK' === text)
				bot.API.sendMessage(msg.chat.id, text + '\nYOU WIN TOPKEK!!!');
			else if ('KKK' === text)
				bot.API.sendMessage(msg.chat.id, text +
					'\nYOU WIN TOPKKK HEIL HITLER!!!');
			else if ('KEKKEK' === text)
				bot.API.sendMessage(msg.chat.id, text +
					'\nYOU WIN DOUBLE TOPKEKKEK!!!');
			else if ('KEKKEKKEK' === text)
				bot.API.sendMessage(msg.chat.id, text +
					'\nYOU WIN ULTIMATE TRIPLE TOPKEKKEKKEK!!!');
			else if ('KEKKEKKEKKEK' === text)
				bot.API.sendMessage(msg.chat.id, text +
					'\nQUADDRUPPLE TOPKEKKEKKEKKEK!!! YOU ARE GAY!!!');
			else if ('KEKKEKKEKKEKKEK' === text)
				bot.API.sendMessage(msg.chat.id, text +
					'\nQUINTUPLE TOPKEKKEKKEKKEKKEK!!! UNBELIEVABLE M8!!!');
			else
				bot.API.sendMessage(msg.chat.id, text +
					'\nLength: \n' + text.length);
			break;

		case 'bjstart':
			// Placeholder for an actual BJ game
			msg.answer('👌 ' + msg.from.first_name +
				' is bust.\nThe dealer draws cards 10♥️, A♠️ (21)\n💰' +
				msg.from.first_name + ' loses all money.');
			break;

		// Chemistry                    
		case 'cas':
			pubchem
				.setName(commandText)
				.getCas()
				.execute((data, status) =>
					1 === status
						? msg.answer(data + ' ')
						: msg.answer(data + ', status: ' + status));
			break;

		case 'mol':
			getPubchemImage(commandText)
				.then(image => msg.answer(image))
				.catch(() => msg.answer('Structure not found'));
			break;

		case 'synonym':
			pubchem
				.setName(commandText)
				.getNames(5)
				.execute(data =>
					msg.answer(
						data[0] + ', ' +
						data[1] + ', ' +
						data[2] + ', ' +
						data[3] + ', ' +
						data[4]));
			break;

		case 'prop':
			pubchem
				.setName(commandText)
				.getProperties([
					'IUPACName',
					'MolecularWeight',
					'MolecularFormula',
					'CanonicalSMILES'
				])
				.execute(data =>
					msg.answer(
						'IUPAC name: ' + data.IUPACName +
						',\nMW: ' + data.MolecularWeight +
						',\nFormula: ' + data.MolecularFormula +
						', \nSMILES: ' + data.CanonicalSMILES));
			break;

		case 'medchem':
			pubchem
				.setName(commandText)
				.getProperties([
					'IUPACName',
					'XLogP',
					'Complexity',
					'HBondDonorCount',
					'HBondAcceptorCount',
					'RotatableBondCount',
					'TPSA'
				])
				.execute(data =>
					msg.answer(
						'IUPAC name: ' + data.IUPACName +
						',\nXLogP: ' + data.XLogP +
						',\nComplexity: ' + data.Complexity +
						', \nH-bond donors: ' + data.HBondDonorCount +
						', \nH-bond acceptors: ' + data.HBondAcceptorCount +
						', \nRotatable bonds: ' + data.RotatableBondCount +
						', \nTopological polar surface area: ' + data.TPSA));
			break;

		case 'sym':
			commandText = capitalizeFirstLetter(commandText);
			if (pt.symbols[commandText])
				msg.answer(pt.symbols[commandText].name + '');
			else if (pt.elements[commandText])
				msg.answer(pt.elements[commandText].symbol + '');
			else
				msg.answer('Not found!');
			break;

		case 'mw': {
			const regex = /((Uu[a-z]|[A-Z][a-z]?)\d*)/g;
			const mol = (commandText.match(regex) || []).join(' ');
			try {
				msg.answer('The molar mass of ' + commandText +
					' is: ' + util.atomicMass(mol) + 'g/mol');
			} catch (e) {
				if (e instanceof TypeError)
					msg.answer('Error, improper formatting, kek');
				else
					throw e;
			}
			break;
		}

		case 'mass':
			// volume(L), molariteit(mol/L), formulemolmassa
			// commandArgs[0], commandArgs[1], mol
			try {
				const regex = /((Uu[a-z]|[A-Z][a-z]?)\d*)/g;
				const mol = (commandArgs[2].match(regex) || []).join(' ');
				const molmassa = util.atomicMass(mol);
				const moles = commandArgs[0] * commandArgs[1];
				const gram = moles * molmassa;
				msg.answer(gram + ' grams of ' + commandArgs[2] +
					' needed for ' + commandArgs[0] + 'L ' +
					commandArgs[1] + 'M solution.');
			} catch (e) {
				if (e instanceof TypeError)
					msg.answer('improper formatting');
				else
					throw e;
			}
			break;

		case 'volume':
			// massa(g), molariteit(mol/L), formulemolmassa
			// commandArgs[0], commandArgs[1], mol
			try {
				const regex = /((Uu[a-z]|[A-Z][a-z]?)\d*)/g;
				const mol = (commandArgs[2].match(regex) || []).join(' ');
				const molmassa = util.atomicMass(mol);
				const moles = commandArgs[0] / molmassa;
				const volume = moles / commandArgs[1];
				msg.answer(volume + ' liter per ' + commandArgs[0] +
					' grams needed for a ' + commandArgs[1] + 'M ' +
					commandArgs[2] + ' solution ');
			} catch (e) {
				if (e instanceof TypeError)
					msg.answer('improper formatting');
				else
					throw e;
			}
			break;

		case 'molar':
			// massa(g), volume(L), formulemolmassa
			// commandArgs[0], commandArgs[1], mol
			try {
				const regex = /((Uu[a-z]|[A-Z][a-z]?)\d*)/g;
				const mol = (commandArgs[2].match(regex) || []).join(' ');
				const molmassa = util.atomicMass(mol);
				const moles = commandArgs[0] / molmassa;
				const molair = moles / commandArgs[1];
				msg.answer(commandArgs[0] + ' grams of ' +
					commandArgs[2] + ' per ' +
					commandArgs[1] + ' liter is ' +
					molair + ' molar');
			} catch (e) {
				if (e instanceof TypeError)
					msg.answer('improper formatting');
				else
					throw e;
			}
			break;

		case 'bp':
			commandText = capitalizeFirstLetter(commandText);
			if (pt.symbols[commandText]) {
				const celsius =
					Number(pt.symbols[commandText].boilingPoint) - 273;
				msg.answer('The boiling point of ' + commandText + ' is ' +
					pt.symbols[commandText].boilingPoint + ' K or ' +
					celsius + 'ºC');
			} else if (pt.elements[commandText]) {
				const celsius =
					Number(pt.elements[commandText].boilingPoint) - 273;
				msg.answer('The boiling point of ' + commandText + ' is ' +
					pt.elements[commandText].boilingPoint + ' K or ' +
					celsius + 'ºC');
			} else {
				msg.answer('Not found!');
			}
			break;

		case 'mp':
			commandText = capitalizeFirstLetter(commandText);
			if (pt.symbols[commandText]) {
				const celsius =
					Number(pt.symbols[commandText].meltingPoint) - 273;
				msg.answer('The melting point of ' + commandText + ' is ' +
					pt.symbols[commandText].meltingPoint +
					' K or ' + celsius + 'ºC');
			} else if (pt.elements[commandText]) {
				const celsius =
					Number(pt.elements[commandText].meltingPoint) - 273;
				msg.answer('The melting point of ' + commandText + ' is ' +
					pt.elements[commandText].meltingPoint + ' K or ' +
					celsius + 'ºC');
			} else {
				msg.answer('Not found!');
			}
			break;

		case 'density':
			commandText = capitalizeFirstLetter(commandText);
			if (pt.symbols[commandText])
				msg.answer('The density of ' + commandText + ' is ' +
					pt.symbols[commandText].density + ' g/cm^3');
			else if (pt.elements[commandText])
				msg.answer('The density of ' + commandText + ' is ' +
					pt.elements[commandText].density + ' g/cm^3');
			else
				msg.answer('Not found!');
			break;

		case 'config':
			commandText = capitalizeFirstLetter(commandText);
			if (pt.symbols[commandText])
				msg.answer('The electronic configuration ' + commandText +
					' is ' + pt.symbols[commandText].electronicConfiguration);
			else if (pt.elements[commandText])
				msg.answer('The electronic configuration ' + commandText +
					' is ' + pt.elements[commandText].electronicConfiguration);
			else
				msg.answer('Not found!');
			break;


		case 'year':
			commandText = capitalizeFirstLetter(commandText);
			if ('object' === typeof pt.symbols[commandText])
				if ('Ancient' === pt.symbols[commandText].yearDiscovered)
					msg.answer(commandText + ' is known since ancient times');
				else
					msg.answer(commandText + ' was discovered in ' +
						pt.symbols[commandText].yearDiscovered);
			else if ('object' === typeof pt.elements[commandText])
				if ('Ancient' === pt.elements[commandText].yearDiscovered)
					msg.answer(commandText + ' is known since ancient times');
				else
					msg.answer(commandText + ' was discovered in ' +
						pt.elements[commandText].yearDiscovered);
			else
				msg.answer('Not found!');
			break;

		case 'os':
			commandText = capitalizeFirstLetter(commandText);
			if (pt.symbols[commandText])
				msg.answer(commandText + ' has the oxidation states: ' +
					pt.symbols[commandText].oxidationStates);
			else if (pt.elements[commandText])
				msg.answer(commandText + ' has the oxidation states: ' +
					pt.elements[commandText].oxidationStates);
			else
				msg.answer('Not found!');
			break;

		case 'balance':
			jsdom.env(
				'http://www.webqc.org/balance.php?reaction=' +
				encodeURIComponent(commandText), (err, win) => {
					if (err) return;
					const equation = win.document
						.querySelector('td.center > b')
						.textContent;
					const reaction = win.document
						.querySelector('td.center > br')
						.nextSibling
						.textContent;
					msg.answer(equation + '\n' + reaction);
				});
			break;

		default:
			break;
		}
	}
});

bot.on('inline_query', q =>
	bot.API.answerInlineQuery({
		cache_time: 0,
		inline_query_id: q.id,
		results: [ {
			id: '1',
			input_message_content: {
				message_text: rand(jokes)
			},
			title: 'Kek',
			type: 'article'
		} ]
	}));


bot.on('location', msg => {
	bot.API.forwardMessage({
		chat_id: '@fatboner',
		from_chat_id: msg._rawMessage.chat.id,
		message_id: msg._rawMessage.message_id
	}, msg);
});

bot.on('photo', saveMessage);
