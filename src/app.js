const path = require('path')
const express = require('express')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '..', 'public')
const viewsPath = path.join(__dirname, '..', 'templates')

// Set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
   res.render('index', {
      title: 'Weather App',
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
      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
   })
})

app.get('/forecast', (req, res) => {
   res.send({
      location: 'Meadville',
      forecast: 'Cloudy with a chance of meatballs'
   })
})

app.get('/time-machine', (req, res) => {
   res.send({
      location: 'Meadville',
      date: '05/18/2017',
      forecast: 'Sunny with a high of 76F'
   })
})

app.listen(3000, () => {
   console.log('Server is up on port 3000.')
})