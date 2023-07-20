//dependencies
const http = require('http');
const {handeleReq}=require('./helper/handelreqress');

//app obj
const app={};

//configuration
app.config = {
    port:3000,
} 

//create server
app.createServer=()=>{
    const server = http.createServer(app.handeleReqress);
    server.listen(app.config.port,()=>{
        console.log(`listening port ${app.config.port}`);
    });
} 

//handel req ress
app.handeleReqress=handeleReq;

app.createServer();