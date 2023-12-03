const express = require('express')
const app = express();

app.set('view engine','ejs')


app.get('/query_format', (req,res) => { 

    const {format, thing1, username} = req.query
    console.log('-----------------')
    console.log(format)
    console.log(thing1)
    console.log(username)

    let result = false

    if (format != undefined) {
      result = true;
    }

    const render_dictionary = {
      'has_format' : result
    }
    console.log(render_dictionary)
    res.render('has_format_template', render_dictionary);
});

// -------------- listener -------------- //
const listener = app.listen(
  process.env.PORT || 8080,
  process.env.HOST || "0.0.0.0",
  function() {
    console.log("Express server started");
  }
);