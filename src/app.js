
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forecast')


//starting express
const app = express()

//setting views and hbs
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

//setting public folder
app.use(express.static(path.join(__dirname, '../public')))

//rotes 
app.get('', (req , res) => {
    res.render('index', {
        title: 'Weather Home',
        desc: 'Weather home description'
    })
})
app.get('/about', (req , res) => {
    res.render('about' , {
        title: 'about us' , 
        desc: 'This page is coming from hbs'
    })
})
app.get('/help', (req , res) => {
    res.render('help' , {
        title: 'help ' , 
        desc: 'This help page is coming from hbs'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address , (error, {latitude, longitude, location} = {}) =>  {
        if(error) {
            return res.send({ error})
        }
        forcast(latitude,longitude, (error, forecastData)=> {
            if(error) {
                return res.send({error})
            }

            res.send({
                forcast: forecastData, 
                location: location,
                address: req.query.address
            })

        })
    })

    // res.send({
    //     forcast: 'Its a sunny day', 
    //     location: 'new York',
    //     address: req.query.address
    
    // })
})
app.get('/help/*', (req, res) => {
    res.render ('404', { 
    title: '404', 
    desc:'This is an error page', 
    errorMsg: 'Help document not found'
    })
})
//404
app.get('*', (req, res) => {
    res.render('404', {
        title: '404', 
        desc: 'This is an error page', 
        errorMsg: 'Page not found'
    })
})



//start server
app.listen(3000, ()=> {
    console.log('Server started at port 3000')
})