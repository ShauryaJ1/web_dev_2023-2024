const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');
const express= require('express')
const app = express()
app.set('view engine','ejs')
let sql = `SELECT * FROM characters WHERE c_magic > (?)`
let params = [1]
let characters = {}
db.all(sql, params, (err, rows) => {
    characters = rows
    console.log(characters)
});


db.close();
app.get('/',(req,res)=>{
    res.send(characters)
})
const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function() {
      console.log("Express server started");
    })