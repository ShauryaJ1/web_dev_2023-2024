const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database.db');


let sql = `SELECT * FROM characters WHERE c_name = ?`
let sql2 = `SELECT * FROM equipment WHERE equipment_id = ?`
let sql3 = `SELECT * FROM quest WHERE quest_id = ?`
let params1 = ['Henrik']
let params2 = [0]
let params3 = [0]

db.all(sql, params1, (err, rows) => {
    console.log(err)
    console.log(rows);
});

db.all(sql2, params2, (err, rows) => {
    console.log(err)
    console.log(rows);
});
db.all(sql3, params3, (err, rows) => {
    console.log(err)
    console.log(rows);
});
db.close();