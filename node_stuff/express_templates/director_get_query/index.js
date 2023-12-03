const express = require('express')
const app = express();

app.set('view engine','ejs')

app.get('/form', (req,res) => {
    res.render('form')
});
app.route('/results').get((req,res)=>{
    let food = ""
    let drink=""
    let reason=""
    if('food' in req.query){
        food = req.query.food
    }
    if('drink' in req.query){
        drink = req.query.drink
    }
    if('reason' in req.query){
        reason = req.query.reason
    }
    const out_dict = {
        'food':food,
        'drink':drink,
        'reason':reason,
    }
    res.render('results',out_dict)
    console.log(out_dict)
})



const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function() {
      console.log("Express server started");
    }
  );

