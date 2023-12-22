const express = require('express')
const app = express()
app.set('view engine', 'ejs')
var request = require('request');

let my_json = {}
var simple_query = 'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?apiKey=CXVpx6cCok93NKqjvvb7WSZwiwNG1wdd'
var query = 'https://api.polygon.io/v2/aggs/ticker/'
app.get('/stock',(req,res,next)=>{
    
  
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
        // data is successfully parsed as a JSON ob\ject:
        

        my_json = data
      
        console.log(typeof my_json)
        // console.log(my_json)

        next()
      }
  }
  
  );

  },(req,res)=>{
    console.log(my_json)
      res.send(my_json)
  }

  )

app.get('/',(req,res)=>{
  res.render('home.ejs')
})
app.get('/about',(req,res)=>{
  res.render('about.ejs')
})
app.get('/stockForm',(req,res)=>{
  res.render('stockForm.ejs')
})
app.get('/stockResults',(req,res,next)=>{
  let startDate = ''
  let endDate = ''
  let stockTicker = ''
  console.log(req.query)
  if('startDate' in req.query) {
    startDate = req.query.startDate
  }
  if('endDate' in req.query) {
    endDate = req.query.endDate
  }
  if('stockTicker' in req.query) {
    stockTicker = req.query.stockTicker
  }
  res.locals.render_dict = {
    'endDate':endDate,
    'startDate':startDate,
    'stockTicker':stockTicker
  }
  console.log(res.locals.render_dict)
  new_query = query + stockTicker + '/range/1/day/'+ startDate +'/'+ endDate + '?adjusted=true&sort=asc&limit=5000&apiKey=CXVpx6cCok93NKqjvvb7WSZwiwNG1wdd'
  console.log(new_query)
  request.get({
    url: new_query,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON ob\ject:
      

      my_json = data
    
      console.log(typeof my_json)
      console.log(my_json)
      next()
      // console.log(my_json)
      
    }
}

);
},(req,res)=>{
  res.locals.render_dict['data'] = my_json['results']
  res.locals.render_dict['volumes'] = []
  res.locals.render_dict['volumes_weighted'] = []
  res.locals.render_dict['opens'] = []
  res.locals.render_dict['transactions'] = []
  res.locals.render_dict['lows'] = []
  res.locals.render_dict['highs'] = []
  res.locals.render_dict['close'] = []
  res.locals.render_dict['dates'] = []
  sDate = new Date(res.locals.render_dict['startDate'])
  eDate = new Date(res.locals.render_dict['endDate'])
  day_difference = Number((eDate.getTime()-sDate.getTime())/(1000*60*60*24))
  for (e in res.locals.render_dict['data']){
    console.log(e)
    res.locals.render_dict['volumes'].push(my_json['results'][e]['v'])
    res.locals.render_dict['volumes_weighted'].push(my_json['results'][e]['vw'])
    res.locals.render_dict['opens'].push(my_json['results'][e]['o'])
    res.locals.render_dict['transactions'].push(my_json['results'][e]['n'])
    res.locals.render_dict['lows'].push(my_json['results'][e]['l'])
    res.locals.render_dict['highs'].push(my_json['results'][e]['h'])
    res.locals.render_dict['close'].push(my_json['results'][e]['c'])
  }
  if(day_difference == 0){
    res.locals.render_dict['dates'] = [res.locals.render_dict['startDate']]

  }
  else{
    nextDate = new Date(res.locals.render_dict['startDate'])
    for(let i = 0;i<day_difference;i++){
      res.locals.render_dict['dates'].push(nextDate.toString())
      nextDate.setDate(nextDate.getDate()+1)
    }

  }
  console.log(res.locals.render_dict)
  res.render('stockResults.ejs',res.locals.render_dict)

}


)
const listener = app.listen(
  process.env.PORT || 8080,
  process.env.HOST || "0.0.0.0",
  function() {
    console.log("Express server started");
  })