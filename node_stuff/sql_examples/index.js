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

let sql = `SELECT * FROM assigned_quests`
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

app.get('/questForm',(req,res)=>{
    res.render('questForm')
})

app.get('/heroStats',async (req,res)=>{
    equipment = 'none'
    quests = 'none'
    character = 'NA'
    let query1 = `INSERT INTO assigned_equipment VALUES (?,?)`
    let query2 = `INSERT INTO assigned_quests VALUES (?,?)`
    result = {}
    if('character' in req.query){
        character = req.query.character
    }
    if ('quests' in req.query){

        quests = req.query.quests;
        result = await sqlPromise(query2,[character,quests])
        db.all(sql,  (err, rows) => {
            //     console.log(err)
                console.log(rows);
            });
    }
    if('equipment' in req.query){
        equipment = req.query.equipment
    }
    
    const render_dict = {'quests':quests,'equipment':equipment,'character':character,'result':result}

    res.render('heroStats',render_dict)
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