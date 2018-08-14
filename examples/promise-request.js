const request = require('request')

const geocodeAddress = address => {
  return new Promise((reslove, reject) => {
    request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}`,
      json: true
    }, (error, response, body) => {
      if (error) {
        reject('Oops, Unable to connect to Google servers.')
      }
      else if (body.status === 'ZERO_RESULTS') {
        reject('Oops, Unable to find location.')
      }
      else if (body.status === 'OK') {
        reslove({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng
        })
      }
    })
  })
}

geocodeAddress('90210').then(location => {
  console.log(JSON.stringify(location, undefined, 2))
})
.catch(error => {
  console.log(error)
})