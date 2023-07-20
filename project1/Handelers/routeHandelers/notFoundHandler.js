

const handeler = {};

handeler.notFoundHandler = (reqPro,callback)=>{
    //console.log(reqPro);
    callback(404,{
        Message : 'this is not found',
    });
}

module.exports=handeler;