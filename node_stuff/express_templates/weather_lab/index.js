const express = require('express')
const app = express()
app.set('view engine','ejs')
let https = require('https')
var url  = "https://api.weather.gov/points/"
let options = { 
    headers : {
      'User-Agent': 'forecast'
    }
  }
app.get('/weatherform',(req,res)=>{
    res.render('weatherform')
})
app.get('/destination',function (req,res,next){
    let latitude = '';let longitude = ''
    if('latitude' in req.query){
        latitude = req.query.latitude
    }
    if('longitude' in req.query){
        longitude = req.query.longitude
    }
    res.locals.render_dict = {
        'latitude':latitude,
        'longitude':longitude,
        'periods':'',
        'city':''
    }
    console.log(url+latitude+','+longitude)
    https.get(url+latitude+','+longitude,options, (response) => {
        if(response.statusCode!==200){
          return res.render('error')
        }
        let aggregatedResponseString = '';
      
        response.on('data', (chunk) => {
          aggregatedResponseString += chunk;
        });
      
        response.on('end', () => {
          json1 = JSON.parse(aggregatedResponseString)
          console.log(json1)
          res.locals.render_dict['city'] = json1['properties']['relativeLocation']['properties']['city'] + ', '+json1['properties']['relativeLocation']['properties']['state']
          res.locals.forecast_link = json1['properties']['forecast']
          next()
        });
      })
    
},
function (req,res){
  https.get(res.locals.forecast_link,options,(response)=>{
    if(response.statusCode!==200){
      return res.render('error')
    }
    let agg = ''
    response.on('data', (chunk) => {
        agg += chunk;
      });
    response.on('end',()=>{
        json2 = JSON.parse(agg)
        res.locals.render_dict['periods'] = json2['properties']['periods']
        // var periods = json2['properties']['periods']
        // console.log(render_dict)
        res.render('destination',res.locals.render_dict)
    })
  })
}
)
const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function() {
      console.log("Express server started");
    })