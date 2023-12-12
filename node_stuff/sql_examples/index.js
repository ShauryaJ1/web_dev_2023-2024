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

let assigned_equipment_query = `SELECT * FROM assigned_equipment`
let assigned_quests_query = `SELECT * FROM assigned_quests`

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
// db.all
// db.close();

const express = require('express')
const app = express()
app.set('view engine','ejs')

// const sqlite3 = require('sqlite3').verbose()
// const db = new sqlite3.Database('database.db');

app.get('/Form',(req,res)=>{
    res.render('Form')
})

app.get('/heroStats',async (req,res)=>{
    equipment = 'none'
    quests = 'none'
    character = 'NA'
    let query1 = `INSERT INTO assigned_equipment VALUES (?,?)`
    let query2 = `INSERT INTO assigned_quests VALUES (?,?)`
    let query3 = `SELECT * FROM assigned_quests INNER JOIN assigned_equipment ON assigned_equipment.c_name = assigned_quests.c_name INNER JOIN characters ON characters.c_name = assigned_quests.c_name`
    result = {}
    if('character' in req.query){
        character = req.query.character
    }
    if ('quests' in req.query){

        quests = req.query.quests;
        result1 = await sqlPromise(query2,[character,quests])
        result1 = await sqlPromise(assigned_quests_query)
        console.log(result1)
        
    }
    if('equipment' in req.query){
        equipment = req.query.equipment
        result2 = await sqlPromise(query1,[character,equipment])
        result2 = await sqlPromise(assigned_equipment_query)
        console.log(result2)
    }
    
    
    result = await sqlPromise(query3)

    console.log(result)
    const render_dict = {'quests':quests,'equipment':equipment,'character':character,'result':result}
    res.render('heroStats',render_dict)
})

// app.get('/equipmentForm',(req,res)=>{
//     res.render('equipmentForm')
// })

const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function() {
      console.log("Express server started");
    }
)