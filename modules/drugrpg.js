'use strict';
let DrugRPG = function() {
	let self = this;
	let drugs = 0;
	let money = 4;
	let chems = 0;
	let prisonChance = 0.0001;
	let timesInPrison = 0;
	let bribes = 0;
	let dealers = {};
	let labs = 0;
	let prison = function(reason) {
		drugs = chems = 0;
		money = 4;
		timesInPrison++;
		prisonChance = 0.0001 * timesInPrison;
		return 'You went to prison' + (reason ? ' for ' + reason : '') + '! Your stats have been reset.';
	};
	this.buy = function(amount) {
		amount = Number(amount) || 1;
		if (money >= amount) {
			money -= amount;
			chems += amount;
			if (Math.random() < prisonChance * amount) return prison('buying illegal chemicals');
			else {
				prisonChance += 0.0001 * amount;
				return 'You bought ' + amount + ' chems! (total: ' + chems + ')';
			}
		} else return 'You don\'t have enough money';
	};
	this.make = function(amount) {
		amount = Number(amount) || 1;
		if (chems >= amount) {
			let drugsMade = amount;
			for (let i = 0; i < amount; i++)
				if (Math.random() < 0.3) drugsMade += 1;
			chems -= amount;
			drugs += drugsMade;
			prisonChance += 0.0001 * amount;
			return 'You made ' + drugsMade + ' drugs! (total: ' + drugs + ')';
		} else return 'You don\'t have enough chems';
	};
	this.sell = function(amount) {
		amount = Number(amount) || 1;
		if (drugs >= amount) {
			drugs -= amount;
			money += 2 * amount;
			if (Math.random() < prisonChance * amount) return prison('selling drugs');
			else {
				prisonChance += 0.001 * amount;
				return 'You sold ' + amount + ' drugs! (remaining: ' + drugs + ')';
			}
		} else return 'You don\'t have any drugs to sell!';
	};
	this.stats = function() {
		return 'Money: ' + money + '\nDrugs: ' + drugs + '\nChems: ' + chems + '\nPolice suspicion: ' +
			prisonChance + (Object.keys(dealers).length ? '\nDealers: ' + Object.keys(dealers).length : '');
	};
	this.bribe = function() {
		if (prisonChance > 0 && money >= 10) {
			if (Math.random() < 0.00001) return prison('bribing');
			else {
				money -= 10;
				prisonChance = 0;
				bribes++;
				return 'Bribed the police';
			}
		} else return 'Already bribed or not enough money';
	};
	this.dealer = function(amount) {
		if (money >= 20) {
			money -= 20;
			let dealerID = String(Math.random()).split('.')[1];
			let dealer = {
				interval: setInterval(function() {
					if (Math.random() < prisonChance * drugs) {
						console.log('Dealer was arrested');
						clearInterval(dealers[dealerID].interval);
						delete dealers[dealerID];
					} else {
						if (drugs > 0) {
							let soldDrugs = 0;
							for (let i = 0; i < 3; i++) {
								if (drugs > 0) {
									drugs--;
									soldDrugs++;
								}
							}
							let drugValue = (Math.round(Math.random() * 10) / 10 + 2) * soldDrugs;
							money += drugValue;
							console.log('Dealer sold ' + soldDrugs + ' drugs for ' + drugValue + '$ (total: ' + money + '$)')
						}
					}
				}, 60000),
				id: dealerID
			};
			dealers[dealerID] = dealer;
			return 'Hired dealer';
		}
	};
};
if (typeof module !== 'undefined') module.exports = DrugRPG;