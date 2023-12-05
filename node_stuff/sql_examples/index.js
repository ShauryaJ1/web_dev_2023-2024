const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');


// let sql = `SELECT * FROM characters WHERE c_name = ?`
// let sql2 = `SELECT * FROM equipment WHERE equipment_id = ?`
// let sql3 = `SELECT * FROM quest WHERE quest_id = ?`
// let params1 = ['Henrik']
// let params2 = [0]
// let params3 = [0]

// db.all(sql, params1, (err, rows) => {
//     console.log(err)
//     console.log(rows);
// });

// db.all(sql2, params2, (err, rows) => {
//     console.log(err)
//     console.log(rows);
// });
// db.all(sql3, params3, (err, rows) => {
//     console.log(err)
//     console.log(rows);
// });
// db.close();

const express = require('express')
const app = express()
app.set('view engine','ejs')

// const sqlite3 = require('sqlite3').verbose()
// const db = new sqlite3.Database('database.db');

app.get('/questForm',(req,res)=>{
    res.render('questForm')
})

app.get('/heroStats',(req,res)=>{
  res.render('heroStats')
})

app.get('/equipmentForm',(req,res)=>{
    res.render('equipmentForm')
})

const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function() {
      console.log("Express server started");
    }
)