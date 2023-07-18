//dependencies
const http = require('http');
const url = require('url');
const {StringDecoder} = require('string_decoder');


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
    const parseUrl=url.parse(req.url,true);
      //console.log(parseUrl);
    const path = parseUrl.pathname;
    //console.log(path);
    const treamedPath=path.replace(/^\+|\/+$/g,"");
    //console.log(treamedPath);
    const method = req.method.toLowerCase();
    //console.log(method);
    const querryStringObject= parseUrl.query;
    //console.log(querryStringObject);
    const headersObj=req.headers;
    //console.log(headersObj);

    const decoder = new StringDecoder('utf-8');
    let realData = '';
    req.on('data',(buffer)=>{
        realData +=decoder.write(buffer);
    });
    req.on('end',()=>{
        realData +=decoder.end();
        console.log(realData);
        ress.end("hooooooinecrhh g hdf jdgk");

    });

}

app.createServer();