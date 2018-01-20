'use strict'
const cards = require('./cards');

class BlackjackGame {
    constructor() {
        this.dealerHand = new BlackjackHand();
        this.playerHand = new BlackjackHand();
        this.result = 'None';
        this.cards = cards.createPlayingCards();
    }

    newGame() {

        this.dealerHand = new BlackjackHand();
        this.playerHand = new BlackjackHand();

        this.playerHand.addCard(this.cards.dealNextCard());
        this.dealerHand.addCard(this.cards.dealNextCard());
        this.playerHand.addCard(this.cards.dealNextCard());

        this.result = 'None';
    }

    isInProgress() {
        return (this.result === 'None') && (this.dealerHand.hasCards());
    }

    toJson() {
        return {
            dealer: {
                cards: this.dealerHand.getCards(),
                score: this.dealerHand.getScore()
            },
            player: {
                cards: this.playerHand.getCards(),
                score: this.playerHand.getScore(),
                balance: 102.50
            },
            result: this.result
        };
    }

    getResultForPlayer() {
        const score = this.playerHand.getScore();
        if (score > 21) {
            return 'Bust';
        }
        return 'None';
    }

    isGameInProgress() {
        return this.result === 'None';
    }

    hit() {
        if (this.isGameInProgress()) {
            this.playerHand.addCard(this.cards.dealNextCard());
            this.result = this.getResultForPlayer();
        }
    }

    getResult() {
        const playerScore = this.playerHand.getScore();
        const dealerScore = this.dealerHand.getScore();

        if (this.playerHand.isBust()) {
            return 'Bust';
        } else if (this.dealerHand.isBust()) {
            return 'Win';
        }

        if (playerScore > dealerScore) {
            return 'Win';
        } else if (playerScore === dealerScore) {
            return 'Push';
        }
        return 'Lose';
    }

    stand() {
        if (this.isGameInProgress()) {
            while (this.dealerHand.getScore() < 17) {
                this.dealerHand.addCard(this.cards.dealNextCard());        
            }
            this.result = this.getResult();
        }
    }
}

class BlackjackHand {
    constructor() {
        this.cards = [];
    }

    hasCards() {
        return this.cards.length > 0;
    }

    addCard(card) {
        this.cards.push(card);
    }

    numberToSuit(number) {
      const suits = ['C', 'D', 'H', 'S'];
      const index = Math.floor(number / 13);
      return suits[index];
    }

    numberToCard(number) {
      return {
        rank: (number % 13) + 1,
        suit: this.numberToSuit(number)
      };
    }

    getCards() {
        const convertedCards = [];

        for (const number of this.cards) {
            convertedCards[i] = this.numberToCard(number);
        }

        return convertedCards;
    }

    getCardScore(card) {
        if (card.rank === 1) {
            return 11;
        } else if (card.rank >= 11) {
            return 10;
        }
        return card.rank;
    }

    getScore() {
        let score = 0;
        const cards = this.getCards();
        const aces = [];

        // Sum all cards excluding aces.
        for (const card of cards) {
            if (card.rank === 1) {
                aces.push(card);
            } else {
                score = score + this.getCardScore(card);
            }
        }

        // Add aces.
        if (aces.length > 0) {
            let acesScore = aces.length * 11;
            let acesLeft = aces.length;
            while ((acesLeft > 0) && (acesScore + score) > 21) {
                acesLeft = acesLeft - 1;
                acesScore = acesScore - 10;
            }
            score = score + acesScore;
        }

        return score;
    }

    isBust() {
        return this.getScore() > 21;
    }
}

function newGame () {
    return new BlackjackGame();
}

if (module) module.exports = newGame;