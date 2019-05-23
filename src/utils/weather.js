const request = require('request')
if(process.env.NODE_ENV !== 'production') { require('dotenv').config() }

const forecast = ({ latitude, longitude }, callback) => {
   const token = process.env.DARKSKY_KEY
   const url = 'https://api.darksky.net/forecast/' + token + '/' + latitude + "," + longitude
   request({
      url,
      json: true
   }, (error, { body }) => {
      if(error) {
         callback('Unable to connect to weather service.', undefined)
      } else if(body.error) { 
         callback('Unable to find location.', undefined)
      } else {
         callback(undefined, body)
      }
   })
}

const timeMachine = ({ latitude, longitude }, date, callback) => {
   const token = process.env.DARKSKY_KEY
   const time = new Date(date).valueOf() / 1000
   const url = 'https://api.darksky.net/forecast/' + token + '/' + latitude + "," + longitude + "," + time
   console.log(url)
   request({
      url,
      json: true
   }, (error, { body }) => {
      if(error) {
         callback('Unable to connect to weather service.', undefined)
      } else if(body.error) { 
         callback('Unable to find location.', undefined)
      } else {
         callback(undefined, body)
      }
   })
}

module.exports = {
   forecast,
   timeMachine
}