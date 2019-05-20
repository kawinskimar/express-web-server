const path = require('path')
const express = require('express')

const app = express()

const publicDirectoryPath = path.join(__dirname, '..', 'public')

app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs')

app.get('', (req, res) => {
   res.render('index')
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