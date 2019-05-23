const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const weather = require('./utils/weather')
const forecast = weather.forecast
const timeMachine = weather.timeMachine

const app = express()

// Define paths for Express config
const publicDirPath = path.join(__dirname, '..', 'public')
const viewsPath = path.join(__dirname, '..', 'templates', 'views')
const partialsPath = path.join(__dirname, '..', 'templates', 'partials')
const port = process.env.PORT || 8080

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
   if(!req.query.address) {
      return res.send({
         error: 'You must provide an address'
      })
   }
   geocode(req.query.address, (error, geoData = {}) => {
      if(error) {
         return res.send({ error })
      }
      forecast(geoData, (error, { currently, daily }) => {
         if(error) {
            return res.send({ error })
         }
         res.send({
            location: geoData.place,
            queryAddress: req.query.address,
            currentTemp: currently.temperature,
            currentPrecipProb: currently.precipProbability*100,
            feelsLike: currently.apparentTemperature,
            humidity: currently.humidity*100,
            tempHigh: daily.data[0].temperatureHigh,
            tempLow: daily.data[0].temperatureLow,
            summary: daily.summary
            
         })
      })
   })
})

// app.get('/time-machine', (req, res) => {
//    res.send({
//       location: 'Meadville',
//       date: '05/18/2017',
//       forecast: 'Sunny with a high of 76F'
//    })
// })

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

app.listen(port, () => {
   console.log('Server is up on port ' + port)
})