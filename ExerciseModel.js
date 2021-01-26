const mongoose = require('mongoose');
const ExerciseSchema = new mongoose.Schema({
    area: String,
    exerciseName: String,
    strenghtSets: Number,
    strenghtReps: Number,
    growthSets: Number,
    growthReps: Number,
    enduranceSets: Number,
    enduranceReps: Number,
    difficulty: Number,

  });

  const Exercise = mongoose.model('Exercise', ExerciseSchema);


exports.newExercise = (area, name, strenghtSets, strenghtReps, 
  growthSets, growthReps, enduranceSets, enduranceReps, difficulty) =>{

    var exercise = new Exercise({
      area: area,
      exerciseName: name,
      strenghtSets: strenghtSets,
      strenghtReps: strenghtReps,
      growthSets: growthSets,
      growthReps: growthReps,
      enduranceSets: enduranceSets,
      enduranceReps: enduranceReps,
      difficulty: difficulty,
    });

    return exercise;
}



exports.foundExercise = async () =>{
  const foundExercise = await Exercise.find({});
  return foundExercise;
}
