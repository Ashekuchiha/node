//creat a stream 
const file=require("fs");

const stream1= file.createReadStream(`${__dirname}/story.txt`);

stream1.on('data',(chunk)=>{
    console.log(chunk.toString());
})

console.log('****************************************')
const stream2 = file.createReadStream(`${__dirname}/story.txt`,"utf-8")
stream2.on('data',(data)=>{
    console.log(data);
})