const School = require('./alarm_body')

const school = new School();

school.on('alarm',({name,time})=>{
    console.log(`hi ${name} weak up its  ${time}`);
 })

 school.call();