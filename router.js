const express = require('express');
const router = express.Router(); // returns a mini-app dedicatedly for routing
const controller = require ('./controller');

//Route paths to handle incoming requests
router.get('/',controller.fetch);
router.post('/insertSelectCallback',controller.insertFetchCallback);
router.post('/insertSelectPromise',controller.insertFetchPromise);
router.post('/insertSelectAsyncAwait', controller.insertFetchAsyncAwait);
router.post('/insertSelectProcedure', controller.insertFetchProcedure);

//export modules
module.exports = router;