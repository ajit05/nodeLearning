const express=require('express');
const fs=require('fs');
const hbs=require('hbs');
var app=express();
hbs.registerPartials(__dirname+'/views/partials');//for partials
app.use(express.static(__dirname+'/public'))//static file
app.set('view engine','hbs');
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
app.use((req,res,next)=>
{
  res.render('maintenance.hbs');
  //next();
})
app.get('/',(req,res)=>
{
  //res.send('<h1>hello Express</h1>');
  res.send({
    "name": "Ajit Tripathy",
    "location":"Mangalore Karnatak",
    "isAvailable":"YES"
  });
});
app.get('/about',(req,res)=>
{
  res.render('about.hbs',{
    pageTitle:'About Page',
    year:     new Date().getFullYear()

  });
});

app.get('/home',(req,res)=>
{
  res.render('home.hbs',{
    pageTitle:'Home Page',
    message:'Welcome To Rehan World, have  greate fun',
    year:     new Date().getFullYear()
  })
})
app.listen(3000);
console.log('Severe start at port:3000');
