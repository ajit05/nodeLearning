const request = require('request');


var getWeather = (lat, lng, callback) =>
{
   console.log(lat, lng);
 request({
    url: `https://api.darksky.net/forecast/d656246990c79e5f161988c867956dbf/${lat},${lng}`,

 json: true

 },
 (error, response, body) => {

   if (error) {

 callback('Unable to connect to Forecast.io server.');

  } else if (response.statusCode === 400) {

 callback('Unable to fetch weather.');

 } else if (response.statusCode === 200) {

   callback(undefined, {

    temperature: body.currently.temperature,
    apparentTemperature: body.currently.apparentTemperature,
    humidity:body.currently.humidity,
    summary:body.currently.summary




   });

 }

  });

};


module.exports.getWeather = getWeather;
