'use strict';

const debug = false;

const https = require('https');

const dns = require('dns');

const { sep } = require('path');
const { TelegramBot } = require('telebotframework');
const { InputFile } = require('teleapiwrapper').DataTypes;
const token = '154196684:AAFyqozS9uT4pu1b0Bw6esq81AThs98UlEk';
const bot = new TelegramBot(process.env.TOKEN || '154196684:AAFyqozS9uT4pu1b0Bw6esq81AThs98UlEk');
bot.on('error', err => console.log(err.name + ': ' + err.message));
const stream = require('stream');

const geoip = require('geoip-lite');

// const BotAPI = require("teleapiwrapper").BotAPI;

// let api = new BotAPI(token);

const math = require('mathjs');

const fs = require('fs');

const pt = require('periodic-table');

const request = require('request');

const TwitterPackage = require('twitter');

const secret = {
	consumer_key: 'tSnVJHPzMo1565Suu2Tgrfi4j',
	consumer_secret: 'DSa5HyiYgWZRqO5dWfOFjAEp0RkJwVsWOvdYvpVlvEyswcJTn3',
	access_token_key: '830472943171932160-ftwPkC96JRxLWFCoppv8LdfuvQt8Ks2',
	access_token_secret: '3WBznJJHoaO8Lq0tvICimUYToSn8QZnVXBOMd0CVI7vIU'
};
const Twitter = new TwitterPackage(secret);

function rand(nigger) {
	return nigger[Math.floor(Math.random() * nigger.length)];
}


// logging


const messageFolder = 'chatlogs';
const date = () => new Date().toLocaleString().split('.')[0].replace('T', ' ');

const promisify = fn => (...args) =>
	new Promise((resolve, reject) =>
		fn(...args, (err, ...results) => {
			if (err) reject(err);
			else
			if (results.length > 1)
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
			if (size > 15)
			//               const sendfile = new InputFile(fs.createReadStream(file), 'Chat' + id + '(' + date() + ').html');
				bot.API.sendDocument({
					chat_id: '@fatboner',
					document: fs.createReadStream(file)
				}).then(() => deleteFile(file));

		});
};

// end logging

let day = 0;

const nigger = require('./nigger.json');

const actions = require('./actions.json');

const jokes = require('./jokes.json');

const atom = require('./atom.json');

const atomNL = require('./atomNL.json');

const util = require('periodic-table/util');

const pubchem = require('pubchem-access')
	.domain('compound');

const jsdom = require('jsdom');

const DrugRPG = require('./drugrpg.js');

const runningGames = {};

const rpg = new DrugRPG();

const pants = false;

const underpants = false;

const sit = false;

const hitler = require('./hitlerStickers.json');

const weeb = require('./weebStickers.json');

const users = JSON.parse(fs.readFileSync('users.json'));

