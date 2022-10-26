const request = require('postman-request');

const forecast = (location, callback) => {
  const url =`http://api.weatherstack.com/current?access_key=7a62abc011b94ad21b8c61a73f8636ea&query=${encodeURIComponent(location)}`;
  request({url, json: true}, (error, {body} ={})=>{
    if(error){
      callback('Unable to connect to weather service', undefined);
    }else if(body.error){
      callback('Unable to find location', undefined)
    }else{
      callback(undefined,{body})
    }
  })
}

module.exports = forecast;


