const express = require('express')
const app = express()
app.set('view engine', 'ejs')
var request = require('request');


var query = 'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?apiKey=CXVpx6cCok93NKqjvvb7WSZwiwNG1wdd'
app.get('/',(req,res)=>{
    

  // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
  var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=GOOG&interval=5min&apikey=WHP0R3AGKQ3KTWPI';
  
  request.get({
      url: query,
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
        console.log(my_json)
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