const express = require("express");
const app = express();

app.set('view engine', 'ejs')


let page_counter = 0;

app.get('/page_counter', function(req,res){

  page_counter++;

  const render_dictionary = {
    'placeholder' : 'I count!',
    'count' : page_counter
  }

  res.render('counter_template', render_dictionary)
})

const listener = app.listen(
  process.env.PORT || 8080,
  process.env.HOST || "0.0.0.0",
  function() {
    console.log("Express server started");
});