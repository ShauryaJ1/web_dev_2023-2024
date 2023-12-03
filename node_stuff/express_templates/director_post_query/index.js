const express = require('express')
const app = express();

app.set('view engine','ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/form', (req,res) => {
    res.render('form')
});
app.post('/results',(req,res)=>{
    let food = ""
    let drink=""
    let reason=""
    if('food' in req.body){
        food = req.body.food
    }
    if('drink' in req.body){
        drink = req.body.drink
    }
    if('reason' in req.body){
        reason = req.body.reason
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

