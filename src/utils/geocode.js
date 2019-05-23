const request = require('request')
require('dotenv').config()

const geocode = (location, callback) => {
    const token = process.env.MAPBOX_KEY
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=' + token + '&limit=1'
    request({
        url,
        json: true
    }, (error, { body }) => {
        if(error) {
            callback('Unable to connect to geolocation service.', undefined)
        } else if(body.features.length === 0) {
            callback('The location provided is invalid.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode