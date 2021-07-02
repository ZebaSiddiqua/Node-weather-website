const request =require("postman-request")

const geoCode =  (address, callback)=>{
    const url  = " https://api.mapbox.com/geocoding/v5/mapbox.places/ " + encodeURIComponent(address) + "  .json?access_token=pk.eyJ1IjoienNpZGRpcXVhMiIsImEiOiJja3B4dnRkN2YwZXluMm9ud2d1YXBsd2cwIn0.w3FMVZ4qs9hhRuhCErVVqQ&limit=1"
    request({url , json :true} , (error , {body/*response.body*/})=>{
        if (error) {
            callback('Unable to connect to location services.', undefined)
        } else if(body.features.length === 0){
            callback('Unable to find location. Please try another search', undefined)
        } else {
            callback(undefined, {
                Latitude : body.features[0].center[1] ,
                Longitude : body.features[0].center[0]  ,
                Location : body.features[0].place_name
            })
        }
    })
    }
  
    module.exports = geoCode