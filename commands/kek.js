'use strict';
const { jokes } = require('../modules/jsons.js');
const rand = arr => arr[Math.floor(Math.random() * arr.length)];
module.exports = ({ reply }) => reply(rand(jokes));
