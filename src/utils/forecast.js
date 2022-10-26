const request = require('postman-request');

const forecast = (location, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=f4e56923838acb6aedc9cc5dce1446cb&units=metric`;
  request({ url, json: true }, (error, data) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (data.error) {
      callback('Unable to find location', undefined)
    } else {
      callback(undefined, data.body)
    }
  })
}

module.exports = forecast;


