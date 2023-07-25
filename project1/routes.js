

const {sampleHandeler}=require('./Handelers/routeHandelers/sampleHandeler');
const {userHandeler}=require('./Handelers/routeHandelers/userHandeler');
const {tokenHandeler}=require('./Handelers/routeHandelers/tokenHandeler');
const {checkHandeler}=require('./Handelers/routeHandelers/checkHandeler');



const routes = {
    sample : sampleHandeler,
    user : userHandeler,
    token : tokenHandeler,
    check : checkHandeler
}

module.exports = routes;