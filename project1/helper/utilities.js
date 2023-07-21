
const crypto = require('crypto');
const environments = require('./environments');

const utilities = {};

utilities.parseJSON = (jsonString)=>{
    let output;

    try {
        output = JSON.parse(jsonString);
    } catch{
        output = {};
    }

    return output;
};

utilities.hash = (string)=>{
    if(typeof(string) === 'string' && string.length >0){
        let hash = crypto
                    .createHmac('sha256',environments.secretKey)
                    .update(string)
                    .digest('hex');
                    return hash;
    }else{
        return false;
    }
};

module.exports = utilities;