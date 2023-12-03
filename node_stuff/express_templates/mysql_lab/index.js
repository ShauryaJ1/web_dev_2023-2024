const express = require('express')
const app = express()
app.set('view engine','ejs')

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('database.db');


