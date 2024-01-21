const express = require('express')
const app = express()
app.set('view engine', 'ejs')
const stocks_router = require('./routes/stocks_router')
app.use(stocks_router);
const listener = app.listen(
  process.env.PORT || 8080,
  process.env.HOST || "0.0.0.0",
  function() {
    console.log("Express server started");
  })