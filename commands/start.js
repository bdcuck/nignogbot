'use strict';
const { nameFirst, nameLast } = require('../modules/jsons.js');
const rand = arr => arr[Math.floor(Math.random() * arr.length)];
const getRandomName = () => rand(nameFirst) + ' ' + rand(nameLast);
module.exports = ({ from, reply }) => reply('Hello ' + from.first_name + ' aka ' + getRandomName() + '\nYou can type /help but it\'s probably under construction. Read the command descriptions instead lmao.');

module.exports.help = 'Useless command.';
