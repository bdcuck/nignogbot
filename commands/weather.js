'use strict'

const { commandText } = require('../utils');
const { json } = require('req');
const K = 273.15;
const getCardinalDirection = (angle) => {
	if (typeof angle === 'string') angle = parseInt(angle);
	if (angle <= 0 || angle > 360 || typeof angle === 'undefined') return '☈';
	const arrows = { north: '↑ N', north_east: '↗ NE', east: '→ E', south_east: '↘ SE', south: '↓ S', south_west: '↙ SW', west: '← W', north_west: '↖ NW' };
	const directions = Object.keys(arrows);
	const degree = 360 / directions.length;
	angle = angle + degree / 2;
	for (let i = 0; i < directions.length; i++) {
	  if (angle >= (i * degree) && angle < (i + 1) * degree) return arrows[directions[i]];
	}
	return arrows['north'];
  }
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
		Wind: ${data.wind.speed}m/s ${getCardinalDirection(data.wind.deg)}
		`)
	})
};

module.exports.help = 'Current weather. Example usage: /weather Kanker or /weather Burkina Faso';

