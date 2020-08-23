const request = require('postman-request');

const WEATHER_STACK_BASE_URL = 'http://api.weatherstack.com/current';
const WEATHER_STACK_ACCESS_KEY = 'f4afaf4954a54ac7feef83dadc0c56d4';

const forecast = (lat, long, callback) => {
  const url = `${WEATHER_STACK_BASE_URL}?access_key=${WEATHER_STACK_ACCESS_KEY}&query=${lat},${long}&units=f`

  request({ uri: url, json: true }, (err, res) => {
    if (err) {
      return callback('Unable to connect');
    }
    if (res.body.error) {
      return callback('Unable to find location');
    }

    const { current } = res.body;
    return callback(null, current);
  })
}

module.exports = forecast;
