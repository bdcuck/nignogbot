'use strict';

const debug = true;

// API shit
const secret = require('./secret.json');
const { TelegramBot } = require('telebotframework');
const { InputFile } = require('teleapiwrapper').DataTypes;
const TwitterPackage = require('twitter');
const bot = new TelegramBot(process.env.TOKEN || secret.bottoken);
const Twitter = new TwitterPackage(secret.twitter);

// Native dependencies
const https = require('https');
const dns = require('dns');
const fs = require('fs');

// NPM dependencies
const geoip = require('geoip-lite');
const math = require('mathjs');
const pt = require('periodic-table')
const request = require('request');
const util = require('periodic-table/util');
const pubchem = require("pubchem-access")
    .domain("compound");
const jsdom = require('jsdom');

// Includes
const help = require('./help.json').general.join(' ');
const VM = require('./vm.js');
const nigger = require('./nigger.json');
const actions = require('./actions.json');
const jokes = require('./jokes.json');
const atom = require('./atom.json');
const hitler = require('./hitlerStickers.json');
const weeb = require('./weebStickers.json');
const fortune = require('./fortune.json');
const names = require('./gaynames.json');
const DrugRPG = require('./drugrpg.js');

// Vars and shit
const nameFirst = names.nameFirst;
const nameLast = names.nameLast;
const adminID = [126131628, 312106580];
const rpg = new DrugRPG();
const vm = new VM();
let day = 0;
let runningGames = {};

// Functions and shit
const date = () => new Date().toLocaleString().split('.')[0].replace('T', ' ');
const rand = (nigger) => nigger[Math.floor(Math.random() * nigger.length)];
const capitalizeFirstLetter = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const getRandomName = () => nameFirst[Math.floor(Math.random() * nameFirst.length)] + ' ' + nameLast[Math.random() * nameLast.length];

