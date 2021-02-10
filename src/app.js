const path = require('path')
const express = require('express')
const hbs=require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')


const app = express()

//define path for express config
const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialPath = path.join(__dirname,"../templates/partials")

//setup handlebars view and engine location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialPath) 

//setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('',(req,res) =>{
    res.render('index',{
        title : 'Weather',
        name : 'Nikita Mahatma'
    })
})

app.get('/help',(req,res) =>{
    res.render('help',{
        title : 'Help',
        headText : 'This is some helpful information',
        name : 'Nikita Mahatma'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name : 'Nikita Mahatma'
    })
})
app.get("/help/*",(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Nikita Mahatma',
        errorMessage : 'Help article not found'
    })

})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide Address"
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location})=>{
        if(error){
            return res.send({error})
        }

        forecast(latitude,longitude,(error,forecastData)=>{
          //  return res.send(forecastData);
            if(error){
                return res.send({error})
            }

            res.send({
                forecast : forecastData,
                location,
                address : req.query.address
            })
        })


    })
   /*  res.send({
        forecast : "It is snowing",
        location : "Pune",
        address : req.query.address
    }) */
})

app.get("/products",(req,res)=>{

    if(!req.query.search){
        return res.send({
            error : "You must provide search term"
        })
    }
    res.send({
        products : []
    })
})

app.get("*",(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Nikita Mahatma',
        errorMessage : 'Page not found'
    })

})


app.listen(3000,() =>{
    console.log('server is up on port 3000')
})