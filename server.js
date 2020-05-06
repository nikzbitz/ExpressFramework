let express = require('express');
let app = express(); //returns an app to be used further in the module
const  bodyParser = require('body-parser');

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', require('./router'));

app.listen('3000');