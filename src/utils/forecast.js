const request = require('request')


const forecast = (latitude, longitiude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=b044f2d978defe2ab41566e4505a72d8&query='+ latitude + ',' + longitiude 
    request({ url: url, json: true} , (error, {body}) => {
        if(error) {
            callback('Network Error', undefined)
        } else if (body.error) {
            callback('invalid data', undefined)
        } else {
            //callback(undefined, response.body.current.weather_descriptions + '')
            callback(undefined, body.current.weather_descriptions + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip + '% chance of rain.')

        }

    })
}

module.exports = forecast