'use strict';

const { commandText, caps } = require('../utils');

module.exports = ({ replyWithPhoto, message }) => {
    let spongemock = commandText(message);
    if (!spongemock) spongemock =
        'I\'m too retarded to type some text';
    spongemock = caps(spongemock);
    replyWithPhoto('http://i1.kym-cdn.com/entries/icons/original/000/022/940/spongebobicon.jpg', {caption: spongemock});
}
