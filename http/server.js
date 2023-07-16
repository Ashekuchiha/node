const HTTP = require('http');

const SERVER = HTTP.createServer((req,res)=>{
    if(req='/'){
        res.write(`hi programmers`);
        res.write(`welcome my server`);
        res.end();
    }else if(req='/about'){
        res.write(`its all about us`);
        res.end();
    }else{
        res.write(`not found`);
        res.end();
    }

});

SERVER.listen(3000);

console.log(`port 3000 listing`);