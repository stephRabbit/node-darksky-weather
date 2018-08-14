const yargs = require('yargs')

const goecode = require('./geocode/geocode')
const weather = require('./weather/weather')

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

// Make request to Google API
goecode.geocodeAddress(argv.address, (errorMessage, results) => {
  if (errorMessage) {
    console.log(errorMessage)
  }
  else {
    const { address, latitude, longitude } = results
    console.log(address);
    weather.getWeather(latitude, longitude, true, (errorMessage, weatherResults) => {
      if (errorMessage) {
        console.log(errorMessage)
      }
      else {
        //console.log(JSON.stringify(results, undefined, 2))
        console.log(`It's currently ${weatherResults.temperature}. It feels like ${weatherResults.apparentTemperature}.`)
      }
    })
  }
})