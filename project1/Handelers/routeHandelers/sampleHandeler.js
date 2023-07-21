

const handeler = {};

handeler.sampleHandeler = (reqPro,callback)=>{
    //console.log(reqPro);
    callback(200,{
        Message : 'this is sample',
    });
}

module.exports=handeler;