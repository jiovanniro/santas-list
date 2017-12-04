import * as mySql from 'mysql';

export let pool =  mySql.createPool({
    connectionLimit: 10,
    host: '',
    user: '',
    password: '',
    database: ''
});


export function rows(procedureName: string, args: any) {
    return callProcedure(procedureName, args)
        .then(function(resultsets:any) {
            return resultsets[0];
        });
}

export function row(procedureName: string, args: any) {
    return callProcedure(procedureName, args)
        .then(function(resultsets:any) {
            return resultsets[0][0];
        });
}
export function empty(procedureName: string, args: any) {
    return callProcedure(procedureName, args)
        .then(function() {
            return;
        });
}

function callProcedure(procedureName: string, args: any){
  //  console.log("inside the callProcedure args: " + procedureName);
  //  console.log("inside the callProcedure args: " + args);
    return new Promise(function(resolve: any, reject: any){
        pool.getConnection(function(err: any, connection: any) {
            if (err) {
                reject(err); 
                console.log("I'm in the err part");
            } else {
                let placeholders = '';
                if (args && args.length > 0) {
                    for (let i = 0; i < args.length; i++){
                        if (i === args.length - 1) {
                            placeholders += '?';
                        } else { 
                            placeholders += '?,';
                        }
                    }
                }

                let callString = 'CALL ' + procedureName + '(' + placeholders + ');';
               // console.log("Yo dawg I'm connected");
                console.log("The callString: " + callString);
                connection.query(callString, args, function(err: any, resultsets:any){
                    connection.release();
                    if (err) {
                        reject(err);
                    } else {
                        resolve(resultsets);
                    }
                });
            }
        });
    });
}