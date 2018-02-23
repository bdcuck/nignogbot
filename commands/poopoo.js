'use strict';

const poopoo = () => {
    let text = '';
    for (let i = 0; i < Math.floor((Math.random() * 20) + 1 ); i++) text += '\u{1F4A9}';
    return text
}
module.exports = ({ reply }) => reply(poopoo());

module.exports.help = 'Random shit';
