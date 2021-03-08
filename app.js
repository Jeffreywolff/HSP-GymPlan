const express = require('express');
const _exerciseModel = require('./ExerciseModel');
const dBModule = require('./dBModule');
const app = express();
const port = 3000;

const clientDir = __dirname + "\\client\\";


app.set('view engine', 'ejs');


app.use(express.static(clientDir));
app.use(express.json());
app.use(express.urlencoded());

app.post('/postexercise', async (req, res) => {

  let exercise = _exerciseModel.newExercise(req.body.area, req.body.exerciseName, req.body.strenghtSets, req.body.strenghtReps,
    req.body.growthSets, req.body.growthReps, req.body.enduranceSets, req.body.enduranceReps, req.body.difficulty);

  await dBModule.store(exercise);
  res.render('pages/forms.ejs');
})

app.get('/getexercises', async (req, res) => {
  let exerciseQuantity = [];
  // Get necessary Arrays

  const areaOfExercise = ['Back', 'Biceps', 'Triceps', 'Chest', 'Shoulders', 'Quads', 'Gluteus', 'Calves', 'Abs'];
  
  const exercisesDocs = await _exerciseModel.foundExercise(); 
  const exercises = [];
  const firstAreaExercises = [];
  const secondAreaExercises = [];

  let randomAreaIndex = Math.floor(Math.random() * areaOfExercise.length);
  // Selecting type of exercise by randomizing index.
  let firstTypeOfExercise = areaOfExercise[randomAreaIndex];
  areaOfExercise.splice(randomAreaIndex, 1);
  randomAreaIndex = Math.floor(Math.random() * areaOfExercise.length);
  let secondTypeOfExercise = areaOfExercise[randomAreaIndex];
  
  for (let i = 0; i < exercisesDocs.length; i++) {
    if (exercisesDocs[i].area == firstTypeOfExercise) {
      firstAreaExercises.push(exercisesDocs[i]);
    }
    else if (exercisesDocs[i].area == secondTypeOfExercise) {
      secondAreaExercises.push(exercisesDocs[i]);
    }
  }

  let firstAreaCount = 0;
  let secondAreaCount = 0;

  while (true) {

     if (firstAreaCount != 4) {
      let randomIndex = Math.floor(Math.random() * firstAreaExercises.length);
      exercises.push(firstAreaExercises[randomIndex]);
      firstAreaExercises.splice(randomIndex, 1);
      firstAreaCount++;
     }

     else if (secondAreaCount != 4) {
      let randomIndex = Math.floor(Math.random() * secondAreaExercises.length);
      exercises.push(secondAreaExercises[randomIndex]);
      secondAreaExercises.splice(randomIndex, 1);
      secondAreaCount++;
     }   

     else{
      break;
    } 

  }

  let strengthSets = Math.floor(Math.random() * 4)+1 ;
  let strengthReps = Math.floor(Math.random() * 5)+1;
  let growthSets = Math.floor(Math.random() * 5)+1;  
  let growthReps = 5 + Math.floor(Math.random() * 6)+1;
  let enduranceSets = Math.floor(Math.random() * 5)+1;
  let enduranceReps = 11 + Math.floor(Math.random() * 10)+1
  
  exerciseQuantity.push(strengthSets, strengthReps, growthSets, growthReps, enduranceSets, enduranceReps);
  console.log(exerciseQuantity)
  console.log("GeneratePlanBtn was clicked!")



  res.render('pages/index.ejs', {
    exercises: exercises,
    exerciseQuantity
  });
})


app.get('/', (req, res) => {
  console.log("User connected")
  res.render('pages/index.ejs', {exercises: []})
});

app.get('/faq', (req, res) => {

  res.render('pages/faq.ejs')
});

//app.get('/postexercise', (req, res) => res.render('pages/forms.ejs', {}));

app.listen(port, () => console.log(`\x1b[36m \n \nServer ip: http://localhost:${port} or http://gymplan.tk`));