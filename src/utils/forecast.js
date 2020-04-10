const request = require('request')

const forecast = (data, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=cf74d81b1bc81522b9dfbba633201d57&query=${data.latitude},${data.longitude}`

    request({ url: url, json: true }, (error, {body}) => {
        if (error) {
            callback({error: 'Unable to connect to weather service.'})
        } else if (body.error) {
            callback({error: 'Unable to find location.'})
        } else {
            const current = body.current
            callback(undefined, {
                temperature: current.temperature,
                feelslike: current.feelslike,
                summary: current.weather_descriptions[0],
                location: data.location
            })
        }
    })
}

module.exports = forecast