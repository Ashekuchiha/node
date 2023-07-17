//file read koray onno file write kora 

const fs=require("fs");

const myRead = fs.createReadStream(`${__dirname}/story.txt`);
const myWrite = fs.createWriteStream(`${__dirname}/outstory.txt`);

// myRead.on('data',(chunk)=>{
//     myWrite.write(chunk);
// });

myRead.pipe(myWrite);