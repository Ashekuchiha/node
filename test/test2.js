 const data=require("./test1.js");//my module

 const _ = require("lodash");//outside module

 var path = require('path');//core module
 var os = require('os');
 var fs = require('fs');
const { EventEmitter } = require("stream");

 const mypath = "C:/Users/shakil/Desktop/web/node js/book.txt";
//  console.log(_.last(data.peoples));
//  data.call();
//  console.log(path.basename(mypath));
//  console.log(path.dirname(mypath));
//  console.log(path.parse(mypath));
//console.log(os.platform());
//console.log(os.freemem());
//console.log(os.cpus());
//fs.writeFileSync('file1.txt','hi my name is ashak');
//fs.appendFileSync('file1.txt',' how are you guys');
//const datas=fs.readFileSync('file1.txt');
//console.log(datas);
//console.log(datas.toString());
{//EventEmitter
var evan = require('events'); //core module

const emit = new evan();
//creat a event
emit.on("bell",(data)=>{
    console.log(`run ${data} run`);
})
//call the event 1
emit.emit("bell","bitch") ;
//call the event 2
setTimeout(
    ()=>{
        emit.emit("bell","halarpo");
    },3000
) 
//creat a new event
emit.on("call",({person,text})=>{
    console.log(`oi ${person} ${text} koi tui`)
});
//call the event
emit.emit("call",{
    person : "asik",
    text:"fazil"
})
}