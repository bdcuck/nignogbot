'use strict'

const { commandText } = require('../utils');
const { json } = require('req');
const K = 273.15;
const icons = {
	"01d": "☀", "01n": "🌕",
	"02d": "🌤", "02n": "🌤",
	"03d": "⛅", "03n": "⛅",
	"04d": "☁", "04n": "☁",
	"09d": "🌧", "09n": "🌧",
	"10d": "🌦", "10n": "🌦",
	"11d": "🌩", "11n": "🌩",
	"13d": "🌨", "13n": "🌨",
	"50d": "🌫", "50n": "🌫"
};

module.exports = ({ reply, message }) => {
	if(!commandText(message)) return reply('You forgot the location, retard...');
	let link = `http://api.openweathermap.org/data/2.5/weather?q=${commandText(message)}&APPID=5d791ab978431089d7c150835e9fc86a`
	json(link).then(data => {
		if (data.cod !== 200) return reply(`Error:\n${data.cod}: ${data.message}`);
		reply(`Weather in ${data.name}, ${data.sys.country}:
		${Math.floor(data.main.temp - K)}°C, ${data.weather[0].description} ${icons[data.weather[0].icon] || ''}
		
		Max: ${Math.floor(data.main.temp_max - K)}°C
		Min: ${Math.floor(data.main.temp_min - K)}°C
		Humidity: ${Math.floor(data.main.humidity)}%
		Air pressure: ${Math.floor(data.main.pressure)} hPa
		`)
	})
};