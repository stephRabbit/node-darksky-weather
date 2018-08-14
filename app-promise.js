const axios = require('axios')
const yargs = require('yargs')

/**
 * alias -a (address)
 * alias -h (help)
 * @type String
 *
 * node app.js -a '123 Adress'
 * node app.js -h
 */
const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv

const encodedAddress = encodeURIComponent(argv.address)
const gecodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`

axios.get(gecodeUrl)
  .then(response => {
    if (response.data.status === 'ZERO_RESULTS') {
      throw new Error('Unable to find that address.')
    }
    const lat = response.data.results[0].geometry.location.lat
    const lng = response.data.results[0].geometry.location.lng
    const weatherUrl = `https://api.darksky.net/forecast/be25429875d0a402bccc2375e2312abc/${lat},${lng}`
    console.log(response.data.results[0].formatted_address)
    return axios.get(weatherUrl)
  })
  .then(response => {
    const temperature = response.data.currently.temperature
    const apparentTemperature = response.data.currently.apparentTemperature
    console.log(`It\'s currently ${temperature}. It Feels like ${apparentTemperature}`)
  })
  .catch(error => {
    if (error.code === 'ENOTFOUND') {
      console.log('Unable to connect to API servers.')
    }
    else {
      console.log(error.message)
    }
  })