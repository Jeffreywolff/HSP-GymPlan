const mongoose = require('mongoose');
const ExerciseSchema = new mongoose.Schema({
    area: String,
    exerciseName: String,

  });

  const Exercise = mongoose.model('Exercise', ExerciseSchema);


exports.newExercise = (area, name) =>{

    var exercise = new Exercise({
      area: area,
      exerciseName: name,
    });

    return exercise;
}



exports.foundExercise = async () =>{
  const foundExercise = await Exercise.find({});
  return foundExercise;
}
