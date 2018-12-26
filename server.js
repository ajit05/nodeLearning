const express=require('express');
const fs=require('fs');
const hbs=require('hbs');
var app=express();
const port=process.env.PORT || 3000;
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
// app.use((req,res,next)=>
// {
//   res.render('maintenance.hbs');
//   //next();
// })
// app.get('/',(req,res)=>
// {
//   res.send({
//     "name": "Ajit Tripathy",
//     "location":"Mangalore Karnatak",
//     "isAvailable":"YES"
//   });
// });
app.get('/about',(req,res)=>
{
  res.render('about.hbs',{
    pageTitle:'About Ajit Tripathy',
    year:     new Date().getFullYear()

  });
});

app.get('/',(req,res)=>
{
  res.render('home.hbs',{
    pageTitle:'Home Page',
    message:'Welcome',
    year:     new Date().getFullYear()
  })
})
app.listen(port);
console.log('Severe start at port:3000');
