

const fs = require('fs');
const path = require('path');

const lib = {};

lib.basedir = path.join(__dirname,'/../.data/');

//console.log(lib.basedir);

//creat a file and write on it using (wx flag of fs module)
lib.creat=(dir,file,data,callback)=>{
    fs.open(`${lib.basedir + dir}/${file}.json`,'wx',(err,filedescriptor)=>{
        if(!err && filedescriptor){
            const stringData = JSON.stringify(data);

            fs.writeFile(filedescriptor,stringData,(error)=>{
                if(!error){
                    fs.close(filedescriptor,(error)=>{
                        if(!error){
                            callback(false);
                        }else{
                            callback(`found a error to closing the new file ${error}`);
                        }
                    })
                }else{
                    callback(`found a error to write a new file ! ${error}`);
                }
            })
        }else{
            callback(`could not create a new file it may already exists ! ${err}`);
        }
    })
};

//read data from file
lib.read = (dir,file,callback)=>{
    fs.readFile(`${lib.basedir + dir}/${file}.json`,'utf8',(error,data)=>{
        callback(error,data);
    });
}

//update a existing file
lib.update=(dir,file,data,callback)=>{
    fs.open(`${lib.basedir + dir}/${file}.json`,'r+',(error,filedescriptor)=>{
        if(!error && filedescriptor){
            const stringData = JSON.stringify(data);

            //delet the privious data and put the new data it called truncate
            fs.ftruncate(filedescriptor,(error)=>{
                if(!error){
                    fs.writeFile(filedescriptor,stringData,(error)=>{
                        if(!error){
                            fs.close(filedescriptor,(err)=>{
                                if(!err){
                                    callback(false);
                                }else{
                                    callback(`found a error to close the file and the error is ${err}`);
                                }
                            });
                        }else{
                            callback(`found a error to write the file and the error is ${error}`);
                        }
                    });
                }else{
                    callback(`found a error to truncate the file and the error is ${error}`);
                }
            });
        }else{
            callback(`found a error to update the file and the error is ${error}`);
        }
    })
}

//delet
lib.delete = (dir,file,callback)=>{
    //unlink kora
    fs.unlink(`${lib.basedir + dir}/${file}.json`,(error)=>{
        if(!error){
            callback(false);
        }else{
            callback(`found a error to delet and the error is ${error}`);
        }
    })
};
module.exports = lib;
