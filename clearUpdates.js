import http from 'http';
import https from 'https';
import {URL} from 'url';

const getJSON = url =>
    new Promise((resolve, reject) =>
        (lib =>
            lib.get(url, (res, data = '') =>
                (res.once('error', reject),
                    res.on('data', chunk => data += chunk),
                    res.once('end', () => resolve(JSON.parse(data)))))
                .once('error', reject))(new URL(url).protocol === 'https:'
            ? https
            : http));

const clear = (token, offset = 0) =>
    getJSON(
        `https://api.telegram.org/bot${token}/getUpdates?offset=${offset}`
    ).then(response => response.result.length === 0
        ? 'done'
        : clear(token, response.result.pop().update_id + 1));

if (require.main === module)
    clear(process.argv[2]).then(result => console.log(result));

module.exports = clear;
