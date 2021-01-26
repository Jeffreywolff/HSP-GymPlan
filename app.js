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

  let exercise = _exerciseModel.newExercise(req.body.area, req.body.exerciseName, req.body.strenghtSets, req.body.strenghtReps,
    req.body.growthSets, req.body.growthReps, req.body.enduranceSets, req.body.enduranceReps, req.body.difficulty);

  await dBModule.store(exercise);
  res.render('pages/forms.ejs');
})

app.get('/getexercises', async (reg, res) => {
  const exercisesDocs = await _exerciseModel.foundExercise();
  while (exercisesDocs.length > 6) {
    let randomIndex = Math.floor(Math.random() * exercisesDocs.length);
    exercisesDocs.splice(randomIndex, 1);
  }


  console.log("GeneratePlanBtn was clicked!")


  res.render('pages/index.ejs', {
    exercises: exercisesDocs
  });
})


app.get('/', (reg, res) => res.render('pages/index.ejs', {
  exercises: []
}));

app.get('/postexercise', (reg, res) => res.render('pages/forms.ejs', {}));

app.listen(port, () => console.log(`\x1b[36m \n \nServer ip: http://localhost:${port} `));