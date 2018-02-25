'use strict';

const { commandArgs } = require('../utils');

const lychrel = (num) => {
    if (isNaN(parseInt(num))) return `"${num}" is not a number`;
    if (num === num.split('').reverse().join('')) return `"${num}" is already a palindrome, you dickhole`;

    let result = '';
    let current = num;
    let palindrome = false;
    let x;
    for (x = 0; x < 49; x++) {
        const rev = current.split('').reverse().join('');
        const attempt = `${current}+${rev}`;
        current = (parseInt(current) + parseInt(rev)).toString();
        result += `${attempt} = ${current}\n`;
        if (current === current.split('').reverse().join('')) {
            palindrome = true;
            break;
        }
    }
    result += (palindrome ? `*PALINDROME FOUND* after ${x+1} iterations` : `*No palindrome found after ${x+1} iterations*\n_(last checked: ${current})_`);
    return result;
}

module.exports = ({ replyWithMarkdown, message }) => {

    replyWithMarkdown(lychrel(commandArgs(message)[0]));

};

module.exports.help = 'Test for Lychrel numbers up to 50 iterations. If you need more, just run it again for the last checked number.';
