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

app.post('/postexercise', async (req, res) => {

    const exercise = _exerciseModel.newExercise(req.body.exerciseName, req.body.strenghtSets, req.body.strenghtReps,
      req.body.growthSets, req.body.growthReps, req.body.enduranceSets, req.body.enduranceReps);
    await dBModule.store(exercise);
    res.render('pages/forms.ejs');
  })

app.get('/',(reg, res) => res.render('pages/index.ejs', {}));
app.get('/postexercise',(reg, res) => res.render('pages/forms.ejs', {}));

app.listen(port, () => console.log(`\x1b[36m \n \nServer ip: http://localhost:${port} `));