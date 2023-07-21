

const data = require('../../lib/data');
const {hash}=require('../../helper/utilities');

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
    callback(200);
};
handeler._users.put = (reqPro,callback)=>{};
handeler._users.delet = (reqPro,callback)=>{};


module.exports=handeler;