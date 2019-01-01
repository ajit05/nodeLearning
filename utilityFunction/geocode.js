const request=require('request');
var geocodeAddress=(address,callback)=>
{
var encodedAddress=encodeURIComponent(address);

request({
url:`http://www.mapquestapi.com/geocoding/v1/address?key=AlX09dfkrWjEYcWG9ubQpF92Ma4mqvDy&location=${encodedAddress}`,
  //url:'http://www.mapquestapi.com/geocoding/v1/address?key=AlX09dfkrWjEYcWG9ubQpF92Ma4mqvDy&location=Vinayak%20Apartement%20MG%20road%20Mangaluru%20Karnatak%20India',
json:true

},
(error,response,body)=>
{
//console.log(JSON.stringify(response,undefined,2));
//third argumnent for indentation
if(error)
{
  callback('unable to find address');
}
else if(error)
{
  callback('unable to reach google server');
}
else {
  {
     callback(undefined,
     {
       address:body.results[0].providedLocation.location,
       latitude:body.results[0].locations[0].latLng.lat,
       longitude:body.results[0].locations[0].latLng.lng

     });
  }
};
// console.log(body.info.statuscode);
// console.log(`Address: ${body.results[0].locations[0].street}`);
// console.log("  ");
// console.log(`latitude: ${body.results[0].locations[0].latLng.lat}`);
// console.log("  ");
// console.log(`latitude: ${body.results[0].locations[0].latLng.lng}`);
});
};
module.exports.geocodeAddress=geocodeAddress;
