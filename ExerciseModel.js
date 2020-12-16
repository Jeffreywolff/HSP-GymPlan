const mongoose = require('mongoose');
const ExerciseSchema = new mongoose.Schema({
    exerciseName: String,
    strenghtSets: Number,
    strenghtReps: Number,
    growthSets: Number,
    growthReps: Number,
    enduranceSets: Number,
    enduranceReps: Number,
  });

  const Message = mongoose.model('Message', MessageSchema);


exports.newMessage = (fname,email) =>{

    var message = new Message({
      fname: fname,
      email: email

    });

    return message;
}

exports.messageFind = async () =>{
  let foundMessage = await Message.find({});
  return foundMessage;
}