const { Module } = require("module");

const peoples = ["ashak","alif","sharmin"];
function call (){
    console.log("why are you calling me ?");
}
var a=6;

module.exports={
    peoples,call,a
}