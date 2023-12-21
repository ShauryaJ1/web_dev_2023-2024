const express = require('express')
const app = express()
app.set('view engine', 'ejs')
var request = require('request');


app.get('/',(req,res)=>{
    

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=GOOG&interval=5min&apikey=WHP0R3AGKQ3KTWPI';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      my_json = data
      console.log(my_json['Meta Data'])
    }
});

res.send('Check your terminal')
})

const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function() {
      console.log("Express server started");
    })