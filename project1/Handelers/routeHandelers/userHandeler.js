

const data = require('../../lib/data');
const {hash}=require('../../helper/utilities');
const {parseJSON}=require('../../helper/utilities');


const handeler = {};

handeler.userHandeler = (reqPro,callback)=>{
    //console.log(reqPro);
    const acceptedMethods = ['get','post','put','delet'];

    if(acceptedMethods.indexOf(reqPro.method) > -1){
        handeler._users[reqPro.method](reqPro,callback);
    }else{
        callback(405);
    }
};

handeler._users={};

handeler._users.post = (reqPro,callback)=>{
    const firstName = typeof(reqPro.body.firstName) === 'string' && reqPro.body.firstName.trim().length > 0 ? reqPro.body.firstName : false;
    const lastName = typeof(reqPro.body.lastName) === 'string' && reqPro.body.lastName.trim().length > 0 ? reqPro.body.lastName : false;
    const phone = typeof(reqPro.body.phone) === 'string' && reqPro.body.phone.trim().length === 11 ? reqPro.body.phone : false;
    const password = typeof(reqPro.body.password) === 'string' && reqPro.body.password.trim().length > 0 ? reqPro.body.password : false;
    const tosAgreement = typeof(reqPro.body.tosAgreement) === 'boolean' ? reqPro.body.tosAgreement : false;

    if(firstName && lastName && phone && password && tosAgreement){
        //make shure that the user dosent existed
        data.read('users',phone,(error,user)=>{
            if(error){
                const userobj = {
                    firstName,
                    lastName,
                    phone,
                    password:hash(password),
                    tosAgreement,
                };
                //store the user to db
                data.creat('users',phone,userobj,(error)=>{
                    if(!error){
                        callback(200,{
                            'message':`successfully created a user`,
                        })
                    }else{
                        callback(500,{'error':`cant creat user !`})
                    }
                });
            }else{
                callback(500,{
                    error :`there is a problem in server`
                })
            }
        });
    }else{
        callback(400,{
            error : `you have problem in your request`
        })
    }

};
handeler._users.get = (reqPro,callback)=>{
    const phone = typeof(reqPro.querryStringObject.phone) === 'string' && reqPro.querryStringObject.phone.trim().length === 11 ? reqPro.querryStringObject.phone : false;

    if(phone){
        data.read('users',phone,(error,u)=>{
            const user = { ...parseJSON(u)};
            if(!error && user){
                delete user.password;
                callback(200,user);
            }else{
                callback(404,{
                    'error':`user not found`
                });
            }
        });
    }else{
        callback(404,{
            'error':`user not found`
        });
    }
};
handeler._users.put = (reqPro,callback)=>{
    const firstName = typeof(reqPro.body.firstName) === 'string' && reqPro.body.firstName.trim().length > 0 ? reqPro.body.firstName : false;
    const lastName = typeof(reqPro.body.lastName) === 'string' && reqPro.body.lastName.trim().length > 0 ? reqPro.body.lastName : false;
    const phone = typeof(reqPro.body.phone) === 'string' && reqPro.body.phone.trim().length === 11 ? reqPro.body.phone : false;
    const password = typeof(reqPro.body.password) === 'string' && reqPro.body.password.trim().length > 0 ? reqPro.body.password : false;

    if(phone){
        if(firstName || lastName || password){
            data.read('users',phone,(error,uData)=>{
                const userData ={ ...parseJSON(uData)};
                if(!error && userData){
                    if(firstName){
                        userData.firstName = firstName;
                    }
                    if(lastName){
                        userData.lastName = lastName;
                    }
                    if(password){
                        userData.password = hash(password);
                    }
                    //store to db
                    data.update('users',phone,userData,(error)=>{
                        if(!error){
                            callback(200,{
                                'message':`user updated successfully`
                            })
                        }else{
                            callback(500,{
                                'error' : `there is a problem in a server side`
                            })
                        }
                    });
                }else{
                    callback(400,{
                        'error':'you have problem in your request'
                    })
                }
            });
        }else{
        callback(400,{
            'error':'you have problem in your req phn number'
        })
    }
    }else{
        callback(400,{
            'error':'invalid  phone number'
        })
    }
};
handeler._users.delet = (reqPro,callback)=>{};


module.exports=handeler;