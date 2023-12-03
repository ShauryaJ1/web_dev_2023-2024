// const express = require("express");
// const app = express();

// app.set('view engine', 'ejs')

// app.get('/hello_template', function(req,res){
//   res.render('template_01')
// })

// const listener = app.listen(
//   process.env.PORT || 8080,
//   process.env.HOST || "0.0.0.0",
//   function() {
//     console.log("Express server started");
//   }
// );

const express = require("express");
const app = express();

app.set('view engine', 'ejs')


app.get('/it_works_template', function(req,res){

  const render_dictionary = {
    'placeholder' : 'cooking with gas'
  }

  res.render('working_template', render_dictionary)
})

const listener = app.listen(
  process.env.PORT || 8080,
  process.env.HOST || "0.0.0.0",
  function() {
    console.log("Express server started");
});