

const data = require('../../lib/data');
const {hash}=require('../../helper/utilities');
const {creatrRandomString}=require('../../helper/utilities');
const {parseJSON}=require('../../helper/utilities');




const handeler = {};

handeler.tokenHandeler = (reqPro,callback)=>{
    //console.log(reqPro);
    const acceptedMethods = ['get','post','put','delete'];

    if(acceptedMethods.indexOf(reqPro.method) > -1){
        handeler._token[reqPro.method](reqPro,callback);
    }else{
        callback(405);
    }
};

handeler._token={};

handeler._token.post = (reqPro,callback)=>{
    const phone = typeof(reqPro.body.phone) === 'string' && reqPro.body.phone.trim().length === 11 ? reqPro.body.phone : false;
    const password = typeof(reqPro.body.password) === 'string' && reqPro.body.password.trim().length > 0 ? reqPro.body.password : false;

    if(phone && password){
        data.read('users',phone,(error,userdata)=>{
            let hashedPassword = hash(password);
            if(hashedPassword === parseJSON(userdata).password){
                let tokenId = creatrRandomString(20);
                let expires = Date.now() +60*60*1000;
                let tokenObj = {
                    phone,
                    tokenId,
                    expires
                };

                data.creat('tokens',tokenId,tokenObj,(error)=>{
                    if(!error){
                        callback(200,tokenObj);
                    }else{
                        callback(500,{
                            'error': `server site error`
                        })
                    }
                });
            }else{
                callback(400,{
                    'error':`password is not match`
                });
            }
        });
    }else{
        callback(400,{
            'error':`you have a problem in your req`
        });
    }
};
handeler._token.get = (reqPro,callback)=>{
    
    const tokenId = typeof(reqPro.querryStringObject.tokenId) === 'string' && reqPro.querryStringObject.tokenId.trim().length === 20 ? reqPro.querryStringObject.tokenId : false;

    if(tokenId){
        data.read('tokens',tokenId,(error,tokendata)=>{
            const token = { ...parseJSON(tokendata)};
            if(!error && token){
                callback(200,token);
            }else{
                callback(404,{
                    'error':`token not found 1`
                });
            }
        });
    }else{
        callback(404,{
            'error':`token not found 2`
        });
    }
};
handeler._token.put = (reqPro,callback)=>{};
handeler._token.delete = (reqPro,callback)=>{};


module.exports=handeler;