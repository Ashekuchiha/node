

const data = require('../../lib/data');
const {hash, creatrRandomString}=require('../../helper/utilities');
const {parseJSON}=require('../../helper/utilities');
const tokenHandeler = require('./tokenHandeler');
const {maxChecks} = require('../../helper/environments');


const handeler = {};

handeler.checkHandeler = (reqPro,callback)=>{
    //console.log(reqPro);
    const acceptedMethods = ['get','post','put','delete'];

    if(acceptedMethods.indexOf(reqPro.method) > -1){
        handeler._check[reqPro.method](reqPro,callback);
    }else{
        callback(405);
    }
};

handeler._check={};

handeler._check.post = (reqPro,callback)=>{
    let protocol = typeof(reqPro.body.protocol) === 'string' && ['http','https'].indexOf(reqPro.body.protocol) > -1 ? reqPro.body.protocol : false;
    let url = typeof(reqPro.body.url) === 'string' && reqPro.body.url.trim().length > 0 ? reqPro.body.url : false;
    let method = typeof(reqPro.body.method) === 'string' && ['GET','POST','PUT','DELET'].indexOf(reqPro.body.method) > -1 ? reqPro.body.method : false;
    let successCodes = typeof(reqPro.body.successCodes) === 'object' && reqPro.body.successCodes instanceof Array ? reqPro.body.successCodes : false;
    let timeoutSeconds = typeof(reqPro.body.timeoutSeconds) === 'number' && reqPro.body.timeoutSeconds % 1 === 0 && reqPro.body.timeoutSeconds >= 1 && reqPro.body.timeoutSeconds <= 5? reqPro.body.timeoutSeconds : false;

    if(protocol && url && method && successCodes && timeoutSeconds){
        let token = typeof(reqPro.headersObj.token) === 'string' ? reqPro.headersObj.token : false;

        data.read('tokens',token,(error,tokenData)=>{
            if(!error && tokenData){
                let userPhone = parseJSON(tokenData).phone;
                data.read('users',userPhone,(error,userdata)=>{
                    if(!error && userdata){
                        tokenHandeler._token.varify(token,userPhone,(tokenIsValid)=>{
                            if(tokenIsValid){
                                let userObj = parseJSON(userdata);
                                let userChecks = typeof(userObj.checks) === 'object' && userObj.checks instanceof Array ? userObj.checks : [];

                                if(userChecks.length < maxChecks){
                                    let checkId = creatrRandomString(20);
                                    let cheackObj = {
                                        id:checkId,
                                        userPhone,
                                        protocol,
                                        url,
                                        method,
                                        successCodes,
                                        timeoutSeconds,
                                    };

                                    data.creat('checks',checkId,cheackObj,(error)=>{
                                        if(!error){
                                            userObj.checks = userChecks;
                                            userObj.checks.push(checkId);

                                            data.update('users',userPhone,userObj,(error)=>{
                                                if(!error){
                                                    callback(200,cheackObj);
                                                }else{
                                                    callback(500,{
                                                        'error':`there is a problem in a server 2`
                                                    });
                                                }
                                            });
                                        }else{
                                            callback(500,{
                                                'error':`there is a problem in a server 1`
                                            });
                                        }
                                    });
                                }else{
                                    callback(403,{
                                        'error':`usesr already reached maxium jjjj`
                                    });
                                }
                            }else{
                                callback(403,{
                                    'error':`authentication problem 2`
                                })
                            }
                        });
                    }else{
                        callback(403,{
                            'error':`user not found`
                        });
                    }
                });
            }else{
                callback(403,{
                    'error':`authentication problem 1`
                })
            }
        });
    }else{
        callback(400,{
            'error' : `you have a problem in your request`
        });
    }
}
handeler._check.get = (reqPro,callback)=>{
    const tokenId = typeof(reqPro.querryStringObject.tokenId) === 'string' && reqPro.querryStringObject.tokenId.trim().length === 20 ? reqPro.querryStringObject.tokenId : false;

    if(tokenId){
        data.read('checks',tokenId,(error,checkdata)=>{
            if(!error && checkdata){
                let token = typeof(reqPro.headersObj.token) === 'string' ? reqPro.headersObj.token : false;

                tokenHandeler._token.varify(token,parseJSON(checkdata).userPhone,(tokenIsValid)=>{
                if(tokenIsValid){
                    callback(200,parseJSON(checkdata))
                }else{
                    callback(403,{
                        'error':`authentication failure`
                    });
                }
                });

            }else{
                callback(500,{
                    'error':`you have problem in your req 1`
                })
            }
        });
    }else{
        callback(404,{
            'error':`token not found 2`
        });
    }
};
handeler._check.put = (reqPro,callback)=>{
    let tokenId = typeof(reqPro.body.tokenId) === 'string' && reqPro.body.tokenId.trim().length === 20? reqPro.body.tokenId : false;

    let protocol = typeof(reqPro.body.protocol) === 'string' && ['http','https'].indexOf(reqPro.body.protocol) > -1 ? reqPro.body.protocol : false;
    let url = typeof(reqPro.body.url) === 'string' && reqPro.body.url.trim().length > 0 ? reqPro.body.url : false;
    let method = typeof(reqPro.body.method) === 'string' && ['GET','POST','PUT','DELET'].indexOf(reqPro.body.method) > -1 ? reqPro.body.method : false;
    let successCodes = typeof(reqPro.body.successCodes) === 'object' && reqPro.body.successCodes instanceof Array ? reqPro.body.successCodes : false;
    let timeoutSeconds = typeof(reqPro.body.timeoutSeconds) === 'number' && reqPro.body.timeoutSeconds % 1 === 0 && reqPro.body.timeoutSeconds >= 1 && reqPro.body.timeoutSeconds <= 5? reqPro.body.timeoutSeconds : false;

    if(tokenId){
        if(protocol || url || method || successCodes || timeoutSeconds){
            data.read('checks',tokenId,(error,checkdata)=>{
                if(!error && checkdata){
                    let cheackObj = parseJSON(checkdata);
                    let token = typeof(reqPro.headersObj.token) === 'string' ? reqPro.headersObj.token : false;
                    tokenHandeler._token.varify(token,cheackObj.userPhone,(tokenIsValid)=>{
                        if(tokenIsValid){
                            if(protocol){
                                cheackObj.protocol=protocol;
                            }
                            if(url){
                                cheackObj.url=url;
                            }
                            if(method){
                                cheackObj.method=method;
                            }
                            if(successCodes){
                                cheackObj.successCodes=successCodes;
                            }
                            if(timeoutSeconds){
                                cheackObj.timeoutSeconds=timeoutSeconds;
                            }
                            data.update('checks',tokenId,cheackObj,(error)=>{
                                if(!error){
                                    callback(200);
                                }else{
                                    callback(500,{
                                        'error':`server error`
                                    });
                                }
                            });
                        }else{
                            callback(403,{
                                'error':`authentic error`
                            })
                        }
                    });

                }else{
                    callback(500,{
                        'error':`server problem`
                    })
                }
            });
        }else{
            callback(400,{
                'error':`you must provide aone field to update`
            });
        }
    }else{
        callback(400,{
            'error':`you have a problem in your req 11`
        });
    }

};
handeler._check.delete = (reqPro,callback)=>{
    
};


module.exports=handeler;