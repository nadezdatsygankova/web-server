const express = require('express');
const path = require('path');
const hbs = require('hbs');//for partials
const forecast = require('./utils/forecast');

// console.log(__dirname); //src
// console.log(__filename); //src/app.js
const app = express()
//Define paths for Express config
const publicDirectoryPath = (path.join(__dirname, '../public'))
//tell name for directory for all views(templates)
const viewsPath = path.join(__dirname, '../templates/views')
//for partial
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
//tell express where find a views
app.set('views', viewsPath)
//for partial
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Nadia Tsygankova'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is a help page',
    title: 'Help',
    name: 'Nadia Tsy'
  })
})
app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'Nadia Tsygankova'
  })
})
app.get('/weather', (req, res) => {
if(!req.query.address){
  return res.send({
    error: 'You must provide a weather term'
  })
}

forecast(req.query.address, (error, {body}={}) =>{
  if(error){
    return res.send({error})
  }
  console.log(body)
   res.send({
    address: req.query.address,
    temperature: body.current.temperature,
    location: body.location.name,
    feelslike: body.current.feelslike,
    weather_icons: body.current.weather_icons,
    weather_descriptions: body.current.weather_descriptions
  })
})
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  console.log(req.query.search)
  res.send({
    forecast: [],
  })
})
app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Nadia Tsygankova',
    errorMessage: 'Help article not found.'
  })
})


//for all others
app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Nadia Tsygankova',
    errorMessage: 'Page not found.'
  })
})

const port = process.env.PORT || 3000
app.listen(port, () => {
console.log('Server is up on port ' + port)
})