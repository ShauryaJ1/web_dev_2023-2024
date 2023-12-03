const express = require('express')
const app = express();

app.set('view engine','ejs')
app.get('/',(req,res)=>{
    res.render('home')
});
app.get('/form_get', (req,res) => {
    res.render('form_get')
});
app.route('/result_get').get((req,res)=>{
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
    res.render('result_get',out_dict)
    console.log(out_dict)
})


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/form_post', (req,res) => {
    res.render('form_post')
});
app.post('/result_post',(req,res)=>{
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
    res.render('result_post',out_dict)
    console.log(out_dict)
})





const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function() {
      console.log("Express server started");
    }
  );

