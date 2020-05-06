let db = require('./dbConnection');

/**
 * select - function to select records from table
 * @param {*} callback callback function to return result back to controller
 */
const select = (callback) => {
    db.connection.query('SELECT * FROM city where Name = "Bilaspur"', (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
        }
        else {
            console.log(JSON.stringify(result));
            callback(null, result);
        }
    });
}

/**
 * insertSelectCallback - function to perform sync operations using callbacks 
 * @param {*} req HTTP request argument
 * @param {*} callback callback function to return result back to controller
 */
const insertSelectCallback = (req, callback) => {
    db.connection.query('insert into user (username, email, password)' +
        'values ("' + req.body.username + '","' + req.body.email + '","' + req.body.password + '")', (err, selectResult) => {
            if (err) {
                console.log(err);
                callback(err, null);
            }
            else {
                db.connection.query('SELECT LAST_INSERT_ID() AS ID', (err, result) => {
                    if (err) {
                        console.log(err);
                        callback(err, null);
                    }
                    else {
                        db.connection.query('SELECT * from user where userid = ' + result[0].ID + '', (err, result) => {
                            if (err) {
                                console.log(err);
                                callback(err, null);
                            }
                            else {
                                console.log('Did it via traditional callbacks');
                                callback(null, result);
                            }
                        });
                    }
                });
            }
        });
}

/**
 * queryPromiseFunc - function to query db and return result in a promise 
 * @param {*} sql 
 */
const queryPromiseFunc = (sql) => {
    return new Promise((resolve, reject) => {
        db.connection.query(sql, (err, rows) => {
            if (err)
                return reject(err);
            resolve(rows);
        });
    });
}

/**
 * insertSelectPromise - function to perform sync operations using promises
 * @param {*} req HTTP request argument
 * @param {*} callback callback function to return result back to controller
 */
const insertSelectPromise = (req) => {
    return new Promise((resolve, reject) => {
        return queryPromiseFunc('insert into user (username, email, password)' +
        'values ("' + req.body.username + '","' + req.body.email + '","' + req.body.password + '")')
        .then(rows => {
            return queryPromiseFunc('SELECT LAST_INSERT_ID() AS ID').then((result) => {
                return queryPromiseFunc('SELECT * from user where userid = ' + result[0].ID + '')
                    .then((rows) => {
                        console.log('Did it via Promises');
                        resolve(rows);
                    });
            });
        }).catch((error) => {
            console.log(error);
            reject('Database error');
        });
    });
}

/**
 * insertSelectAsyncAwait - function to perform sync operations using async await
 * @param {*} req HTTP request argument 
 * @param {*} callback callback function to return result back to controller
 */
const insertSelectAsyncAwait = async (req) => {
    try {
        await queryPromiseFunc('insert into user (username, email, password)' +
            'values ("' + req.body.username + '","' + req.body.email + '","' + req.body.password + '")');
        let result = await queryPromiseFunc('SELECT LAST_INSERT_ID() AS ID');
        let rows = await queryPromiseFunc('SELECT * from user where userid = ' + result[0].ID + '')
        console.log('Did it via async await');
        return (null, rows);
    }
    catch (error) {
        console.log(error);
        return ('Database error', null);
    }
}

/**
 * insertSelectProcedure - function to perform sync operations using mysql procedures 
 * @param {*} req HTTP request argument
 * @param {*} callback callback function to return result back to controller
 */
const insertSelectProcedure = (req, callback) => {
    db.connection.query('call insertSelect ("' + req.body.username + '","' + req.body.email + '","' 
    + req.body.password + '")', (err, result) => {
        if (err) {
            console.log(err);
            callback(err, null);
        }
        else {
            console.log('Did it via mysql stored procedures');
            callback(null, result);
        }
    });
}

//export modules
module.exports.select = select;
module.exports.insertSelectCallback = insertSelectCallback;
module.exports.insertSelectPromise = insertSelectPromise;
module.exports.insertSelectAsyncAwait = insertSelectAsyncAwait;
module.exports.insertSelectProcedure = insertSelectProcedure;