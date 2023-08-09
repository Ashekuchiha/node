//dependencies
const http = require('http');

const {handeleReq}=require('./helper/handelreqress');
const environment = require('./helper/environments');
const data = require('./lib/data');


//app obj
const app={};

//configuration
// app.config = {
//     port:3000,
// } //eitar kaj environment.js dia kora hoisay


//{//data,js check er joono strt

//delet uncomment korly bujay korty hobay
// data.delet('test','newFile',(error)=>{
//     console.log(`error=${error}`);
// });


// data.update('test','newFile',{
//     name :'alif',
//     language:'bangla',
//     age : 25,
// },(data)=>{
//     console.log(`updated data=${data}`);
// });

// data.read('test','newFile',(error,data)=>{
//     console.log(`error=${error} data=${data}`);
// });

// data.creat('test','newFile',{
//     name :'ashik',
//     language:'bangla',
//     age : 30,
// },(err)=>{
//     console.log(`error is`,err);
// });
//data,js check er joono end
//}




//create server


app.createServer=()=>{
    const server = http.createServer(app.handeleReqress);
    server.listen(environment.port,()=>{
        console.log(`listening port ${environment.port}`);
    });
} 

//handel req ress
app.handeleReqress=handeleReq;

app.createServer();