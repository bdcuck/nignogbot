'use strict';
const { nigger } = require('../modules/jsons.js');
const rand = arr => arr[Math.floor(Math.random() * arr.length)];
module.exports = ({ reply }) => reply(rand(nigger));

module.exports.help = 'Random nigger synonym';
