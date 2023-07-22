

const {sampleHandeler}=require('./Handelers/routeHandelers/sampleHandeler');
const {userHandeler}=require('./Handelers/routeHandelers/userHandeler');
const {tokenHandeler}=require('./Handelers/routeHandelers/tokenHandeler');



const routes = {
    sample : sampleHandeler,
    user : userHandeler,
    token : tokenHandeler
}

module.exports = routes;