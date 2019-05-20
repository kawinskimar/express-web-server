const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '..', 'public')
const viewsPath = path.join(__dirname, '..', 'templates', 'views')
const partialsPath = path.join(__dirname, '..', 'templates', 'partials')

// Set up handlebars engine and views/partials location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
   res.render('index', {
      title: 'Forecast',
      name: 'Marissa Kawinski'
   })
})

app.get('/about', (req, res) => {
   res.render('about', {
      title: 'About',
      name: 'Marissa Kawinski'
   })
})

app.get('/help', (req, res) => {
   res.render('help', {
      title: 'Help',
      name:'Marissa Kawinski',
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
   })
})

app.get('/forecast', (req, res) => {
   res.send({
      location: 'Meadville',
      forecast: 'Cloudy with a chance of meatballs'
   })
})

app.get('/products', (req, res) => {
   if(!req.query.search) {
      return res.send({
         error: 'You must provide a search term'
      })
   }
   console.log(req.query)
   res.send({
      products: []
   })
})

app.get('/time-machine', (req, res) => {
   res.send({
      location: 'Meadville',
      date: '05/18/2017',
      forecast: 'Sunny with a high of 76F'
   })
})

app.get('/help/*', (req, res) => {
   res.render('404', {
      title: 404,
      name: 'Marissa Kawinski',
      errorMessage: 'Help article not found.'
   })
})

app.get('*', (req, res) => {
   res.render('404', {
      title: 404,
      name: 'Marissa Kawinski',
      errorMessage: 'Page not found.'
   })
})

app.listen(3000, () => {
   console.log('Server is up on port 3000.')
})