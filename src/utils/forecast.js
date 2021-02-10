const request = require('request')

const forecast = (latitude,longitude,callback) =>
{
    const url= 'http://api.weatherstack.com/current?access_key=64f0959e3571a1690c2a573cc3cede1b&query='+latitude+','+longitude+'&units=f'
    request({ url : url , json : true},
        (error,{body})=>{
            if(error){
                callback("Unable to connect weather service")
            }
            else if(body.error)
            {
                callback("Unable to find location")
            }else{
               // console.log(response.body.current.temprature)
               callback(undefined,'It is currently '+body.current.temperature+' degrees out. There is a '+body.current.precip+'% chance of rain')
               
            }
            
        })
}

module.exports = forecast


    
    