# nignogbot

Telegrambot @nignogbot
Crappy nignogbot.js code to be cleaned up, then merge with logger.js 

## Issues / To do

[X] The /mol command does not get 2D molecule png. The jsdom shit is broken because DOM element on pubchem changed somewhere and I'm too retarded to figure it out.
--fixed by @TRGWII
    
[X] Merge logger.js to a decent clean version of nignogbot.js to get fancy logging nignogbot.

[ ] logger.js sometimes appends the same messages or a series of messages repeatedly (seems to happen in busy spammy chats).

[?] Inline does not return random joke, randomness depends on input -- Possibly fixed, NEEDS TESTING

[-] Unresolved promise errors in `stat` and `unlink`, sort of fixed by dumping some .catch() everywhere

[ ] TypeErrors happen (probably on sending audio, not sure)
-    `nignogbot-0 (err): TypeError: Cannot read property 'file_id' of undefined`

[ ] Logger stopped working kek