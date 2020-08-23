const request = require('postman-request');

const MAPBOX_BASE_URL = 'https://api.mapbox.com/geocoding/v5/mapbox.places';
const MAPBOX_ACCESS_KEY = 'pk.eyJ1IjoieWFuYTYxNyIsImEiOiJja2N0ZHo1aGEwOWI5MnRwYjFhZG9mYm04In0.VuurRZwmP9aahZpJqTVISA';

const geocode = (address, callback) => {
  const url = `${MAPBOX_BASE_URL}/${encodeURIComponent(address)}.json?access_token=${MAPBOX_ACCESS_KEY}&limit=1`;

  request({ uri: url, json: true }, (err, res) => {
    if (err) {
      return callback('Unable to connect');
    }
    if (!res.body.features || res.body.features.length === 0) {
      return callback('Unable to find location');
    }
    const [place] = res.body.features;
    const [long, lat] = place.center;
    const { place_name } = place;
    return callback(null, {
      long,
      lat,
      location: place_name,
    });
  })
}

module.exports = geocode;
