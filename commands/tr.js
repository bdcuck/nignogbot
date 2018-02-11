'use strict'

const translate = require('google-translate-api');
const { commandArgs, commandText } = require('../utils');

const langColonLang = /([a-z]{2,})?(-)?([a-z]{2})?:([a-z]{2,})?(-)?([a-z]{2})?/i;
const lang = /([a-z]{2,})?(-)?([a-z]{2})?/i;

const parseLanguages = str => {
    const result = {};
    const matchFromTo = langColonLang.exec(str);
    if(matchFromTo && matchFromTo.index === 0) {
        result.from = matchFromTo[1];
        if(matchFromTo[2]) result.from += matchFromTo[2] + matchFromTo[3]; // e.g. zh-cn

        result.to = matchFromTo[4];
        if(matchFromTo[5]) result.to += matchFromTo[5] + matchFromTo[6];
    } 
    else{
        const matchTo = lang.exec(str);
        if(matchTo && matchTo.index === 0) {
            result.to = matchTo[1];
            if(matchTo[2]) result.to += matchTo[2] + matchTo[3];
        }
    }

    result.from = result.from ? translate.languages.getCode(result.from) : 'auto';
    result.to = result.to ? translate.languages.getCode(result.to) : 'en';

    return result;
}

const parseText = str => {
    if(langColonLang.exec(str)) return str.replace(langColonLang, '');
    const match = lang.exec(str);
    let checkStr = '';
        if (match && match.index === 0) {
            checkStr = match[1];
            if (match[2]) checkStr += match[2] + match[3];
        }
    return translate.languages.getCode(checkStr) ? str.replace(lang, '') : str;
};

module.exports = ({ reply, message }) => {

    const parsedText = parseText(message.reply_to_message ? message.reply_to_message.text : commandText(message));
    if(!parsedText) return reply('Nothing to translate, you fat fuck');
    return translate(parsedText, parseLanguages(commandText(message)) ).then(res => reply(res.text));

};
