//file read kory server e write korar way

const HTTP = require('http');
const fs = require('fs');

const SERVER = HTTP.createServer((req,res)=>{
    const myRead = fs.createReadStream(__dirname+'/story.txt','utf8');
    myRead.pipe(res);
});

SERVER.listen(3000);
console.log('server is running at 3000 port');
