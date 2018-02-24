'use strict';

const { commandText, capitalizeFirstLetter } = require('../utils');
const rsapi = require('rs-api');

module.exports = ({ replyWithMarkdown, message }) => {

    const player = commandText(message);
    if(!player) return replyWithMarkdown('You forgot to enter a username you *RETARD*');
    rsapi.rs.player.hiscores(player)
        .then(stats => {
            let text = `Username: _${stats.username}_\n\n`;
            let statArr = [];
            for (let skl in stats.skills) {
                statArr.push([skl, stats.skills[skl]]);
            }   
            statArr.sort((a,b) =>  b[1].exp - a[1].exp);    
            statArr.forEach(x => text += `*${capitalizeFirstLetter(x[0])}*\n  Level ${x[1].level}, XP: ${x[1].exp}\n`);
            replyWithMarkdown(text);
        })
        .catch(err => replyWithMarkdown(`Username _${player}_ not found hombre`));

};

module.exports.help = 'Runescape stats. Usage /rs [username]';
