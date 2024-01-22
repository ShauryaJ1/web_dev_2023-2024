const express = require('express')
// const stocks_router = express()
// stocks_router.set('view engine', 'ejs')
const stocks_router = express.Router()
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
function sqlPromise(query, params =[]) {
    return new Promise( (resolve,reject) => {
      db.all(query, params,(err,rows) => {
        if (err) reject(err);
        
        resolve(rows);
      })
    })
  }
var tracked_stocks = []
months_needing_one = ['0','1','2','3','4','5','6','7','8']
let stockInsertQuery = `INSERT INTO stocks VALUES (?,?,?,?)`
let stockDeleteQuery = `DELETE FROM stocks WHERE stockTicker=?`
let selectAllQuery = `SELECT * FROM stocks`


var request = require('request');

let my_json = {}
var simple_query = 'https://api.polygon.io/v2/aggs/ticker/AAPL/range/1/day/2023-01-09/2023-01-09?apiKey=CXVpx6cCok93NKqjvvb7WSZwiwNG1wdd'
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
days_of_the_week = ['Sunday','Monday','Tuesday','Wednesday',"Thursday",'Friday','Saturday']
weekdays = days_of_the_week.slice(1,6)
var query = 'https://api.polygon.io/v2/aggs/ticker/'
stocks_router.get('/analytics',(req,res,next)=>{
  

  res.render('analytics.ejs')
})
stocks_router.get('/stock',(req,res,next)=>{
    
  
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
stocks_router.get('/forDBFetching',async (req,res)=>{
  links = []
  result = await sqlPromise(selectAllQuery)
  console.log(result)
  let dateObj = new Date();
  dateObj.setDate(dateObj.getDate() - 1);
  yesterdayDate = dateObj.getFullYear()+'-'
  if (months_needing_one.indexOf(dateObj.getMonth().toString())==-1){
    
    
    yesterdayDate+=(parseInt(dateObj.getMonth())+1).toString()
  }
  else{
    yesterdayDate+='0'+(parseInt(dateObj.getMonth())+1).toString()
    
  }
  if (dateObj.getDate().length<2){
    yesterdayDate+='-0'+dateObj.getDate()
  }
  else{
    yesterdayDate+='-'+dateObj.getDate()
  }
  render_dict = {'result':result,'yesterday':yesterdayDate}
  for(var i=0;i<result.length;i++){
    links.push('/stockResultsFetch?stockTicker='+result[i]['stockTicker']+'&startDate='+result[i]['startDate']+'&endDate='+yesterdayDate+'&track=')
  }
  render_dict['links'] = links
  console.log(links)
  res.json(render_dict)

})
stocks_router.get('/stockResultsFetch',(req,res,next)=>{
  let startDate = ''
  let endDate = ''
  let stockTicker = ''
  let numberOfShares = ''
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
  if('shares' in req.query) {
    numberOfShares = req.query.shares
  }
  res.locals.render_dict = {
    'endDate':endDate,
    'startDate':startDate,
    'stockTicker':stockTicker,
    'shares':parseInt(numberOfShares)
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
},async (req,res)=>{
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
  console.log(day_difference)
  for (e in res.locals.render_dict['data']){
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
    nextDate.setDate(nextDate.getDate()+1)
    console.log(months[nextDate.getMonth()])
    // console.log(nextDate.getMonth())

    // console.log(nextDate.toString())
    for(let i = 0;i<=day_difference;i++){
      if(weekdays.includes(days_of_the_week[nextDate.getDay()])){
      res.locals.render_dict['dates'].push(days_of_the_week[nextDate.getDay()]+' '+ months[nextDate.getMonth()] +' '+ nextDate.getDate()+' '+nextDate.getFullYear())
      }
      nextDate.setDate(nextDate.getDate()+1)
    }

  }
  console.log(res.locals.render_dict)
  if('track' in req.query){
    if(req.query.track =='track' && tracked_stocks.indexOf(res.locals.render_dict['stockTicker'])==-1){
      result = await sqlPromise(stockInsertQuery,[res.locals.render_dict['stockTicker'],res.locals.render_dict['startDate'],res.locals.render_dict['close'][0],res.locals.render_dict['shares']])
      
      tracked_stocks.push(res.locals.render_dict['stockTicker'])
      console.log(result)
      console.log(tracked_stocks)
    }
    if (req.query.track=='untrack'){
      console.log('untracked')
      result = await sqlPromise(stockDeleteQuery,[res.locals.render_dict['stockTicker']])
      delete tracked_stocks[tracked_stocks.indexOf(res.locals.render_dict['stockTicker'])]
    }
  }
  console.log('RESPONSE 2')
  console.log(res.locals.render_dict)
  res.json(res.locals.render_dict)

})
stocks_router.get('/',async (req,res)=>{
  links = []
  result = await sqlPromise(selectAllQuery)
  console.log(result)
  let dateObj = new Date();
  dateObj.setDate(dateObj.getDate() - 1);
  yesterdayDate = dateObj.getFullYear()+'-'
  if (months_needing_one.indexOf(dateObj.getMonth().toString())==-1){
    
    
    yesterdayDate+=(parseInt(dateObj.getMonth())+1).toString()
  }
  else{
    yesterdayDate+='0'+(parseInt(dateObj.getMonth())+1).toString()
    
  }
  if (dateObj.getDate().length<2){
    yesterdayDate+='-0'+dateObj.getDate()
  }
  else{
    yesterdayDate+='-'+dateObj.getDate()
  }
  render_dict = {'result':result,'yesterday':yesterdayDate}
  for(var i=0;i<result.length;i++){
    links.push('/stockResults?stockTicker='+result[i]['stockTicker']+'&startDate='+result[i]['startDate']+'&endDate='+yesterdayDate+'&track=' + '&shares=' + result[i]['shares'] )
  }
  render_dict['links'] = links
  console.log(links)
  res.render('home.ejs',render_dict)
})
stocks_router.get('/about',(req,res)=>{
  res.render('about.ejs')
})
stocks_router.get('/stockForm',(req,res)=>{
  res.render('stockForm.ejs')
})
stocks_router.get('/stockResults',(req,res,next)=>{
  let startDate = ''
  let endDate = ''
  let stockTicker = ''
  let numberOfShares = ''
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
  if('shares' in req.query) {
    numberOfShares = req.query.shares
  }
  res.locals.render_dict = {
    'endDate':endDate,
    'startDate':startDate,
    'stockTicker':stockTicker,
    'shares':parseInt(numberOfShares)
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
},async (req,res)=>{
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
  console.log(day_difference)
  for (e in res.locals.render_dict['data']){
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
    nextDate.setDate(nextDate.getDate()+1)
    console.log(months[nextDate.getMonth()])
    // console.log(nextDate.getMonth())

    // console.log(nextDate.toString())
    for(let i = 0;i<=day_difference;i++){
      if(weekdays.includes(days_of_the_week[nextDate.getDay()])){
      res.locals.render_dict['dates'].push(days_of_the_week[nextDate.getDay()]+' '+ months[nextDate.getMonth()] +' '+ nextDate.getDate()+' '+nextDate.getFullYear())
      }
      nextDate.setDate(nextDate.getDate()+1)
    }

  }
  console.log(res.locals.render_dict)
  if('track' in req.query){
    if(req.query.track =='track' && tracked_stocks.indexOf(res.locals.render_dict['stockTicker'])==-1){
      result = await sqlPromise(stockInsertQuery,[res.locals.render_dict['stockTicker'],res.locals.render_dict['startDate'],res.locals.render_dict['close'][0],res.locals.render_dict['shares']])
      
      tracked_stocks.push(res.locals.render_dict['stockTicker'])
      console.log(result)
      console.log(tracked_stocks)
    }
    if (req.query.track=='untrack'){
      console.log('untracked')
      result = await sqlPromise(stockDeleteQuery,[res.locals.render_dict['stockTicker']])
      delete tracked_stocks[tracked_stocks.indexOf(res.locals.render_dict['stockTicker'])]
    }
  }
  res.render('stockResults.ejs',res.locals.render_dict)

}


)
module.exports = stocks_router