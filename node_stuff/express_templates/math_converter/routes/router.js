const express = require('express')
const router = express.Router()

router.get('/numbers/numberForm',(req,res)=>{
    res.render('numberform')


})
router.get('/numbers/numberFormRedirect',(req,res)=>{
    let number = ""
    if('number' in req.query){
        number = req.query.number
    }
    res.redirect('/converter/'+number)
    console.log(number)
})
router.get('/converter/:number',(req,res)=>{
    const {number} = req.params
    render_dict = {
        'number':number,
        'feet':number/12,
        'cubits': 0.056444444444444*number,
        'centimeters':2.54*number
    }
    let format=""
    if('format' in req.query){
        format = req.query.format
        res.json(render_dict)
    }
    else {
        res.render('converter',render_dict)
    }
    console.log(render_dict)
    
})

module.exports = router