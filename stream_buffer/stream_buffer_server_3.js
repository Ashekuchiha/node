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
        const body = [];

        req.on('data',(chunk)=>{
            body.push(chunk);
        });
        req.on('end',()=>{
            console.log('data coming finished');
            const fullData=Buffer.concat(body).toString();
            console.log(fullData);
        })
        res.write('submited');
        res.end();
    }else{
        res.write('not found');
        res.end();
    }
});

server.listen(3000);
