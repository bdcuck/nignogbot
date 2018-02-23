'use strict';

const { commandArgs } = require('../utils');
const Blackjack = require('../modules/blackjack.js');
const bj = new Blackjack();
let runningGames = {};

module.exports = ({ message, reply }) => {
    const args = commandArgs(message);
    if ('function' === typeof bj[args[0]]) {
        const [ action ] = args;
        const game = runningGames[message.from.id] ||
            (runningGames[message.from.id] = new Blackjack());
        return reply(game[action](args[1]));
    } else {
        return reply(
            'Piss');
    }
}
