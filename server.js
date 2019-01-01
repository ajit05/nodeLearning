const express=require('express');
const fs=require('fs');
const hbs=require('hbs');
const {mongoose}=require('mongoose');
const {geoLocation}=require('./model/geolocation');
const {temperature}=require('./model/temperatureDetails');
const {zipCode}=require('./model/zipcode');
const geocode=require('./utilityFunction/geocode');
const weather=require('./utilityFunction/weather');
var bodyParser = require('body-parser');
var app=express();
const port=process.env.PORT || 3000;
hbs.registerPartials(__dirname+'/views/partials');//for partials
app.use(express.static(__dirname+'/public'))//static file
app.set('view engine','hbs');
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: true}));
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use((req,res,next)=>
{
  var now =new Date().toString();
  var log=`${now}:${req.method} ${req.url}`;
  fs.appendFile('server.log',log +'\n',(err)=>
{ if(err)
    console.log('unable to add log');
});
next();
})

app.get('/about',(req,res)=>
{
  res.render('about.hbs',{
    pageTitle:'About Ajit Tripathy',
    year:     new Date().getFullYear()

  });
});



app.get('/',(req,res)=>
{
  geocode.geocodeAddress('delhi',(errorMessage,result)=>
{
  if(errorMessage)
  {

    console.log(errorMessage);
  }
  else
    {
      //console.log(JSON.stringify(result,undefined,2));
      console.log("Zipcode:"+result.address);
      weather.getWeather(result.latitude,result.longitude,(errorMessage,tempinfo)=>
      {
        if(errorMessage)
        {
          console.log();
        }
        else {
          {
            console.log(`currently temperature of this location in Fahrenheit is ${tempinfo.temperature}`);
           console.log("\n");
             var C =	5/9*(tempinfo.temperature - 32)
           console.log(`currently temperature of this location is celcius ${C}`);
              console.log(`humidity  ${tempinfo.humidity}`);
                  console.log(`humidity  ${tempinfo.icon}`);
             console.log(`currently temperature of this location is ${tempinfo.apparentTemperature}`);
             res.render('home.hbs',{
               default:'Temperature of our capital is .....',
              pageTitle:'Home Page',
               message:' welcome',
               tempearture:C,
               apperentTemperture:tempinfo.apparentTemperature,
               humidity:tempinfo.humidity,
               summary:tempinfo.summary,
                year:     new Date().getFullYear(),
             });
          }
        }
      });
    }
});
//----
//   res.render('home.hbs',{
//     pageTitle:'Home Page',
//     message:'Welcome',
//
//
//   }
// );
});

app.post('/fetchTemp',urlencodedParser,(req,res)=>
{
   var zipcode = new zipCode({
     pincode: req.body.pincode
   });
   var pin=req.body.pincode;
  console.log(req.body.pincode);
  console.log("length="+req.body.pincode.length);
//  res.status(200).send({zipcode});
  geocode.geocodeAddress(pin,(errorMessage,result)=>
{
  if(errorMessage)
  {

    console.log(errorMessage);
  }
  else
    {
      //console.log(JSON.stringify(result,undefined,2));
      console.log("Zipcode:"+result.address);
      weather.getWeather(result.latitude,result.longitude,(errorMessage,tempinfo)=>
      {
        if(errorMessage)
        {
          console.log();
        }
        else {
          {
            console.log(`currently temperature of this location in Fahrenheit is ${tempinfo.temperature}`);
           console.log("\n");
             var C =	5/9*(tempinfo.temperature - 32)
           console.log(`currently temperature of this location is celcius ${C}`);
              console.log(`humidity  ${tempinfo.humidity}`);
                  console.log(`humidity  ${tempinfo.icon}`);
             console.log(`currently temperature of this location is ${tempinfo.apparentTemperature}`);
             res.render('home.hbs',{
               default:`Temperature of ${pin} is`,
              pageTitle:'Home Page',
               message:' welcome',
               tempearture:C,
               apperentTemperture:tempinfo.apparentTemperature,
               humidity:tempinfo.humidity,
               summary:tempinfo.summary
             });
          }
        }
      });
    }
});
});




app.listen(port);
console.log('Severe start at port:'+port);
