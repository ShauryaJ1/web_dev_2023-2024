const express = require('express')
const app = express()
const fs = require('fs')
file = 'foo.txt'

function fileDownload(my_file){
    return new Promise((resolve,reject) => {
        fs.readFile(my_file, (err, data) => {
        if (err) {reject(err)};
        file_data = data.toString();
        resolve(file_data);
      });})
}
async function main(){
    file_contents = ''
    console.log('starting the program...')
    console.log('starting file download ................')
    console.log(await fileDownload(file))
}
main()


