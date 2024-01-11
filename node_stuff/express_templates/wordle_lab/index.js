const express = require('express')
const app = express()
const fs = require('fs');		// fs is built-in. no npm install
const path = require('path');	// path is built-in. no npm install

// generate a file path (as a string) for the words file
const wordsFilePath = path.join(__dirname,'enable1.txt')

// use fs to read the file; convert bytes to string split on newlines
const words = fs.readFileSync(wordsFilePath).toString().split('\n')
let filtered_words = words.filter( (elem) => elem.length == 5)
let current_word = filtered_words[(Math.floor(Math.random() * filtered_words.length))]
console.log(current_word)
// (words is now an array of the entire enable1.txt file)
// make it so that the wordle route accepts a query, that you can send from the fetch request
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('wordle.ejs')
})
app.get('/wordle',(req,res)=>{
    let wordle_word = ''
    console.log('landed')
    dict_word = {0:'white',1:'white',2:'white',3:'white',4:'white'}
    if ('word' in req.query){
        wordle_word = req.query.word
        wordle_word_list = wordle_word.split('')
        for(var i=0;i<wordle_word_list.length;i++){
            if (wordle_word_list[i]==current_word[i]){
                dict_word[i] = 'green'
            }
            else if(current_word.includes(wordle_word_list[i])){
                dict_word[i] = 'yellow'
            }
            else{
                dict_word[i] = 'white'
            }
        }
    }
    dict_word['word'] = wordle_word
    console.log(dict_word)
    
    res.json(dict_word)
})

const listener = app.listen(
    process.env.PORT || 8080,
    process.env.HOST || "0.0.0.0",
    function() {
      console.log("Express server started");
    })