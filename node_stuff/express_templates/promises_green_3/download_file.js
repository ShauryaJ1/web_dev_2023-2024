const http = require('http')
const fs = require('fs')

function downloadPromise() {
    return new Promise( (resolve, reject) => {
      http.get('http://localhost:3000/', function(response){
        let full_reponse = ""
        response.on('data', (chunk)=>{full_reponse+=chunk})
        response.on('end', ()=>{resolve(full_reponse)})
      }).on('error', function(err){
        reject(err)
      })    
    })
  }

function write_to_file(data){
    return new Promise( (resolve, reject) => {
    
       fs.writeFile('results.txt',data,(err)=>{
        if (err) reject (err);
        resolve();
       })
      })
    }

async function main(){
    const data  = await downloadPromise()
    await write_to_file(data)

}
main()