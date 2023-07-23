

const data = require('../../lib/data');
const {hash}=require('../../helper/utilities');
const {creatrRandomString}=require('../../helper/utilities');
const {parseJSON}=require('../../helper/utilities');
const { now } = require('lodash');
const { callbackify } = require('util');




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
handeler._token.put = (reqPro,callback)=>{
    const tokenId = typeof(reqPro.body.tokenId) === 'string' && reqPro.body.tokenId.trim().length === 20 ? reqPro.body.tokenId : false;
    const extend = typeof(reqPro.body.extend) === 'boolean' && reqPro.body.extend === true ? true: false;

    if(tokenId && extend){
        data.read('tokens',tokenId,(error,tokendata)=>{
            let tokenobj = parseJSON(tokendata);
            if(tokenobj.expires > Date.now()){
                tokenobj.expires = Date.now()+60*60*1000;

                data.update('tokens',tokenId,tokenobj,(error)=>{
                    if(!error){
                        callback(200);
                    }else{
                        callback(500,{
                            'error':`there was a error in server`
                        })
                    }
                });
            }else{
                callback(400,{
                    'error':`token already expierd`
                });
            }
        });
    }else{
        callback(400,{
            'error':`there is a problem in your reqest`
        });
    }

};
handeler._token.delete = (reqPro,callback)=>{
    
    const tokenId = typeof(reqPro.querryStringObject.tokenId) === 'string' && reqPro.querryStringObject.tokenId.trim().length === 20 ? reqPro.querryStringObject.tokenId : false;

    if(tokenId){
        data.read('tokens',tokenId,(error,tokendata)=>{
            if(!error && tokendata){
                data.delete('tokens',tokenId,(error)=>{
                    if(!error){
                        callback(200,{
                            'message':`successfully deleted`
                        });
                    }else{
                        callback(500,{
                            'error':`server site error1`
                        });
                    }
                });
            }else{
                callback(500,{
                    'error':`server sight error2`
                });
            }
        });
    }else{
        callback(400,{
            'error':`problem in your req may be phn number`
        })
    }
};

handeler._token.varify = (tokenId,phone,callback)=>{
    data.read('tokens',tokenId,(error,tokendata)=>{
        if(!error && tokendata){
            if(parseJSON(tokendata).phone === phone && parseJSON(tokendata).expires>Date.now()){
                callback(true);
            }else{
                callback(false);
            }
        }else{
            callback(false);
        }
    });
};

module.exports=handeler;