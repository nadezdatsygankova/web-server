const request = require('postman-request');

const forecast = (location, callback) => {
  const url =`http://api.weatherstack.com/current?access_key=b56246cc0e78ebcb09a047f7606948a7&query=${encodeURIComponent(location)}`;
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


