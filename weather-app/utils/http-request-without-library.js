const http = require('http');

const WEATHER_STACK_BASE_URL = 'http://api.weatherstack.com/current';
const WEATHER_STACK_ACCESS_KEY = 'f4afaf4954a54ac7feef83dadc0c56d4';
const url = `${WEATHER_STACK_BASE_URL}?access_key=${WEATHER_STACK_ACCESS_KEY}&query=45,-75&units=f`

const request = http.request(url, (response) => {
  let data = '';

  response.on('data', (chunk) => {
    data = data + chunk.toString();
  })
  response.on('end', () => {
    const body = JSON.parse(data);
    console.log(body);
  })
})

request.on('error', (err) => {
  console.log(err);
})

request.end();
