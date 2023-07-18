//dependencies
const http = require('http');

//app obj
const app={};

//configuration
app.config = {
    port:3000,
} 

//create server
app.createServer=()=>{
    const server = http.createServer(app.handeleReq);
    server.listen(app.config.port,()=>{
        console.log(`listening port ${app.config.port}`);
    });
}

//handel req ress
app.handeleReq=(req,ress)=>{
    ress.end("hooooooinecrhh g hdf jdgk");
}

app.createServer();