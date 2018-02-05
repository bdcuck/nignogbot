'use strict';
function DrugRPG() {
	let drugs = 0;
	let money = 4;
	let chems = 0;
	let prisonChance = 0.0001;
	let timesInPrison = 0;
	let dealers = {};
	function prison(reason) {
		drugs = chems = 0;
		money = 4;
		timesInPrison++;
		prisonChance = 0.0001 * timesInPrison;
		return 'You went to prison' + (reason
			? ' for ' + reason
			: '') + '! Your stats have been reset.';
	}
	this.buy = function buy(amount) {
		amount = Number(amount) || 1;
		if (money < amount)
			return 'You don\'t have enough money';
		money -= amount;
		chems += amount;
		if (Math.random() < prisonChance * amount)
			return prison('buying illegal chemicals');
		prisonChance += 0.0001 * amount;
		return 'You bought ' + amount + ' chems! (total: ' + chems + ')';
	};
	this.make = function make(amount) {
		amount = Number(amount) || 1;
		if (chems < amount)
			return 'You don\'t have enough chems';
		let drugsMade = amount;
		for (let i = 0; i < amount; i++)
			if (0.3 > Math.random()) drugsMade += 1;
		chems -= amount;
		drugs += drugsMade;
		prisonChance += 0.0001 * amount;
		return 'You made ' + drugsMade + ' drugs! (total: ' + drugs + ')';
	};
	this.sell = function sell(amount) {
		amount = Number(amount) || 1;
		if (drugs < amount)
			return 'You don\'t have any drugs to sell!';
		drugs -= amount;
		money += 2 * amount;
		if (Math.random() < prisonChance * amount)
			return prison('selling drugs');
		prisonChance += 0.001 * amount;
		return 'You sold ' + amount + ' drugs! (remaining: ' + drugs + ')';
	};
	this.stats = function stats() {
		return 'Money: ' + money +
			'\nDrugs: ' + drugs +
			'\nChems: ' + chems +
			'\nPolice suspicion: ' + prisonChance +
			(0 < Object.keys(dealers).length
				? '\nDealers: ' + Object.keys(dealers).length
				: '');
	};
	this.bribe = function bribe() {
		if (0 >= prisonChance || 10 > money)
			return 'Already bribed or not enough money';
		if (0.00001 > Math.random())
			return prison('bribing');
		money -= 10;
		prisonChance = 0;
		return 'Bribed the police';
	};
	this.dealer = function dealer() {
		if (20 > money)
			return 'Not enough money';
		money -= 20;
		const [ , dealerID ] = String(Math.random()).split('.');
		const newDealer = {
			id: dealerID,
			interval: setInterval(() => {
				if (Math.random() < prisonChance * drugs) {
					console.log('Dealer was arrested');
					clearInterval(dealers[dealerID].interval);
					delete dealers[dealerID];
				} else if (0 < drugs) {
					let soldDrugs = 0;
					for (let i = 0; 3 > i; i++)
						if (0 < drugs) {
							drugs--;
							soldDrugs++;
						}
					const drugValue =
						(Math.round(Math.random() * 10) / 10 + 2) * soldDrugs;
					money += drugValue;
					console.log('Dealer sold ' + soldDrugs +
						' drugs for ' + drugValue +
						'$ (total: ' + money + '$)');
				}
			}, 60000)
		};
		dealers[dealerID] = newDealer;
		return 'Hired dealer';
	};
}
if (module) module.exports = DrugRPG;
