const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const chalk = require('chalk');

const place = process.argv[2];

if (!place) {
  return console.log('Please provide an address');
}

geocode(place, (error, geocodeData) => {
  if (error) {
    return console.log(error);
  }

  forecast(geocodeData.lat, geocodeData.long, (error, weather) => {
    if (error) {
      return console.log(error);
    }
    console.log(geocodeData.place_name)
    console.log('It\'s currently', chalk.green(weather.temperature), 'degrees out, feels like', chalk.blue(weather.feelslike));
  })
});
