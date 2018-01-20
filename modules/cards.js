'use strict'
class PlayingCards {
    constructor() {
        this.cards = this.getShuffledPack();
        this.currentPackLocation = 0;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * (max + 1));
    }

    getShuffledPack() {
        const cards = [];
        cards[0] = 0;
        for (let i = 1; i < 52; i++) {
            const j = this.getRandomInt(i);
            cards[i] = cards[j];
            cards[j] = i;        
        }
        return cards;
    }

    dealNextCard() {
        
        console.log(`currentPackLocation: ${this.currentPackLocation}`);

        if (this.currentPackLocation >= this.cards.length) {
            this.cards = this.getShuffledPack();
            this.currentPackLocation = 0;
            console.log("Created new pack");
        }

        const cardNumber = this.cards[this.currentPackLocation];
        this.currentPackLocation = this.currentPackLocation + 1;
        return cardNumber;
    }
}

function createPlayingCards () {
    return new PlayingCards();
}

if (module) module.exports = { createPlayingCards };