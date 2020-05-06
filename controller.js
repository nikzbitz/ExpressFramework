const model = require('./model');

/**
 * fetchData - Function to call model function and send response back to user
 * @param {*} req HTTP request argument
 * @param {*} res HTTP response argument
 */
const fetch = (req, res) => {
    model.select((error, result) => {
        if(result) {
            res.send(JSON.stringify(result));            
        }
        else{
            res.send(error)
        }
    })
}

/**
 * insertFetchCallback -  Function to call model function and send response back to user
 * @param {*} req HTTP request argument
 * @param {*} res HTTP response argument
 */
const insertFetchCallback = (req, res) => {
    model.insertSelectCallback(req, (error, result) => {
        if(result) {
            res.send(JSON.stringify(result));            
        }
        else{
            res.send(error)
        }
    })
}

/**
 * insertFetchPromise - Function to call model function and send response back to user
 * @param {*} req HTTP request argument
 * @param {*} res HTTP response argument
 */
const insertFetchPromise = (req, res) => {
    model.insertSelectPromise(req).then((result) => {
        res.send(JSON.stringify(result));
    }).catch((error) => {
        res.send(error);
    });
}

/**
 * insertFetchAsyncAwait - Function to call model function and send response back to user
 * @param {*} req HTTP request argument
 * @param {*} res HTTP response argument
 */
const insertFetchAsyncAwait = (req, res) => {
    model.insertSelectAsyncAwait(req).then((result) => {
        res.send(JSON.stringify(result));
    }).catch((error) => {
        res.send(error);
    });
}

/**
 * insertFetchProcedure - Function to call model function and send response back to user
 * @param {*} req HTTP request argument
 * @param {*} res HTTP response argument
 */
const insertFetchProcedure = (req, res) => {
    model.insertSelectProcedure(req, (error, result) => {
        if(result) {
            res.send(JSON.stringify(result));            
        }
        else{
            res.send(error)
        }
    })
}

//export modules
module.exports.fetch = fetch;
module.exports.insertFetchCallback = insertFetchCallback;
module.exports.insertFetchPromise = insertFetchPromise;
module.exports.insertFetchAsyncAwait = insertFetchAsyncAwait;
module.exports.insertFetchProcedure = insertFetchProcedure;