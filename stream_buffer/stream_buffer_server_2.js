
//windows thika read kory console e dekhano

const http = require('http');

const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        res.write(`
        <html>
        <head>
        <title>subb</title>
        </head>
        <body>
        <form method="post" action="/sub">
        <input name ="message"/>
        </form>
        </body>
        `);
        res.end();
    }else if(req.url=== '/sub'){
        req.on('data',(chunk)=>{
            console.log(chunk.toString());
        });
        res.write('submited');
        res.end();
    }else{
        res.write('not found');
        res.end();
    }
});

server.listen(3000);
