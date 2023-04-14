const readlineSync = require('readline-sync');
const fetch = require('node-fetch');
const fs = require('fs');
const chalk = require('chalk')



async function configCheck(url){
    return new Promise(function(resolve,reject){
        fetch(url,{
            method: "GET"
        }).then(function(response){
            resolve(response);
        }).catch(function(err){
            if(err){
                resolve(404);
            }
        })
    })
    
}



async function start(){
    let f = fs.readFileSync(__dirname+"/config.txt", 'utf8').split("\n");
    let d = fs.readFileSync(__dirname+"/dblogin.txt", 'utf8').split("\n");
    let listDomain = fs.readFileSync(__dirname+"/clean.txt", 'utf8').split("\n");

    for(let index = 0; index < listDomain.length; index++){
        const domain = listDomain[index];
        console.log(`[${chalk.green('SCAN')}] -> ${domain}`);
            for (let j = 0; j < f.length; j++) {
                const cleanDomain = domain+f[j];
                    const resulCheck = await configCheck(cleanDomain);
                     if(resulCheck.status == 200){
                        console.log(`[${chalk.cyan('RESULT')}] -> ${cleanDomain} [${chalk.green('FOUND')}]`);
                     }
            }
    }

}
start();
