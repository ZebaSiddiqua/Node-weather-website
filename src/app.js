const path = require('path');
const express = require('express');
const hbs= require('hbs')
const geocode = require('./utils/geocode.js')
const forecast =require('./utils/forecast.js')
// calling express() and it has no arguments but various methods can be applied on app 
const app = express()
//setting up routes using get method. This tells wat has to be sent back when some recieves the route
//function has 2 argurements request and response.

//app.use is used to customise server.
//path.joiin method is used to join the path and provide express the path to serve up 

const  publicDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath =path.join(__dirname,'../templates/partials')

app.use(express.static(publicDirectory));
// to regiter partials
hbs.registerPartials(partialsPath);
// app.get('/about' , (req,res)=>{
//     res.send("<h1> Hey there </h1>")
// }) can be removed as app.use does this for us n serves up our html file

//app . set allow u to set value to express view engine
app.set('view engine', 'hbs')
app.set('views',viewPath)

app.get('' , (req,res)=> {
    res.render('index' , {
        title: "Weather App",
        name : 'Zeba Siddiqua'
    })
})

app.get('/about' , (req,res)=> {
  res.render('about',{
    title: "About me",
    name : 'Zeba Siddiqua'
})
})

app.get('/help' , (req,res)=> {
    res.render('help' , {
        title: "Help",
        name : 'Zeba Siddiqua' 
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error : "You must provide an address"
        })
    }

    geocode(req.query.address, (error,{Latitude,Longitude,Location} = {}) =>{
        if (error){
            return res.send({error})
          }
        
          forecast(Latitude, Longitude, (error, forecastdata) => {
            if (error){
              return res.send({error})
            }

            res.send({
                forecast : forecastdata ,
                Location ,
                address : req.query.address,
            })
    })
})

})








app.get('/help/*',(req,res)=>{
    res.render('404' , {
        title: "404" ,
        errormessage : "Help article not found",
        name : "Zeba"
    })
})
//* match anything which hasnt been addressed, hence to be put at the end after setting up other routes.
app.get('*',(req,res)=>{
    res.render('404' , {
        title: "404" ,
        errormessage : "Page not found",
        name : "Zeba"
    })
})
//to start server method
app.listen(3000, () =>{
    console.log('Server is up on port 3000.')
})