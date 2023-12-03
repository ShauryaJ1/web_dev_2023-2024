const express = require('express')
const app = express()

app.set('view engine', 'ejs')


var coinflip = function(){
    let flip = Math.random();
    if (flip>0.5)
        {return true}
    else 
        {return false}
    
}
var c_flip = coinflip()
app.get('/coin_flipper',function(req,res){
    let win = ""
    if(c_flip){
        var placeholder = "You won" 
        win = "win"
    }
    else{
        var placeholder = "You lost"
        win = "lose"
    }
    const render_dictionary = {
        'placeholder' : placeholder,
        'count' : c_flip
      }
    res.render(win,render_dictionary)
    
})
const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function() {
      console.log("Express server started");
      console.log(c_flip);
  });
