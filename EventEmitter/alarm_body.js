const EventEmitter = require('events');

const Emitter = new EventEmitter();

class alarm extends EventEmitter{
    call=()=>{
        this.emit('alarm',{
            name:'ashak',
            time:'10 o clock'
        })
    }
}
module.exports=alarm;
// Emitter.on('alarm',({name,time})=>{
//     console.log(`hi ${name} weak up its  ${time}`);
// })



// Emitter.emit('alarm',{
//     name:'ashak',
//     time:'10 o clock'
// })
// setTimeout(()=>{
//     Emitter.emit('alarm',{
//         name:'ashak',
//         time:'10.1 o clock'
//     })
// },1000)