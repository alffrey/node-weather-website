const request = require('request')

const geocode = (address, callback) => {
    const geocodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWxmZnJleSIsImEiOiJjazh0N205OXAweGZwM2dvNHl0a3Z0c3F6In0.GeZCNi3lBUAg48AGx6PXgQ&limit=1'

    request({ url: geocodeUrl, json: true}, (error, {body}) => {
        if (error) {
            callback({error: 'Unable to connect to geocode services.'})
        } else if (body.features.length < 1) {
            callback({error: 'Unable to find location. Try another search.'})
        } else {
            const features = body.features[0]
            callback(undefined, {
                latitude: features.center[1],
                longitude: features.center[0],
                location: features.place_name
            })
        }
    })
}

module.exports = geocode