const nameFirst = [ 'Area 51', 'Axe Wound', 'Baby Cannon', 'Bearded Clam', 'Beaver', 'Bleeding Meat Socket',
	'Breakfast of Champions', 'Broad Faced Chicken', 'Bumsen', 'Box', 'Castle', 'Cave', 'Cavernous Gash',
	'Choot', 'Cockpit', 'Cocksheath', 'Coin Purse', 'Cigar Box', 'Clam', 'Clit', 'Clowns Pocket', 'Cock Pocket',
	'Cooch', 'Coochie', 'Coo-chi Snorcher', 'Cooter', 'Cunny', 'Cunt', 'Danger Clam', 'Dragon\'s Lair', 'Dugout',
	'Face Flower', 'Falcon Crest', 'Fanny', 'Fanny Boo', 'Feedbag', 'Feesh', 'Fillet', 'Fish', 'FUPA',
	'Front-Butt', 'Fuddi', 'Gammon Flaps', 'Gaping Dragon', 'Gash', 'Gine', 'Granny\'s Celler',
	'Gretchin\'s Grabber', 'Growler', 'Ham wallet', 'Hayloft', 'Hole', 'Honey Pot', 'Lady Flower', 'Lion\'s Den',
	'Lucifer\'s Cradle', 'Man\'s Downfall', 'Meat Curtains', 'Meat Wallet', 'Meat Socket',
	'Melissa\'s Mop Buckett', 'Minge', 'Muff', 'Muffin', 'Neden', 'Nookie', 'Patchouli', 'Peggy\'s Parlor',
	'Zach Nance Mag', 'Pickle Jar', 'Pink Sink', 'Pink Taco', 'Piss Flaps', 'Piss Hole', 'Pooki', 'Poon',
	'Poontang', 'Pootie', 'Pot Hole', 'Punaani', 'Puss', 'Pussy', 'Pussy Cat', 'Pussyche', 'Rosebud',
	'Rumpled Slit Skin', 'Sarah\'s Saddlebag', 'Sausage Wallet', 'Shame Cave', 'Side-ways Smile', 'Slit',
	'Slot Machine', 'Snapper', 'Snatch', 'Strange', 'Stench Trench', 'Stink Box', 'Taco', 'Tamale',
	'The Great Australian Bite', 'The Great Depression', 'Toad', 'Tonton', 'Trim', 'Tuna Purse', 'Tuna Town',
	'Tutu', 'Twat', 'Twinkle Cave', 'Vag', 'Vagoo', 'Va-Jay-Jay', 'Valarie\'s Stinkhole', 'Velvet purse',
	'Vertical Smile', 'Virginia Belle', 'Whispering eye', 'Wizard\'s Sleeve', 'Wuss', 'Yawning Chasm',
	'Yogurt Gun Holster', 'Yoni', 'ankle spanker', 'baby-arm', 'beaver basher', 'bed snake', 'best friend',
	'blue-vein sausage', 'penis sangbo nam rod', 'baby-maker', 'bell on a pole', 'beef whistle', 'boomstick',
	'burrito', 'bishop', 'bratwurst', 'braciole', 'candle', 'captain', 'choad', 'chopper', 'cock', 'cranny axe',
	'cum gun', 'custard launcher', 'dagger', 'deep-V diver', 'dick', 'dickie', 'ding dong mcdork', 'dingus',
	'disco stick', 'dog head', 'drum stick', 'dong', 'donger', 'dork', 'dude piston', 'dragon', 'eggroll',
	'Easy Rider', 'Excalibur', 'fang', 'ferret', 'flesh flute', 'flesh tower', 'foto', 'fire hose', 'fuck rod',
	'fuck stick', 'fudge sickle', 'fun stick', 'groin ferret', 'giggle stick', 'goofy goober', 'hairy hotdog',
	'heat-seeking moisture missile', 'helmet head', 'hose', 'hog', 'jackhammer', 'Jimmy', 'John', 'Johnson',
	'John Thomas', 'joystick', 'kickstand', 'king sebastian', 'knob', 'krull the warrior king', 'lap rocket',
	'leaky hose', 'lingam', 'little Alex', 'little Bob', 'little Elvis', 'lizard', 'longfellow', 'love muscle',
	'love rod', 'love stick', 'love whistle', 'luigi', 'manhood', 'man umbrella', 'meat popsicle', 'meat stick',
	'meat sword', 'meat injection', 'member', 'meter long king kong dong', 'microphone', 'middle stump',
	'mushroom head', 'mutton', 'netherrod', 'old boy', 'old fellow', 'old man', 'one-eyed anaconda',
	'one-eyed trouser-snake', 'one-eyed monster', 'one-eyed wonder weasel', 'one-eyed wonder worm',
	'one-eyed yogurt slinger', 'pecker', 'Pedro', 'peepee', 'Percy', 'peter', 'Pied Piper', 'Pig skin bus',
	'pink oboe', 'pink torpedo', 'piss weasle', 'piston', 'plug', 'pnor', 'poinswatter', 'pork sword', 'prick',
	'princess sophia', 'private eye', 'private part', 'purple-helmeted warrior of love',
	'purple-headed yogurt flinger', 'quiver bone', 'rod', 'rod of pleasure', 'roundhead', 'sausage',
	'sebastianic sword', 'schlong', 'schlong dongadoodle', 'schmuck, shmuck', 'schnitzel', 'schwanz', 'schwarz',
	'sea monster', 'shaft', 'short arm', 'single serving soup dispenser', 'skin flute', 'soldier',
	'spawn hammer', 'stick shift', 'sub', 'surfboard', 'Tallywhacker', 'Tan Bannana', 'tassle', 'third leg',
	'thumper', 'thunderbird 3', 'thundersword', 'tinker', 'todger', 'tonk', 'tool', 'trouser snake',
	'tubesteak', 'twig', 'twinkie', 'uncle dick', 'vein', 'wand', 'wang', 'wang doodle', 'wanger',
	'wedding tackle', 'wee wee', 'whoopie stick', 'wiener', 'Wiener Schnitzel', 'wick', 'willy',
	'wing dang doodle', 'winkie', 'yingyang', 'yogurt gun'
];

const nameLast = [ 'Destroyer', 'Demolisher', 'Killer', 'Wrecker', 'Pounder', 'Penetrator', 'Slayer', 'Torturer',
	'Twister', 'Gobler', 'Slaughterer', 'Assassin', 'Exterminator'
];


const save = (function () {
	let ID;
	return function (file) {
		clearTimeout(ID);
		ID = setTimeout(() => fs.writeFile('users.json', JSON.stringify(file, undefined, '\t')), 1000);
	};
})();

const fortune = [ 'Your fortune: Excellent Luck', 'Your fortune: Good Luck', 'Your fortune: Average Luck', 'Your fortune: Bad Luck', 'Your fortune: Good news will come to you by mail', 'Your fortune: （　´_ゝ`）ﾌｰﾝ', 'Your fortune: ｷﾀ━━━━━━(ﾟ∀ﾟ)━━━━━━ !!!!', 'Your fortune: You will meet a dark handsome stranger', 'Your fortune: Better not tell you now', 'Your fortune: Outlook good', 'Your fortune: Very Bad Luck', 'Your fortune: Godly Luck ', 'Your fortune: Reply hazy, try again' ];

const VM = require('./vm.js');
const vm = new VM();

const adminID = [ 126131628, 312106580 ];

const help = 'Available commands: \n' +
				'    /help - Displays this message\n' +
				'-=Chemistry of the elements=-\n' +
				'    /sym [symbol/name] - Symbol or name of the element\n' +
				'    /mp [symbol] - Shows the melting point\n' +
				'    /bp [symbol] - Shows the boiling point\n' +
				'    /year [symbol] - Shows the year of discovery\n' +
				'    /os [symbol] - Shows the possible oxidation states\n' +
				'    /config [symbol] - Shows the electronic configuration\n' +
				'    /density [symbol] - Shows the density\n' +
				'-=General chemistry=-\n' +
				'    /mw [formula] - Calculate molar mass\n' +
				'    /mass [L, M, formula] - Grams needed for xL yM solution\n' +
				'    /molar [g, L, formula] - Calculates molarity of solution\n' +
				'    /volume [g, M formula] - L needed for yM solution from xgms\n' +
				'    /synonym [molecule] - Gives up to 5 synonyms for a compound\n' +
				'    /prop [molecule] - Gives various general properties a compound\n' +
				'    /medchem [molecule] - Various medicinal chemistry properties\n' +
				'    /cas [molecule] - Retrieves the CAS number of a compound\n' +
				'-=Other commands=-\n' +
				'    /eval [JavaScript] - Evaluate JavaScript\n' +
				'    /killeval - Kill sandbox process\n' +
				'    /wis [formula] - Calculator\n' +
				'    /geoip [ip] - Shows location of server\n' +
				'    /sim - Nigger SimCity 3000\n' +
				'    /rpg [buy, sell, make, bribe, stats] - Drug RPG\n' +
				'    /n - Nigger synonyms\n' +
				'    /kek - Nigger jokes\n' +
				'    /shout [text] - SHOUT!!!\n' +
				'    /jew - Display random swastikas\n' +
				'    /apple - Display random apples';

bot.username = 'bot';


