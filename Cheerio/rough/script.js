const fs=require('fs')
let count=1;
function callback(err,data){
    if(!err){
        console.log(data);
    }
    else{
        console.log("data not found");
    }
}
for(let i=1;i<=10;i++){
    fs.readFile(`q${i}.html`,"utf-8",callback)
}