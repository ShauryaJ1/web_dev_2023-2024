const express = require('express')
const app = express()
app.set('view engine', 'ejs')

app.get('/cookiecounter', (req, res) => {

    // Set the 'username' cookie to expire in 7 days (in ms)
    const expirationDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); 

    let shauryaCookie = 'shaurya'
    let cookieData = 'myVal'
    
    res.cookie(shauryaCookie, cookieData, {
        expires: expirationDate,
    });

    res.render('cookie')
});


const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function() {
      console.log("Express server started");
    })