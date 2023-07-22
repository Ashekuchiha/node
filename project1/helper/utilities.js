
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

utilities.creatrRandomString = (strLen)=>{
    let length = strLen;
    length=typeof(strLen) === 'number' && strLen >0 ? strLen : false;
    if(length){
        let posschar = 'abcdefghijklmnopqrstuvwxyz1234567890';
        let output = '';
        for(let i=1;i<=length;i++){
            let ranchar=posschar.charAt(Math.floor(Math.random()*posschar.length));
            output += ranchar;
        }
        return output;
    }else{
        return false;
    }
}
module.exports = utilities;