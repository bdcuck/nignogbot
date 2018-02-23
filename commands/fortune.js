'use strict';
const { fortune } = require('../modules/jsons.js');
const rand = arr => arr[Math.floor(Math.random() * arr.length)];
module.exports = ({ reply }) => reply(rand(fortune));
module.exports.help = 'Your fortune';
