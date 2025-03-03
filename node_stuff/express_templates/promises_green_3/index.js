const http = require('http')
const fs = require('fs')
const express = require('express')
const app = express()
app.set('view engine','ejs')
app.get('/',(req,res)=>{
    let heros = {
        heros : [
            {
              id : 0,
              name : "Archibald",
              wit : 0,
              strength : 7,
              attack : 5,
              defense : 1,
              magic : 0
            }, {
              id : 1,
              name : "Henrik",
              wit : 4,
              strength : 3,
              attack : 3,
              defense : 1,
              magic : 2
            }, {
              id : 2,
              name : "Isadore",
              wit : 2,
              strength : 6,
              attack : 4,
              defense : 0,
              magic : 4
            }, {
              id : 3,
              name : "Lucinda",
              wit : 4,
              strength : 3,
              attack : 1,
              defense : 8,
              magic : 1
            }, {
              id : 4,
              name : "Harold",
              wit : 5,
              strength : 2,
              attack : 3,
              defense : 3,
              magic : 2
            }
        ]
      }
      res.json(heros)
})









app.listen(3000,()=>{
    console.log('server running at http://localhost:3000');
})