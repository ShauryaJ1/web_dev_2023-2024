const express = require('express')
const app = express()
let https = require('https')

let url1  = "https://api.weather.gov/points/44.7069,-93.4274"
let options = { 
    headers : {
      'User-Agent': 'my request value that you should change'
    }
  }

app.get('/',(req,res)=>{
    https.get(url1,options, (response)=>{

        let aggregatedResponseString = '';
    
      response.on('data', (chunk) => {
        aggregatedResponseString += chunk;
      });
      response.on('end',()=>{
        json = JSON.parse(aggregatedResponseString)
        console.log(json['properties']['forecast'])
        // res.json(json)
        https.get(json['properties']['forecast'],options, (response)=>{

            let aggregatedResponseString2 = '';
        
          response.on('data', (chunk) => {
            aggregatedResponseString2 += chunk;
          });
          response.on('end',()=>{
            json2 = JSON.parse(aggregatedResponseString2)
            temperature = json2['properties']['periods'][0]['temperature']
            console.log(temperature)
            res.send(temperature.toString())
            })
        })
        })
    })
    
})

const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function() {
      console.log("Express server started");
    }
  );