String.prototype.capitalizeFirstLetter = function () {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

function getRandomName() {
	let name = '';
	let i = Math.floor(Math.random() * nameFirst.length);
	name += nameFirst[i];
	i = Math.floor(Math.random() * nameLast.length);
	name += ' ' + nameLast[i];
	return name;
}


https.get('https://api.telegram.org/bot' + token + '/getMe', res => {
	let data = '';
	res.on('data', d => data += d);
	res.on('end', () => {
		data = JSON.parse(data)
			.result;
		if (debug) console.log('/getMe: ', data);
		bot.id = data.id;
		bot.first_name = data.first_name;
		bot.username = data.username;
	});
});


bot.startLongpolling();


bot.on('text', msg => {

	saveMessage(msg);

	const getLastActiveString = function (user) {
		if (user)
			return new Date(user.lastChanged).toISOString().split('.')[0].replace('T', ' ');

	};

	const dateSent = new Date().toLocaleString().split('.')[0].replace('T', ' ');
	if (debug) console.log('Date: ' + dateSent);
	if (debug) console.log('Text: ' + JSON.stringify(msg.text));
	if (debug) console.log('From: ' + JSON.stringify(msg.from));
	if (debug) console.log('Chat: ' + JSON.stringify(msg.chat) + '\n');
	//    
	//    if (msg.from.id === 273365631){
	//        msg.answer("here come dat panda")
	//    }
	//    
	if (msg.text.indexOf('/') === 0) {

		const commandArgs = msg.text.split(/\s+/);
		let command = commandArgs.shift();
		command = command.substr(1)
			.split('@')[0];
		command = command.toLowerCase();
		let commandText = commandArgs.join(' ');
		const domain = '';
		let text = '';


		switch (command) {


		case 'twat':

			if (commandText) {
				const tweet = commandText + ' - ' + msg.from.first_name;
				if (tweet.length < 141)
					Twitter.post('statuses/update', { status: tweet }, (error, tweet, response) => {
						if (error)
							msg.answer(error);

						msg.answer('Messaged tweeted https://twitter.com/rambodildo');
						//                          console.log(tweet);  // Tweet body.
						//                          console.log(response);  // Raw response object.
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


		case 'start':

			msg.answer(
				'Hello ' + (msg.from.username ? '@' + msg.from.username : msg.from.first_name) +
																				', I am @' + (() => bot.username)() + '\n' + help

			);
			break;


		case 'fortune':

			msg.answer(rand(fortune));

			break;


		case 'add':

			if (!users[msg.chat.id]) users[msg.chat.id] = {};

			users[msg.chat.id][msg.from.id] = msg.from;
			users[msg.chat.id][msg.from.id].bio = commandText;
			users[msg.chat.id][msg.from.id].lastChanged = Date.now();
			save(users);
			msg.answer('Bio updated');
			break;

		case 'list':
			let userFound = false;
			let userID;
			commandText = commandText.toLowerCase();
			if (commandText.toLowerCase() === 'all') {
				for (const k in users[msg.chat.id])
					if (users[msg.chat.id][k].lastChanged != undefined)
						msg.answer(users[msg.chat.id][k].first_name + ': ' + users[msg.chat.id][k].bio + '\nLast update: ' +
																																getLastActiveString(users[msg.chat.id][k]) +
																																' (UTC)\n\n');
					else
						msg.answer(users[msg.chat.id][k].first_name + ': ' + users[msg.chat.id][k].bio + '\n\n');


			} else {
				for (const k in users[msg.chat.id])
					if (users[msg.chat.id][k].first_name != undefined)
						if (users[msg.chat.id][k].first_name.toLowerCase() === commandText.toLowerCase()) {
							userFound = true;
							userID = k;
						}


				for (const k in users[msg.chat.id])
					if (users[msg.chat.id][k].username != undefined)
						if (users[msg.chat.id][k].username.toLowerCase() === commandText.toLowerCase()) {
							userFound = true;
							userID = k;
						}


				if (userFound)
					msg.answer(users[msg.chat.id][userID].first_name + ': ' + users[msg.chat.id][userID].bio +
																												'\nLast update: ' + getLastActiveString(users[msg.chat.id][userID]) +
																												' (UTC)');
				else
					msg.answer('User has not added a bio yet');

			}
			break;


		case 'lenny':
			bot.API.sendMessage(msg.chat.id, '( ͡° ͜ʖ ͡°)');
			break;

		case 'poopoo':
			for (let i = 0; i < Math.floor(Math.random() * 20); i++)
				text += '\u{1F4A9}';

			msg.answer(text);

			break;


		case 'rand':


			String.prototype.caps = function () {

				const str = this;
				let randIndex = Math.floor(Math.random() * str.length);
				while (!str[randIndex].match(/[a-z]/)) randIndex = Math.floor(Math.random() * str.length);
				const strArr = str.split('');
				strArr[randIndex] = str[randIndex].toUpperCase();
				return strArr.join('');
			};
			for (let i = 0; i < Math.floor(Math.random() * commandText.length); i++)
				commandText = commandText.caps();

			msg.answer(commandText);
			break;


		case 'rpg':

			if (typeof rpg[commandArgs[0]] === 'function')
				if (runningGames[msg.from.id]) msg.answer(runningGames[msg.from.id][
					commandArgs[0]
				](commandArgs[1]) + ' ');

				else {
					runningGames[msg.from.id] = new DrugRPG();
					msg.answer(runningGames[msg.from.id][commandArgs[0]](commandArgs[1]) +
																												' ');
				}
			else
				msg.answer('Commands are: buy, make, sell, bribe, dealer and stats');


			break;

		case 'cas':

			pubchem
				.setName(commandText)
				.getCas()
				.execute((data, status) => {
					if (status != 1)
						msg.answer(data + ', status: ' + status);
					else
						msg.answer(data + ' ');

				});

			break;

		case 'mol':

			jsdom.env('https://pubchem.ncbi.nlm.nih.gov/compound/' + commandText,
				(err, window) => {
					const imageElement = window.document.querySelector('.structure-img');
					if (imageElement)
						msg.answer(imageElement.src);
					else
						msg.answer('Not found');
				});

			break;


		case 'synonym':

			pubchem
				.setName(commandText)
				.getNames(5)
				.execute((data) => {
					msg.answer(data[0] + ', ' + data[1] + ', ' + data[2] + ', ' + data[3] + ', ' + data[4]);
				});


			break;


		case 'prop':
			pubchem
				.setName(commandText)
				.getProperties([ 'IUPACName', 'MolecularWeight', 'MolecularFormula', 'CanonicalSMILES' ])
				.execute((data) => {
					msg.answer(
						'IUPAC name: ' + data.IUPACName +
																												',\nMW: ' + data.MolecularWeight + ',\nFormula: ' + data.MolecularFormula + ', \nSMILES: ' + data.CanonicalSMILES
					);
				});

			break;


		case 'medchem':
			pubchem
				.setName(commandText)
				.getProperties([ 'IUPACName', 'XLogP', 'Complexity', 'HBondDonorCount', 'HBondAcceptorCount',
					'RotatableBondCount', 'TPSA'
				])
				.execute((data) => {
					msg.answer(
						'IUPAC name: ' + data.IUPACName +
																												',\nXLogP: ' + data.XLogP + ',\nComplexity: ' + data.Complexity + ', \nH-bond donors: ' + data.HBondDonorCount +
																												', \nH-bond acceptors: ' + data.HBondAcceptorCount + ', \nRotatable bonds: ' + data.RotatableBondCount +
																												', \nTopological polar surface area: ' + data.TPSA);
				});

			break;


		case 'sym':

			commandText = commandText.capitalizeFirstLetter();

			if (pt.symbols[commandText] != undefined)
				msg.answer(pt.symbols[commandText].name + '');
			else if (pt.elements[commandText] != undefined)
				msg.answer(pt.elements[commandText].symbol + '');
			else
				msg.answer('Not found!');


			break;


		case 'eval':

			if (commandText.indexOf('setTimeout') !== -1 && adminID.indexOf(id) !== -1) {
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
					console.log(String(data));
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

			var id = msg.from.id;
			if (adminID.indexOf(id) == -1) {
				bot.API.sendMessage(msg.chat.id, 'Not authorized');
			} else {
				vm.destroyAll();
				bot.API.sendMessage(msg.chat.id, 'Killed all processes');
			}


			break;


		case 'apple':


			for (let i = 0; i < Math.floor(Math.random() * 20); i++)
				text += Math.random() < 0.5 ? '🍎' : '🍏';

			msg.answer(text);
			break;

		case 'math':
			try {
				const result = math.eval(commandText);
				msg.answer(String(result));
			} catch (err) {
				if (err.message.length > 0)
					msg.answer('Error: ' + String(err.message));
			}
			break;


		case 'mw':


			var regex = /((Uu[a-z]|[A-Z][a-z]?)\d*)/g;
			var mol = (commandText.match(regex) || []).join(' ');


			try {
				msg.answer('The molar mass of ' + commandText + ' is: ' + util.atomicMass(mol) + 'g/mol');
			} catch (e) {
				if (e instanceof TypeError)
					msg.answer('Error, improper formatting, kek');
				else
					throw e;

			}


			break;


		case 'mass':

			// volume(L), molariteit(mol/L), formulemolmassa
			// commandArgs[0], commandArgs[1], mol

			try {
				var regex = /((Uu[a-z]|[A-Z][a-z]?)\d*)/g;
				var mol = (commandArgs[2].match(regex) || []).join(' ');
				var molmassa = util.atomicMass(mol);
				var moles = commandArgs[0] * commandArgs[1];
				const gram = moles * molmassa;
				msg.answer(gram + ' grams of ' + commandArgs[2] + ' needed for ' + commandArgs[0] + 'L ' + commandArgs[
					1] + 'M solution.');
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
				var regex = /((Uu[a-z]|[A-Z][a-z]?)\d*)/g;
				var mol = (commandArgs[2].match(regex) || []).join(' ');
				var molmassa = util.atomicMass(mol);
				var moles = commandArgs[0] / molmassa;
				const volume = moles / commandArgs[1];
				msg.answer(volume + ' liter per ' + commandArgs[0] + ' grams needed for a ' + commandArgs[1] + 'M ' +
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
				var regex = /((Uu[a-z]|[A-Z][a-z]?)\d*)/g;
				var mol = (commandArgs[2].match(regex) || []).join(' ');
				var molmassa = util.atomicMass(mol);
				var moles = commandArgs[0] / molmassa;
				const molair = moles / commandArgs[1];
				msg.answer(commandArgs[0] + ' grams of ' + commandArgs[2] + ' per ' + commandArgs[1] + ' liter is ' +
																								molair + ' molar');
			} catch (e) {
				if (e instanceof TypeError)
					msg.answer('improper formatting');
				else
					throw e;

			}

			break;


		case 'bp':


			commandText = commandText.capitalizeFirstLetter();

			if (pt.symbols[commandText] != undefined) {
				var celsius = Number(pt.symbols[commandText].boilingPoint) - 273;
				msg.answer('The boiling point of ' + commandText + ' is ' + pt.symbols[commandText].boilingPoint +
																								' K or ' + celsius + 'ºC');
			} else if (pt.elements[commandText] != undefined) {
				var celsius = Number(pt.elements[commandText].boilingPoint) - 273;
				msg.answer('The boiling point of ' + commandText + ' is ' + pt.elements[commandText].boilingPoint +
																								' K or ' + celsius + 'ºC');
			} else {
				msg.answer('Not found!');
			}

			break;


		case 'mp':
			commandText = commandText.capitalizeFirstLetter();

			if (pt.symbols[commandText] != undefined) {
				var celsius = Number(pt.symbols[commandText].meltingPoint) - 273;
				msg.answer('The melting point of ' + commandText + ' is ' + pt.symbols[commandText].meltingPoint +
																								' K or ' + celsius + 'ºC');
			} else if (pt.elements[commandText] != undefined) {
				var celsius = Number(pt.elements[commandText].meltingPoint) - 273;
				msg.answer('The melting point of ' + commandText + ' is ' + pt.elements[commandText].meltingPoint +
																								' K or ' + celsius + 'ºC');
			} else {
				msg.answer('Not found!');
			}

			break;

		case 'density':

			commandText = commandText.capitalizeFirstLetter();

			if (pt.symbols[commandText] != undefined)
				msg.answer('The density of ' + commandText + ' is ' + pt.symbols[commandText].density + ' g/cm^3');
			else if (pt.elements[commandText] != undefined)
				msg.answer('The density of ' + commandText + ' is ' + pt.elements[commandText].density + ' g/cm^3');
			else
				msg.answer('Not found!');


			break;


		case 'config':

			commandText = commandText.capitalizeFirstLetter();

			if (pt.symbols[commandText] != undefined)
				msg.answer('The electronic configuration ' + commandText + ' is ' + pt.symbols[commandText].electronicConfiguration);
			else if (pt.elements[commandText] != undefined)
				msg.answer('The electronic configuration ' + commandText + ' is ' + pt.elements[commandText].electronicConfiguration);
			else
				msg.answer('Not found!');


			break;


		case 'year':

			commandText = commandText.capitalizeFirstLetter();

			if (typeof pt.symbols[commandText] === 'object')
				if (pt.symbols[commandText].yearDiscovered == 'Ancient') {
					msg.answer(commandText + ' is known since ancient times');
				} else {
					msg.answer(commandText + ' was discovered in ' + pt.symbols[commandText].yearDiscovered);
				}
			else if (typeof pt.elements[commandText] === 'object')
				if (pt.elements[commandText].yearDiscovered == 'Ancient') {
					msg.answer(commandText + ' is known since ancient times');
				} else {
					msg.answer(commandText + ' was discovered in ' + pt.elements[commandText].yearDiscovered);
				}
			else
				msg.answer('Not found!');


			break;


		case 'os':

			commandText = commandText.capitalizeFirstLetter();

			if (typeof pt.symbols[commandText] === 'object')
				msg.answer(commandText + ' has the oxidation states: ' + pt.symbols[commandText].oxidationStates);
			else if (typeof pt.elements[commandText] === 'object')
				msg.answer(commandText + ' has the oxidation states: ' + pt.elements[commandText].oxidationStates);
			else
				msg.answer('Not found!');


			break;


		case 'balance':
			//                 jsdom.env('http://www.webqc.org/balance.php?reaction=' + commandText.replace(/\+/g, "%2B"), ["http://code.jquery.com/jquery.js"],
			//                    function(err, window) {
			//                    let str = window.$("b:eq(1)").text() + window.$("body > table > tbody > tr:nth-child(1) > td.center.top > table.center > tbody > tr:nth-child(2) > td").text()
			//                    let lines = str.split(/\n/g);
			//                    let reaction = lines[0];
			//                    let rtype = lines[1].replace(reaction, '');
			//                    console.log(reaction + "\n" + rtype);
			//                    msg.answer(reaction + "\n" + rtype);
			//                    });

			jsdom.env('http://www.webqc.org/balance.php?reaction=' + encodeURIComponent(commandText), (err, win) => {
				const equation = win.document.querySelector('td.center > b').textContent;
				const reaction = win.document.querySelector('td.center > br').nextSibling.textContent;

				msg.answer(equation + '\n' + reaction);
			});
			break;


		case 'help':
			msg.answer(
				'Hello ' + (msg.from.username ? '@' + msg.from.username : msg.from.first_name) + ', I am @' + (() =>
					bot.username)() + ' ,created by @ bdnugget\n' + help
			);

			break;


		case 'kekget':

			for (let i = 0; i < Math.floor(Math.random() * 20); i++)
				text += Math.random() < 0.5 ? 'K' : 'E';

			if (text === 'KEK')
				bot.API.sendMessage(msg.chat.id, text + '\nYOU WIN TOPKEK!!!');
			else if (text === 'KKK')
				bot.API.sendMessage(msg.chat.id, text +
																								'\nYOU WIN TOPKKK HEIL HITLER!!!');
			else if (text === 'KEKKEK')
				bot.API.sendMessage(msg.chat.id, text + '\nYOU WIN DOUBLE TOPKEKKEK!!!');
			else if (text === 'KEKKEKKEK')
				bot.API.sendMessage(msg.chat.id, text +
																								'\nYOU WIN ULTIMATE TRIPLE TOPKEKKEKKEK!!!');
			else if (text === 'KEKKEKKEKKEK')
				bot.API.sendMessage(msg.chat.id, text +
																								'\nQUADDRUPPLE TOPKEKKEKKEKKEK!!! YOU ARE GAY!!!');
			else if (text === 'KEKKEKKEKKEKKEK')
				bot.API.sendMessage(msg.chat.id, text +
																								'\nQUINTUPLE TOPKEKKEKKEKKEKKEK!!! UNBELIEVABLE M8!!!');
			else
				bot.API.sendMessage(msg.chat.id, text + '\nLength: \n' + text.length);


			break;


		case 'nigger':

			var commandNumber = parseInt(commandText);
			if (!isNaN(commandNumber)) {
				if (commandNumber > 20) commandNumber = 20;
				let i = 1;

				function loopDaWoop() {
					setTimeout(() => {
						msg.answer('nigger ' + i);
						i++;
						if (i < commandNumber + 1)
							loopDaWoop();

					}, 1000);
				}

				loopDaWoop();
			} else {
				msg.answer('nignog a number');
			}
			break;


		case 'jew':

			for (let i = 0; i < Math.floor(Math.random() * 20); i++)
				text += Math.random() < 0.5 ? '卐' : '卍';

			msg.answer(text);
			break;


		case 'apple':


			for (let i = 0; i < Math.floor(Math.random() * 20); i++)
				text += Math.random() < 0.5 ? '🍎' : '🍏';

			msg.answer(text);
			break;


		case 'shout':
			var userName = msg.from.first_name;

			userName = userName.replace(/Viktor/gi, 'Gay Viktor');
			userName = userName.replace(/Vincent/gi, 'Homo Vincent');
			userName = userName.replace(/Rico/gi, 'Rico the gay cucklord');
			userName = userName.replace(/Zed/gi, 'Zed the niggerfaggot');
			userName = userName.replace(/Panda/gi, 'Pandafaggot');


			var mapObj = {
				'i am': userName + ' is',
				'i\'m': userName + ' is',
				'ik ben': userName + ' is',
				'jeg er': userName + ' er'


			};
			commandText = commandText.toLowerCase();
			var shout = commandText.replace(/i am|i\'m|ik ben|jeg er/gi, (matched) => mapObj[matched]);
			text += shout.toUpperCase();
			msg.answer(text + '!!!');


			break;


		case 'n':
			msg.answer(rand(nigger));

			break;


		case 'sim':
			day++;
			msg.answer('Day ' + day + ': ' + rand(actions));

			break;


		case 'kek':

			msg.answer(rand(jokes));

			break;


		case 'bw':
			msg.answer(msg.text.split('').reverse().join(''));
			break;


		case 'nignog':
			let messageTextNig = '';
			for (let i = 1; i < 20; i++) {


				let string = '';

				if (i % 3 === 0)
					string += 'Nig';


				if (i % 5 === 0)
					string += (string !== '' ? ' ' : '') + 'Nog';


				if (string === '')
					string += i;


				messageTextNig += string + '\n';

			}
			msg.answer(messageTextNig);
			break;

		case 'debug':
			bot.API.sendMessage(msg.chat.id, '<pre>' + JSON.stringify(msg.rawMessage,
				undefined, '  ') + '</pre>', 'HTML');
			break;


		case 'geoip':
			let geo = geoip.lookup(commandArgs[0]);
			if (!geo)
				dns.lookup(commandArgs[0], (err, addr) => {
					if (err) return bot.API.sendMessage(msg.chat.id, 'Error: ' + err.message);
					geo = geoip.lookup(addr);
					if (geo) bot.API.sendLocation(msg.chat.id, geo.ll[0], geo.ll[1]);
					else bot.API.sendMessage(msg.chat.id, 'Not found');
				});
			else bot.API.sendLocation(msg.chat.id, geo.ll[0], geo.ll[1]);

			break;


		case 'heilhitler':

			if (adminID.indexOf(msg.from.id) == -1)
				msg.answer('Heil Hitler');

			else
				for (let i = 0; i < hitler.length; i++)
					bot.API.sendSticker(msg.chat.id, hitler[i]);


			break;


		case 'bjstart':
			msg.answer('👌 ' + msg.from.first_name + ' is bust.\nThe dealer draws cards 10♥️, A♠️ (21)\n💰' + msg.from.first_name + ' loses all money.');
			break;


		case 'terribleweebcancer':

			if (adminID.indexOf(msg.from.id) == -1)
				msg.answer('No');

			else
				for (let i = 0; i < weeb.length; i++)
					bot.API.sendSticker(msg.chat.id, weeb[i]);


			break;

		case 'test':
			msg.answer('command ' + command);
			msg.answer('text ' + commandText);
			msg.answer('args ' + commandArgs);

		}

	}
});


bot.on('inline_query', q => {
	bot.API.answerInlineQuery({
		inline_query_id: q.id,
		results: [ {
			type: 'article',
			id: '1',
			title: 'Kek',
			input_message_content: {
				message_text: rand(jokes)
			}
		} ]
	});
});


bot.on('photo', saveMessage);


bot.on('location', msg => {

	api.forwardMessage({
		chat_id: -1001108622429,
		from_chat_id: msg._rawMessage.chat.id,
		message_id: msg._rawMessage.message_id
	}, msg);


});
