const express = require('express');
const _exerciseModel = require('./ExerciseModel');
const dBModule = require('./dBModule');
const app = express();
const port = 3000;

const clientDir = __dirname + "\\client\\";


app.set('view engine', 'ejs');

//exports.dBAddress = 'mongodb://localhost/webshop';


app.use(express.static(clientDir));
app.use(express.json());
app.use(express.urlencoded());




app.get('/',(reg, res) => res.render('pages/index.ejs', {}));

app.listen(port, () => console.log(`\x1b[36m \n \nServer ip: http://localhost:${port} `));