const request =require("postman-request")

// We are setting properties for request using the object, 
//json: true is used to parse the string into JSON format.
//if there is error due to network issues then is captured in request.error

const forecast = ( latitude , longitude , callback) => {
const url = "http://api.weatherstack.com/current?access_key=a7ac325998abc522feb546be48c32a89&query=" + latitude  + "," +   longitude
// console.log(latitude);
// console.log(longitude)
request({url , json :true},(error,{body /*response.body*/})=>{
if (error){
    callback('Unable to connect to weather services!!', undefined)
}
else if (body.error) {
    callback( 'Unable to find location!!', undefined)
}
else{
    
    callback( undefined, body.current.weather_descriptions[0] + ". It is currently " + body.current.temperature + " degrees out. There is " + body.current.precip + "% chance of rain and the humidity is " + body.current.humidity + "%." )}
})
} 

module.exports = forecast  