// getMe
bot.username = 'bot';
https.get('https://api.telegram.org/bot' + secret.bottoken + '/getMe', res => {
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

// Botmagic happens here lmao
bot.startLongpolling();

bot.on('text', msg => {

    if (debug) {
    let dateSent = new Date().toLocaleString().split('.')[0].replace('T', ' ');
    console.log("Date: " + date());
    console.log("Text: " + JSON.stringify(msg.text));
    console.log("From: " + JSON.stringify(msg.from));
    console.log("Chat: " + JSON.stringify(msg.chat) + "\n");
    }
    
    if (msg.text.indexOf('/') === 0) {

        let commandArgs = msg.text.split(/\s+/);
        let command = commandArgs.shift();
        command = command.substr(1).split('@')[0];
        command = command.toLowerCase()
        let commandText = commandArgs.join(' ');
        let text = '';


        switch (command) {



            case 'twat':

                if (commandText) {
                    let tweet = commandText + " - " + msg.from.first_name;
                    if (tweet.length < 141) {
                        Twitter.post('statuses/update', {
                            status: tweet
                        }, function(error, tweet, response) {
                            if (error) {
                                msg.answer(error);
                            }
                            msg.answer("Messaged tweeted https://twitter.com/rambodildo");
                        });
                    } else {
                        msg.answer("Too long, you boner!")
                    }
                } else {
                    msg.answer("You forgot your message retard")
                }


                break;

            case 'gayname':

                msg.answer(msg.from.first_name + " aka " + getRandomName())

                break;

            case 'monopoly':

                msg.answer("Go to jail.")

                break;


            case 'start':

                msg.answer(
                    'Hello ' + (msg.from.username ? '@' + msg.from.username : msg.from.first_name) +
                    ', I am @' + bot.username + '\n' + help
                );
                break;


            case 'fortune':

                msg.answer(rand(fortune));

                break;


            case 'lenny':
                bot.API.sendMessage(msg.chat.id, "( ͡° ͜ʖ ͡°)")
                break;

            case 'poopoo':
                for (let i = 0; i < Math.floor(Math.random() * 20); i++) {
                    text += "\u{1F4A9}";
                }
                msg.answer(text);

                break;


            case 'rand':


                String.prototype.caps = function() {

                    let str = this;
                    let randIndex = Math.floor(Math.random() * str.length);
                    while (!str[randIndex].match(/[a-z]/)) randIndex = Math.floor(Math.random() * str.length);
                    let strArr = str.split("");
                    strArr[randIndex] = str[randIndex].toUpperCase();
                    return strArr.join("");
                }
                for (let i = 0; i < Math.floor(Math.random() * commandText.length); i++) {
                    commandText = commandText.caps()
                }
                msg.answer(commandText)
                break;




            case 'rpg':

                if (typeof rpg[commandArgs[0]] === 'function') {
                    if (runningGames[msg.from.id]) msg.answer(runningGames[msg.from.id][
                        commandArgs[0]
                    ](commandArgs[1]) + " ")

                    else {
                        runningGames[msg.from.id] = new DrugRPG();
                        msg.answer(runningGames[msg.from.id][commandArgs[0]](commandArgs[1]) +
                            " ")
                    }
                } else {
                    msg.answer("Commands are: buy, make, sell, bribe, dealer and stats")
                }

                break;

            case 'cas':

                pubchem
                    .setName(commandText)
                    .getCas()
                    .execute(function(data, status) {
                        if (status != 1) {
                            msg.answer(data + ", status: " + status);
                        } else {
                            msg.answer(data + ' ')
                        }
                    });

                break;

            case 'mol':

                jsdom.env('https://pubchem.ncbi.nlm.nih.gov/compound/' + commandText,
                    function(err, window) {
                        let imageElement = window.document.querySelector('.structure-img');
                        if (imageElement)
                            msg.answer(imageElement.src);
                        else
                            msg.answer('Not found')
                    });

                break;


            case 'synonym':

                pubchem
                    .setName(commandText)
                    .getNames(5)
                    .execute(function(data) {
                        msg.answer(data[0] + ", " + data[1] + ", " + data[2] + ", " + data[3] + ", " + data[4]);
                    });


                break;



            case 'prop':
                pubchem
                    .setName(commandText)
                    .getProperties(["IUPACName", "MolecularWeight", "MolecularFormula", "CanonicalSMILES"])
                    .execute(function(data) {
                        msg.answer(
                            "IUPAC name: " + data.IUPACName +
                            ",\nMW: " + data.MolecularWeight + ",\nFormula: " + data.MolecularFormula + ", \nSMILES: " + data.CanonicalSMILES
                        );
                    });

                break;



            case 'medchem':
                pubchem
                    .setName(commandText)
                    .getProperties(["IUPACName", "XLogP", "Complexity", "HBondDonorCount", "HBondAcceptorCount",
                        "RotatableBondCount", "TPSA"
                    ])
                    .execute(function(data) {
                        msg.answer(
                            "IUPAC name: " + data.IUPACName +
                            ",\nXLogP: " + data.XLogP + ",\nComplexity: " + data.Complexity + ", \nH-bond donors: " + data.HBondDonorCount +
                            ", \nH-bond acceptors: " + data.HBondAcceptorCount + ", \nRotatable bonds: " + data.RotatableBondCount +
                            ", \nTopological polar surface area: " + data.TPSA);
                    });

                break;




            case 'sym':

                commandText = capitalizeFirstLetter(commandText);

                if (pt.symbols[commandText] != undefined) {
                    msg.answer(pt.symbols[commandText].name + "")
                } else if (pt.elements[commandText] != undefined) {
                    msg.answer(pt.elements[commandText].symbol + "")
                } else {
                    msg.answer("Not found!")
                }

                break;


            case 'eval':

                if (commandText.indexOf("setTimeout") !== -1 && adminID.indexOf(id) !== -1) {
                    msg.answer("no setTimeout because fuck you nigger")
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
                } else bot.API.sendMessage(msg.chat.id, 'No process active');

                break;



            case 'killallevals':

                let id = msg.from.id
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
                    let result = math.eval(commandText);
                    msg.answer(String(result));
                } catch (err) {
                    if (err.message.length > 0)
                        msg.answer('Error: ' + String(err.message));
                }
                break;




            case 'mw':


                let regex = /((Uu[a-z]|[A-Z][a-z]?)\d*)/g;
                let mol = (commandText.match(regex) || []).join(' ');


                try {
                    msg.answer("The molar mass of " + commandText + " is: " + util.atomicMass(mol) + "g/mol");
                } catch (e) {
                    if (e instanceof TypeError) {
                        msg.answer("Error, improper formatting, kek");
                    } else {
                        throw e;
                    }
                }


                break;



            case 'mass':

                // volume(L), molariteit(mol/L), formulemolmassa
                // commandArgs[0], commandArgs[1], mol

                try {
                    let regex = /((Uu[a-z]|[A-Z][a-z]?)\d*)/g;
                    let mol = (commandArgs[2].match(regex) || []).join(' ');
                    let molmassa = util.atomicMass(mol)
                    let moles = commandArgs[0] * commandArgs[1];
                    let gram = moles * molmassa;
                    msg.answer(gram + " grams of " + commandArgs[2] + " needed for " + commandArgs[0] + "L " + commandArgs[
                        1] + "M solution.")
                } catch (e) {
                    if (e instanceof TypeError) {
                        msg.answer("improper formatting")
                    } else {
                        throw e;
                    }
                }

                break;

            case 'volume':

                // massa(g), molariteit(mol/L), formulemolmassa
                // commandArgs[0], commandArgs[1], mol

                try {
                    let regex = /((Uu[a-z]|[A-Z][a-z]?)\d*)/g;
                    let mol = (commandArgs[2].match(regex) || []).join(' ');
                    let molmassa = util.atomicMass(mol)
                    let moles = commandArgs[0] / molmassa;
                    let volume = moles / commandArgs[1];
                    msg.answer(volume + " liter per " + commandArgs[0] + " grams needed for a " + commandArgs[1] + "M " +
                        commandArgs[2] + " solution ")
                } catch (e) {
                    if (e instanceof TypeError) {
                        msg.answer("improper formatting")
                    } else {
                        throw e;
                    }
                }

                break;



            case 'molar':

                // massa(g), volume(L), formulemolmassa
                // commandArgs[0], commandArgs[1], mol

                try {
                    let regex = /((Uu[a-z]|[A-Z][a-z]?)\d*)/g;
                    let mol = (commandArgs[2].match(regex) || []).join(' ');
                    let molmassa = util.atomicMass(mol)
                    let moles = commandArgs[0] / molmassa;
                    let molair = moles / commandArgs[1];
                    msg.answer(commandArgs[0] + " grams of " + commandArgs[2] + " per " + commandArgs[1] + " liter is " +
                        molair + " molar")
                } catch (e) {
                    if (e instanceof TypeError) {
                        msg.answer("improper formatting")
                    } else {
                        throw e;
                    }
                }

                break;



            case 'bp':


                commandText = capitalizeFirstLetter(commandText);

                if (pt.symbols[commandText] != undefined) {
                    let celsius = Number(pt.symbols[commandText].boilingPoint) - 273;
                    msg.answer("The boiling point of " + commandText + " is " + pt.symbols[commandText].boilingPoint +
                        " K or " + celsius + "ºC")
                } else if (pt.elements[commandText] != undefined) {
                    let celsius = Number(pt.elements[commandText].boilingPoint) - 273;
                    msg.answer("The boiling point of " + commandText + " is " + pt.elements[commandText].boilingPoint +
                        " K or " + celsius + "ºC")
                } else {
                    msg.answer("Not found!")
                }

                break;


            case 'mp':
                commandText = capitalizeFirstLetter(commandText);

                if (pt.symbols[commandText] != undefined) {
                    let celsius = Number(pt.symbols[commandText].meltingPoint) - 273;
                    msg.answer("The melting point of " + commandText + " is " + pt.symbols[commandText].meltingPoint +
                        " K or " + celsius + "ºC")
                } else if (pt.elements[commandText] != undefined) {
                    let celsius = Number(pt.elements[commandText].meltingPoint) - 273;
                    msg.answer("The melting point of " + commandText + " is " + pt.elements[commandText].meltingPoint +
                        " K or " + celsius + "ºC")
                } else {
                    msg.answer("Not found!")
                }

                break;

            case 'density':

                commandText = capitalizeFirstLetter(commandText);

                if (pt.symbols[commandText] != undefined) {
                    msg.answer("The density of " + commandText + " is " + pt.symbols[commandText].density + " g/cm^3")
                } else if (pt.elements[commandText] != undefined) {
                    msg.answer("The density of " + commandText + " is " + pt.elements[commandText].density + " g/cm^3")
                } else {
                    msg.answer("Not found!")
                }

                break;



            case 'config':

                commandText = capitalizeFirstLetter(commandText);

                if (pt.symbols[commandText] != undefined) {
                    msg.answer("The electronic configuration " + commandText + " is " + pt.symbols[commandText].electronicConfiguration)
                } else if (pt.elements[commandText] != undefined) {
                    msg.answer("The electronic configuration " + commandText + " is " + pt.elements[commandText].electronicConfiguration)
                } else {
                    msg.answer("Not found!")
                }

                break;



            case 'year':

                commandText = capitalizeFirstLetter(commandText);

                if (typeof pt.symbols[commandText] == "object") {
                    if (pt.symbols[commandText].yearDiscovered == "Ancient") {
                        msg.answer(commandText + " is known since ancient times")
                    } else {
                        msg.answer(commandText + " was discovered in " + pt.symbols[commandText].yearDiscovered)
                    }
                } else if (typeof pt.elements[commandText] == "object") {
                    if (pt.elements[commandText].yearDiscovered == "Ancient") {
                        msg.answer(commandText + " is known since ancient times")
                    } else {
                        msg.answer(commandText + " was discovered in " + pt.elements[commandText].yearDiscovered)
                    }
                } else {
                    msg.answer("Not found!")
                }

                break;


            case 'os':

                commandText = capitalizeFirstLetter(commandText);

                if (typeof pt.symbols[commandText] == "object") {
                    msg.answer(commandText + " has the oxidation states: " + pt.symbols[commandText].oxidationStates)
                } else if (typeof pt.elements[commandText] == "object") {
                    msg.answer(commandText + " has the oxidation states: " + pt.elements[commandText].oxidationStates)
                } else {
                    msg.answer("Not found!")
                }

                break;



            case 'balance':
 
                jsdom.env('http://www.webqc.org/balance.php?reaction=' + encodeURIComponent(commandText), (err, win) => {
                    let equation = win.document.querySelector('td.center > b').textContent;
                    let reaction = win.document.querySelector('td.center > br').nextSibling.textContent;

                    msg.answer(equation + '\n' + reaction);
                });
                break;



            case 'help':
                msg.answer(
                    'Hello ' + (msg.from.username ? '@' + msg.from.username : msg.from.first_name) + ', I am @' + bot.username + ' ,created by [@]bdnugget\n' + help
                );

                break;



            case 'kekget':

                for (let i = 0; i < Math.floor(Math.random() * 20); i++) {
                    text += Math.random() < 0.5 ? 'K' : 'E';
                }
                if (text === "KEK") {
                    bot.API.sendMessage(msg.chat.id, text + "\nYOU WIN TOPKEK!!!");
                } else if (text === "KKK") {
                    bot.API.sendMessage(msg.chat.id, text +
                        "\nYOU WIN TOPKKK HEIL HITLER!!!");
                } else if (text === "KEKKEK") {
                    bot.API.sendMessage(msg.chat.id, text + "\nYOU WIN DOUBLE TOPKEKKEK!!!");
                } else if (text === "KEKKEKKEK") {
                    bot.API.sendMessage(msg.chat.id, text +
                        "\nYOU WIN ULTIMATE TRIPLE TOPKEKKEKKEK!!!");
                } else if (text === "KEKKEKKEKKEK") {
                    bot.API.sendMessage(msg.chat.id, text +
                        "\nQUADDRUPPLE TOPKEKKEKKEKKEK!!! YOU ARE GAY!!!");
                } else if (text === "KEKKEKKEKKEKKEK") {
                    bot.API.sendMessage(msg.chat.id, text +
                        "\nQUINTUPLE TOPKEKKEKKEKKEKKEK!!! UNBELIEVABLE M8!!!");
                } else {
                    bot.API.sendMessage(msg.chat.id, text + "\nLength: \n" + text.length);
                }

                break;


            case 'nigger':

                let commandNumber = parseInt(commandText)
                if (!isNaN(commandNumber)) {
                    if (commandNumber > 20) commandNumber = 20;
                    let i = 1;

                    function loopDaWoop() {
                        setTimeout(function() {
                            msg.answer('nigger ' + i);
                            i++;
                            if (i < commandNumber + 1) {
                                loopDaWoop();
                            }
                        }, 1000)
                    }

                    loopDaWoop();
                } else {
                    msg.answer("nignog a number")
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
                let userName = msg.from.first_name

                userName = userName.replace(/Viktor/gi, "Gay Viktor");
                userName = userName.replace(/Vincent/gi, "Homo Vincent");
                userName = userName.replace(/Rico/gi, "Rico the gay cucklord");
                userName = userName.replace(/Zed/gi, "Zed the niggerfaggot");
                userName = userName.replace(/Panda/gi, "Pandafaggot");

                let mapObj = {
                    "i am": userName + " is",
                    "i\'m": userName + " is",
                    "ik ben": userName + " is",
                    "jeg er": userName + " er"
                };
                
                commandText = commandText.toLowerCase()
                let shout = commandText.replace(/i am|i\'m|ik ben|jeg er/gi, function(matched) {
                    return mapObj[matched];
                });
                
                text += shout.toUpperCase()
                msg.answer(text + '!!!');


                break;




            case 'n':
                msg.answer(rand(nigger));

                break;



            case 'sim':
                day++;
                msg.answer("Day " + day + ": " + rand(actions));

                break;



            case 'kek':

                msg.answer(rand(jokes));

                break;


            case 'bw':
                msg.answer(msg.text.split('').reverse().join(''));
                break



            case 'nignog':
                let messageTextNig = '';
                for (let i = 1; i < 20; i++) {
                    let string = '';
                    if (i % 3 === 0) {
                        string += 'Nig';
                    }
                    if (i % 5 === 0) {
                        string += (string !== '' ? ' ' : '') + 'Nog';
                    }
                    if (string === '') {
                        string += i;
                    }
                    messageTextNig += string + "\n"
                }
                msg.answer(messageTextNig);
                break;

            case 'debug':
                bot.API.sendMessage(msg.chat.id, '<pre>' + JSON.stringify(msg.rawMessage,
                    undefined, '  ') + '</pre>', 'HTML');
                break;


            case 'geoip':
                let geo = geoip.lookup(commandArgs[0]);
                if (!geo) {
                    dns.lookup(commandArgs[0], (err, addr) => {
                        if (err) return bot.API.sendMessage(msg.chat.id, 'Error: ' + err.message);
                        geo = geoip.lookup(addr);
                        if (geo) bot.API.sendLocation(msg.chat.id, geo.ll[0], geo.ll[1]);
                        else bot.API.sendMessage(msg.chat.id, 'Not found');
                    });
                } else bot.API.sendLocation(msg.chat.id, geo.ll[0], geo.ll[1]);

                break;


            case 'heilhitler':

                if (adminID.indexOf(msg.from.id) == -1) {
                    msg.answer("Heil Hitler")
                } else {
                    for (let i = 0; i < hitler.length; i++) {
                        bot.API.sendSticker(msg.chat.id, hitler[i]);
                    }
                }
                break;


            case 'bjstart':
                msg.answer("👌 " + msg.from.first_name + " is bust.\nThe dealer draws cards 10♥️, A♠️ (21)\n💰" + msg.from.first_name + " loses all money.");
                break;


            case 'terribleweebcancer':

                if (adminID.indexOf(msg.from.id) == -1) {
                    msg.answer("No")
                } else {
                    for (let i = 0; i < weeb.length; i++) {
                        bot.API.sendSticker(msg.chat.id, weeb[i]);
                    }
                }
                break;

        }

    }
});


bot.on('inline_query', q => {
    bot.API.answerInlineQuery({
        inline_query_id: q.id,
        results: [{
            type: 'article',
            id: '1',
            title: 'Kek',
            input_message_content: {
                message_text: rand(jokes)
            }
        }]
    });
});



bot.on('location', msg => {

    bot.API.forwardMessage({
        chat_id: '@fatboner',
        from_chat_id: msg._rawMessage.chat.id,
        message_id: msg._rawMessage.message_id
    }, msg);
});