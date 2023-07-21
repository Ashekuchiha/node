

const {sampleHandeler}=require('./Handelers/routeHandelers/sampleHandeler');
const {userHandeler}=require('./Handelers/routeHandelers/userHandeler');

const routes = {
    sample : sampleHandeler,
    user : userHandeler,
}

module.exports = routes;