const request = require('request')

const toCelsius = temp => Math.round(((5/9) * (temp - 32)) * 100) / 100

const getWeather = (lat, lng, celsius, callback) => {
  request({
    url: `https://api.darksky.net/forecast/be25429875d0a402bccc2375e2312abc/${lat},${lng}`,
    json: true
  }, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      callback(undefined, {
        apparentTemperature: celsius ? toCelsius(body.currently.apparentTemperature) : body.currently.apparentTemperature,
        temperature: celsius ? toCelsius(body.currently.temperature) : body.currently.temperature
      })
    }
    else {
      callback('Unable to fetch weather.')
    }
  })
}

module.exports.getWeather = getWeather