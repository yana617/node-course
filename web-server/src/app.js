const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDir))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Yana Sidorova',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About page',
    name: 'Yana Sidorova',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    name: 'Yana Sidorova',
  });
});

app.get('/weather', (req, res) => {
  res.send('Weather page');
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help sub page',
    name: 'Yana Sidorova',
    errorMessage: 'Help article not found.',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 page',
    name: 'Yana Sidorova',
    errorMessage: 'Page not found.',
  });
});

app.listen(8888, () => {
  console.log('Server is up on port 8888!')
})
