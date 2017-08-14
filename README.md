# nignogbot

Telegrambot @nignogbot
Crappy nignogbot.js code to be cleaned up, then merge with logger.js 

## Issues / To do

[ ] Include help string in every module and generate /help from that

[X] Logger deprecated for now because fuck that shit nigga.

[ ] Make code layout prettier because ESLint is an asshole on concatenated strings.     Convert to string literals like medchem.js

[X] The /mol command does not get 2D molecule png. The jsdom shit is broken because DOM element on pubchem changed somewhere and I'm too retarded to figure it out.
--fixed by @TRGWII
    
[X] Merge logger.js to a decent clean version of nignogbot.js to get fancy logging nignogbot.

[X] logger.js sometimes appends the same messages or a series of messages repeatedly (seems to happen in busy spammy chats).

[X] Inline does not return random joke, randomness depends on input -- Possibly fixed, NEEDS TESTING - YES IS FIX

[-] Unresolved promise errors in `stat` and `unlink`, sort of fixed by dumping some .catch() everywhere

[X] TypeErrors happen (probably on sending audio, not sure)
-    `nignogbot-0 (err): TypeError: Cannot read property 'file_id' of undefined`

[-] Logger stopped working kek