

const handeler = {};

handeler.notFoundHandler = (reqPro,callback)=>{
    //console.log(reqPro);
    callback(404,{
        Message : 'uyou request path is not found problrm 1 can be routes.js or handelerreqress.js line 38',
    });
}

module.exports=handeler;