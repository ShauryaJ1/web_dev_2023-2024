const express = require('express')
const app = express()
app.set('view engine','ejs')

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db');

app.get('/',(req,res)=>{
    res.render('form')
})

app.get('/heroStats',(req,res)=>{
  res.render('heroStats')
})

const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function() {
      console.log("Express server started");
    }
)