
const {StringDecoder} = require('string_decoder');
const url = require('url');

const routes = require('../routes');
const {notFoundHandler} = require('../Handelers/routeHandelers/notFoundHandler');



const handlers={};

handlers.handeleReq=(req,ress)=>{
    const parseUrl=url.parse(req.url,true);
    //console.log(parseUrl);
    const path = parseUrl.pathname;
    //console.log(path);
    const treamedPath = path.replace(/^\/+|\/+$/g, '');
    //console.log(treamedPath);
    const method = req.method.toLowerCase();
    //console.log(method);
    const querryStringObject= parseUrl.query;
    //console.log(querryStringObject);
    const headersObj=req.headers;
    //console.log(headersObj);

    const reqPro = {
        treamedPath,
        method,
        querryStringObject,
        headersObj,
        path,
        parseUrl,
    }

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const chosenHandler = routes[treamedPath] ? routes[treamedPath] : notFoundHandler;

    chosenHandler(reqPro,(statusCode,payload)=>{
        statusCode = typeof(statusCode) === 'number' ? statusCode : 500;
        payload = typeof(payload) === 'object' ? payload : {};

        const payloadstring = JSON.stringify(payload);

        ress.writeHead(statusCode);
        ress.end(payloadstring);
    });

    req.on('data',(buffer)=>{
        realData +=decoder.write(buffer);
    });
    req.on('end',()=>{
        realData +=decoder.end();
        console.log(realData);
        ress.end('running');

    });

}



module.exports = handlers;