const http = require('http');

const server = http.createServer((req,res)=>{
    if(req.url === '/'){
        res.write(`
        <html>
        <head>
        <titel>subb</titel>
        </head>
        <body>
        <form method="post" action="sub">
        <input name ="sub"/>
        </form>
        </body>
        </html>
        `);
        res.end();
    }else if(req.url=== '/sub' && req.method === 'post'){
        req.on('data',(chunk)=>{
            console.log(chunk);
        });
        res.write('submited');
        res.end();
    }else{
        res.write('not found');
        res.end();
    }
});

server.listen(3000);
