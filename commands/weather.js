const { commandText } = require('../utils');
const { json } = require('req');
const K = 273.15;

module.exports = ({ reply, message }) => {
	let link = "http://api.openweathermap.org/data/2.5/weather?q=" + commandText(message) + "&APPID=5d791ab978431089d7c150835e9fc86a"
	json(link).then(data => {
		if (data.cod !== 200) return reply('Error:\n' + JSON.stringify(data));
		let city = data.name + ", " + data.sys.country;
		let temperature = Math.floor(data.main.temp - K);
		let description = data.weather[0].description;
		reply('Weather in ' + city + ': ' + temperature + '°C, ' +
			description)
	})
}